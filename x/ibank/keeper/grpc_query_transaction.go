package keeper

import (
	"context"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) TransactionAll(c context.Context, req *types.QueryAllTransactionRequest) (*types.QueryAllTransactionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var transactions []types.TransactionWrapper
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	transactionStore := prefix.NewStore(store, types.KeyPrefix(types.TransactionKey))

	expirationDuration := k.GetParams(ctx).DurationOfExpiration

	pageRes, err := paginate(transactionStore, req.Pagination, func(key []byte, value []byte, appendable bool) (error, bool) {
		var transaction types.Transaction
		if err := k.cdc.Unmarshal(value, &transaction); err != nil {
			return err, false
		}

		if transaction.Sender != req.Address && transaction.Receiver != req.Address {
			return nil, false
		}

		wrapper := types.TransactionWrapper{
			Transaction: transaction,
			TimeLeft:    CalculateTimeLeftInSeconds(transaction.SentAt, ctx.BlockTime(), expirationDuration),
		}
		transactions = append(transactions, wrapper)
		return nil, true
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllTransactionResponse{Transactions: transactions, Pagination: pageRes}, nil
}

func (k Keeper) Transaction(c context.Context, req *types.QueryGetTransactionRequest) (*types.QueryGetTransactionResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	transaction, found := k.GetTransaction(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetTransactionResponse{Transaction: transaction}, nil
}
