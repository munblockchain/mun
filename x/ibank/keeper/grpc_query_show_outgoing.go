package keeper

import (
	"context"
	"fmt"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	querytypes "github.com/cosmos/cosmos-sdk/types/query"
	db "github.com/tendermint/tm-db"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Outgoing(goCtx context.Context, req *types.QueryOutgoingRequest) (*types.QueryOutgoingResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var transactions []types.TransactionWrapper
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	transactionStore := prefix.NewStore(store, types.KeyPrefix(types.TransactionKey))

	expirationDuration := k.GetParams(ctx).DurationOfExpiration

	pageRes, err := paginate(transactionStore, req.Pagination, func(key []byte, value []byte, appendable bool) (error, bool) {
		var transaction types.Transaction
		if err := k.cdc.Unmarshal(value, &transaction); err != nil {
			return err, false
		}

		// check sender
		if req.Sender != transaction.Sender {
			return nil, false
		}

		// only shows pending transactions
		if req.Pending && transaction.Status != types.TxPending {
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

	return &types.QueryOutgoingResponse{Transactions: transactions, Pagination: pageRes}, nil
}

func paginate(
	prefixStore storetypes.KVStore,
	pageRequest *querytypes.PageRequest,
	onResult func([]byte, []byte, bool) (error, bool),
) (*querytypes.PageResponse, error) {
	if pageRequest == nil {
		pageRequest = &querytypes.PageRequest{}
	}

	offset := pageRequest.Offset
	key := pageRequest.Key
	limit := pageRequest.Limit
	countTotal := pageRequest.CountTotal
	reverse := pageRequest.Reverse

	if offset > 0 && key != nil {
		return nil, fmt.Errorf("invalid request, either offset or key is expected, got both")
	}

	if limit == 0 {
		limit = 100 //DefaultLimit

		// count total results when the limit is zero/not supplied
		countTotal = true
	}

	if len(key) != 0 {
		iterator := getIterator(prefixStore, key, reverse)
		defer iterator.Close()

		var count uint64
		var nextKey []byte

		for ; iterator.Valid(); iterator.Next() {
			if count == limit {
				nextKey = iterator.Key()
				break
			}
			if iterator.Error() != nil {
				return nil, iterator.Error()
			}
			err, eligible := onResult(iterator.Key(), iterator.Value(), true)
			if !eligible {
				continue
			}
			if err != nil {
				return nil, err
			}

			count++
		}

		return &querytypes.PageResponse{
			NextKey: nextKey,
		}, nil
	}

	iterator := getIterator(prefixStore, nil, reverse)
	defer iterator.Close()

	end := offset + limit

	var count uint64
	var nextKey []byte

	for ; iterator.Valid(); iterator.Next() {
		err, eligible := onResult(iterator.Key(), iterator.Value(), count >= offset)
		if err != nil {
			return nil, err
		}
		if !eligible {
			continue
		}

		if count == end {
			nextKey = iterator.Key()
			if !countTotal {
				break
			}
		}

		if iterator.Error() != nil {
			return nil, iterator.Error()
		}

		count++
	}

	res := &querytypes.PageResponse{NextKey: nextKey}
	if countTotal {
		res.Total = count
	}

	return res, nil
}

func getIterator(prefixStore storetypes.KVStore, start []byte, reverse bool) db.Iterator {
	if reverse {
		var end []byte
		if start != nil {
			itr := prefixStore.Iterator(start, nil)
			defer itr.Close()
			if itr.Valid() {
				itr.Next()
				end = itr.Key()
			}
		}
		return prefixStore.ReverseIterator(nil, end)
	}
	return prefixStore.Iterator(start, nil)
}
