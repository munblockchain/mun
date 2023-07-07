package keeper

import (
	"encoding/hex"
	"mun/x/claim/types"
	"strings"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/gogo/protobuf/proto"
)

// CreateModuleAccount creates module account of airdrop module
func (k Keeper) CreateModuleAccount(ctx sdk.Context, amount sdk.Coin) {
	moduleAcc := authtypes.NewEmptyModuleAccount(types.ModuleName, authtypes.Minter)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)
	err := k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(amount))
	if err != nil {
		panic(err)
	}
}

// SetClaimables set claimable amount from balances object
func (k Keeper) SetClaimRecords(ctx sdk.Context, claimRecords []types.ClaimRecord) error {
	for _, claimRecord := range claimRecords {
		err := k.SetClaimRecord(ctx, claimRecord)
		if err != nil {
			return err
		}
	}
	return nil
}

// SetClaimRecord sets a claim record for an address in store
func (k Keeper) SetClaimRecord(ctx sdk.Context, claimRecord types.ClaimRecord) error {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.ClaimRecordsStorePrefix)

	bz, err := proto.Marshal(&claimRecord)
	if err != nil {
		return err
	}

	addr, err := sdk.AccAddressFromBech32(claimRecord.Address)
	if err != nil {
		return err
	}

	prefixStore.Set(addr, bz)
	return nil
}

// ClaimRecords get claimables for genesis export
func (k Keeper) ClaimRecords(ctx sdk.Context) []types.ClaimRecord {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.ClaimRecordsStorePrefix)

	iterator := prefixStore.Iterator(nil, nil)
	defer iterator.Close()

	claimRecords := []types.ClaimRecord{}
	for ; iterator.Valid(); iterator.Next() {
		claimRecord := types.ClaimRecord{}

		err := proto.Unmarshal(iterator.Value(), &claimRecord)
		if err != nil {
			panic(err)
		}

		claimRecords = append(claimRecords, claimRecord)
	}
	return claimRecords
}

// ClaimRecord returns the claim record for a specific address
func (k Keeper) GetClaimRecord(ctx sdk.Context, addr sdk.AccAddress) (types.ClaimRecord, error) {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.ClaimRecordsStorePrefix)
	if !prefixStore.Has(addr) {
		return types.ClaimRecord{Address: ""}, nil
	}
	bz := prefixStore.Get(addr)

	claimRecord := types.ClaimRecord{}
	err := proto.Unmarshal(bz, &claimRecord)
	if err != nil {
		return types.ClaimRecord{Address: ""}, err
	}

	return claimRecord, nil
}

// GetClaimable returns claimable amount for a specific action done by an address
func (k Keeper) SetClaimableActionReady(ctx sdk.Context, addr sdk.AccAddress, action types.Action) bool {
	claimRecord, err := k.GetClaimRecord(ctx, addr)

	// if occurs error in unmarshal
	if err != nil {
		return false
	}

	// Add record
	if claimRecord.Address == "" {
		claimCoins, err := sdk.ParseCoinsNormalized(types.InitialClaimAmount)
		if err != nil {
			return false
		}

		// Create a new record
		claimRecord = types.ClaimRecord{
			Address:                addr.String(),
			InitialClaimableAmount: claimCoins,
			ActionReady:            make([]bool, 4),
			ActionCompleted:        make([]bool, 4),
		}
	}

	// Fallback process for earlier account that does not have 'action_ready' field
	if len(claimRecord.ActionReady) == 0 {
		claimRecord.ActionReady = make([]bool, 4)
	}

	// Set claimable status to true
	claimRecord.ActionReady[action] = true

	// Create a new claim record with initial claim amount
	if err := k.SetClaimRecord(ctx, claimRecord); err != nil {
		return false
	}

	return true
}

