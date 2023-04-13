package keeper

import (
	"crypto/sha256"
	"errors"
	"fmt"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
)

type (
	Keeper struct {
		cdc      codec.BinaryCodec
		storeKey storetypes.StoreKey
		// memKey     storetypes.StoreKey
		paramstore paramtypes.Subspace

		accountKeeper types.AccountKeeper
		bankKeeper    types.BankKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey storetypes.StoreKey,
	ps paramtypes.Subspace,

	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{

		cdc:           cdc,
		storeKey:      storeKey,
		paramstore:    ps,
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) CreateModuleAccount(ctx sdk.Context) {
	macc := authtypes.NewEmptyModuleAccount(types.ModuleName, authtypes.Minter)
	k.accountKeeper.SetModuleAccount(ctx, macc)
}

// This function send amt Coin from `from` account to a module account
func (k Keeper) SendCoin(ctx sdk.Context, from, to sdk.AccAddress, amt sdk.Coin, password string) error {
	err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, from, types.ModuleName, sdk.Coins{amt})
	if err != nil {
		return err
	}

	k.AppendTransaction(ctx, types.Transaction{
		Sender:     from.String(),
		Receiver:   to.String(),
		Coins:      sdk.Coins{amt},
		SentAt:     ctx.BlockTime(),
		ReceivedAt: ctx.BlockTime(),
		Status:     types.TXN_PENDING,
		Password:   password,
		Retry:      3,
	})

	ctx.EventManager().EmitEvent(sdk.NewEvent(
		types.EventTypeIBank,
		sdk.NewAttribute(types.AttributeKeyAction, "send"),
		sdk.NewAttribute(types.AttributeKeySender, from.String()),
		sdk.NewAttribute(types.AttributeKeyReceiver, to.String()),
		sdk.NewAttribute(types.AttributeKeyAmount, amt.Amount.String()+amt.GetDenom()),
	))

	return nil
}

func (k Keeper) ReceiveCoin(ctx sdk.Context, receiver sdk.AccAddress, transactionId int64, password string) error {
	txn, found := k.GetTransaction(ctx, uint64(transactionId))
	if !found {
		return errors.New("transaction not found")
	}

	// Check if transaction is performed
	if txn.Status != types.TXN_PENDING {
		if txn.Status == types.TXN_SENT {
			return errors.New("you already performed this transaction")
		} else if txn.Status == types.TXN_EXPIRED {
			return errors.New("transaction has expired")
		} else {
			return errors.New("transaction is declined")
		}
	}

	// Check if transaction is expired
	if k.IsExpired(ctx, txn) {
		return errors.New("transaction has expired")
	}

	to, err := sdk.AccAddressFromBech32(txn.Receiver)
	if err != nil || !to.Equals(receiver) {
		return errors.New("receiver not found")
	}

	// check password hash
	hash := sha256.Sum256([]byte(password))
	formattedHash := fmt.Sprintf("%x", hash)
	if txn.Password != formattedHash {
		txn.Retry--

		if txn.Retry == 0 {
			// return errors.New("funds returned to sender")
			ctx.EventManager().EmitEvent(
				sdk.NewEvent(
					types.EventTypeIBank,
					sdk.NewAttribute(types.AttributeKeyAction, "receive"),
					sdk.NewAttribute(types.AttributeKeyReceiveSuccess, "false"),
					sdk.NewAttribute(types.AttributeKeyRefunded, "true"),
				),
			)

			return k.Refund(ctx, txn, false)
		}

		k.SetTransaction(ctx, txn)
		// return errors.New("password incorrect")
		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				types.EventTypeIBank,
				sdk.NewAttribute(types.AttributeKeyAction, "receive"),
				sdk.NewAttribute(types.AttributeKeyReceiveSuccess, "false"),
			),
		)
		return nil
	}

	txn.ReceivedAt = ctx.BlockTime()
	txn.Status = types.TXN_SENT
	k.SetTransaction(ctx, txn)

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, receiver, txn.Coins)

	if err == nil {
		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				types.EventTypeIBank,
				sdk.NewAttribute(types.AttributeKeyAction, "receive"),
				sdk.NewAttribute(types.AttributeKeyReceiveSuccess, "true"),
			),
		)
	} else {
		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				types.EventTypeIBank,
				sdk.NewAttribute(types.AttributeKeyAction, "receive"),
				sdk.NewAttribute(types.AttributeKeyReceiveSuccess, "false"),
			),
		)
	}

	return err
}

func (k Keeper) IsExpired(ctx sdk.Context, tranaction types.Transaction) bool {
	params := k.GetParams(ctx)

	// transaction.SentAt + ExpirationDuration < CurrentTime -> Expired
	return tranaction.SentAt.Add(params.GetDurationOfExpiration()).Before(ctx.BlockTime())
}

func (k Keeper) Refund(ctx sdk.Context, transaction types.Transaction, expired bool) error {
	if transaction.Status != types.TXN_PENDING {
		return errors.New("only can refund pending txns")
	}

	if expired && !k.IsExpired(ctx, transaction) {
		return errors.New("tx is in progress")
	}

	sender, err := sdk.AccAddressFromBech32(transaction.Sender)
	if err != nil {
		return err
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sender, transaction.Coins); err != nil {
		return err
	}

	if expired {
		transaction.Status = types.TXN_EXPIRED
	} else {
		transaction.Status = types.TXN_DECLINED
		transaction.Retry = 0
	}
	k.SetTransaction(ctx, transaction)

	return nil
}
