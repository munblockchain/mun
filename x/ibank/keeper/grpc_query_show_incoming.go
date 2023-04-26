package keeper

import (
	"context"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Incoming(goCtx context.Context, req *types.QueryIncomingRequest) (*types.QueryIncomingResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var transactions []types.TransactionWrapper
	ctx := sdk.UnwrapSDKContext(goCtx)

	expirationDuration := k.GetParams(ctx).DurationOfExpiration

	store := ctx.KVStore(k.storeKey)
	transactionStore := prefix.NewStore(store, types.KeyPrefix(types.TransactionKey))

	pageRes, err := paginate(transactionStore, req.Pagination, func(key []byte, value []byte, appendable bool) (error, bool) {
		var transaction types.Transaction
		if err := k.cdc.Unmarshal(value, &transaction); err != nil {
			return err, false
		}

		// check receiver
		if req.Receiver != transaction.Receiver {
			return nil, false
		}

		// only shows pending transactions
		if req.Pending && transaction.Status != types.TXN_PENDING {
			return nil, false
		}

		if appendable {
			wrapper := types.TransactionWrapper{
				Transaction: transaction,
				TimeLeft:    CalculateTimeLeftInSeconds(transaction.SentAt, ctx.BlockTime(), expirationDuration),
			}
			transactions = append(transactions, wrapper)
		}
		return nil, true
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryIncomingResponse{Transactions: transactions, Pagination: pageRes}, nil
}