// GetClaimable returns claimable amount for a specific action done by an address
func (k Keeper) GetClaimableAmountForAction(ctx sdk.Context, addr sdk.AccAddress, action types.Action) (sdk.Coins, error) {
	claimRecord, err := k.GetClaimRecord(ctx, addr)

	// if occurs error in unmarshal
	if err != nil {
		return nil, err
	}

	// Add record
	if claimRecord.Address == "" ||
		claimRecord.ActionReady == nil ||
		claimRecord.ActionCompleted == nil ||
		len(claimRecord.ActionReady) < 4 ||
		len(claimRecord.ActionCompleted) < 4 {
		claimCoins, err := sdk.ParseCoinsNormalized(types.InitialClaimAmount)
		if err != nil {
			return nil, err
		}

		// Create a new record
		claimRecord = types.ClaimRecord{
			Address:                addr.String(),
			InitialClaimableAmount: claimCoins,
			ActionReady:            make([]bool, 4),
			ActionCompleted:        make([]bool, 4),
		}

		// Create a new claim record with initial claim amount
		if err := k.SetClaimRecord(ctx, claimRecord); err != nil {
			return sdk.Coins{}, nil
		}
	}

	if claimRecord.Address == "" {
		return sdk.Coins{}, nil
	}

	// Removed Airdrop for swap action
	if action == types.ActionSwap {
		return sdk.Coins{}, nil
	}

	// if action already completed, nothing is claimable
	if claimRecord.ActionCompleted[action] {
		return sdk.Coins{}, nil
	}

	// if previous action not completed, nothing is claimable
	if action != types.ActionInitialClaim && !claimRecord.ActionCompleted[action-1] {
		return sdk.Coins{}, nil
	}

	// if action is not ready, nothing is claimable
	if action != types.ActionInitialClaim && !claimRecord.ActionReady[action] {
		return sdk.Coins{}, nil
	}

	params := k.GetParams(ctx)

	// If we are before the start time, do nothing.
	// This case _shouldn't_ occur on chain, since the
	// start time ought to be chain start time.
	if ctx.BlockTime().Before(params.AirdropStartTime) {
		return sdk.Coins{}, nil
	}

	InitialClaimablePerAction := sdk.Coins{}
	for _, coin := range claimRecord.InitialClaimableAmount {
		InitialClaimablePerAction = InitialClaimablePerAction.Add(
			sdk.NewCoin(coin.Denom,
				coin.Amount.QuoRaw(int64(len(types.Action_name))),
			),
		)
	}

	elapsedAirdropTime := ctx.BlockTime().Sub(params.AirdropStartTime)
	// Are we early enough in the airdrop s.t. theres no decay?
	if elapsedAirdropTime <= params.DurationUntilDecay {
		return InitialClaimablePerAction, nil
	}

	// The entire airdrop has completed
	if elapsedAirdropTime > params.DurationUntilDecay+params.DurationOfDecay {
		return sdk.Coins{}, nil
	}

	// Positive, since goneTime > params.DurationUntilDecay
	decayTime := elapsedAirdropTime - params.DurationUntilDecay
	decayPercent := sdk.NewDec(decayTime.Nanoseconds()).QuoInt64(params.DurationOfDecay.Nanoseconds())
	claimablePercent := sdk.OneDec().Sub(decayPercent)

	claimableCoins := sdk.Coins{}
	for _, coin := range InitialClaimablePerAction {
		claimableCoins = claimableCoins.Add(sdk.NewCoin(coin.Denom, coin.Amount.ToDec().Mul(claimablePercent).RoundInt()))
	}

	return claimableCoins, nil
}

// GetClaimable returns claimable amount for a specific action done by an address
func (k Keeper) GetUserTotalClaimable(ctx sdk.Context, addr sdk.AccAddress) (sdk.Coins, error) {
	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return sdk.Coins{}, err
	}
	if claimRecord.Address == "" {
		return sdk.Coins{}, nil
	}

	totalClaimable := sdk.Coins{}

	for action := range types.Action_name {
		claimableForAction, err := k.GetClaimableAmountForAction(ctx, addr, types.Action(action))
		if err != nil {
			return sdk.Coins{}, err
		}
		totalClaimable = totalClaimable.Add(claimableForAction...)
	}
	return totalClaimable, nil
}

// ClaimCoins remove claimable amount entry and transfer it to user's account
func (k Keeper) ClaimCoinsForAction(ctx sdk.Context, addr sdk.AccAddress, action types.Action) (sdk.Coins, error) {
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return sdk.Coins{}, nil
	}

	claimableAmount, err := k.GetClaimableAmountForAction(ctx, addr, action)
	if err != nil {
		return claimableAmount, err
	}

	if claimableAmount.Empty() {
		return claimableAmount, nil
	}

	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return nil, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, addr, claimableAmount)
	if err != nil {
		return nil, err
	}

	claimRecord.ActionCompleted[action] = true

	err = k.SetClaimRecord(ctx, claimRecord)
	if err != nil {
		return claimableAmount, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventTypeClaim,
			sdk.NewAttribute(sdk.AttributeKeySender, addr.String()),
			sdk.NewAttribute(sdk.AttributeKeyAmount, claimableAmount.String()),
		),
	})

	return claimableAmount, nil
}

// FundRemainingsToCommunity fund remainings to the community when airdrop period end
func (k Keeper) fundRemainingsToCommunity(ctx sdk.Context) error {
	moduleAccAddr := k.GetModuleAccountAddress(ctx)
	amt := k.GetModuleAccountBalance(ctx)
	return k.distrKeeper.FundCommunityPool(ctx, sdk.NewCoins(amt), moduleAccAddr)
}

func (k Keeper) EndAirdrop(ctx sdk.Context) error {
	err := k.fundRemainingsToCommunity(ctx)
	if err != nil {
		return err
	}
	k.clearInitialClaimables(ctx)
	return nil
}

// ClearClaimables clear claimable amounts
func (k Keeper) clearInitialClaimables(ctx sdk.Context) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.ClaimRecordsStorePrefix)
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		key := iterator.Key()
		store.Delete(key)
	}
}

func (k Keeper) GetMerkleRoot(ctx sdk.Context) string {
	prefixStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	return string(prefixStore.Get(types.MerkleRootStorePrefix))
}

func (k Keeper) SetMerkleRoot(ctx sdk.Context, rootValue string) {
	prefixStore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	prefixStore.Set(types.MerkleRootStorePrefix, []byte(rootValue))
}

func (k Keeper) VerifyMerkleTree(merkleRoot, leafRaw, proofRaw string) bool {
	rootHash, _ := hex.DecodeString(merkleRoot)
	hashes := make([][]byte, 0)
	hexes := strings.Split(proofRaw, ",")
	for i := 0; i < len(hexes)-1; i++ {
		s, err := hex.DecodeString(hexes[i])
		if err != nil {
			return false
		}
		hashes = append(hashes, s)
	}

	res, err := VerifyProof([]byte(leafRaw), hashes, rootHash, hexes[len(hexes)-1])
	if err != nil {
		return false
	}
	return res
}
