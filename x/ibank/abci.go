package ibank

import (
	"mun/x/ibank/keeper"
	"mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func EndBlocker(ctx sdk.Context, k keeper.Keeper) {
	txCount := k.GetTransactionCount(ctx)

	var id = k.GetTransactionChaser(ctx)
	for ; id <= txCount; id++ {
		tx, found := k.GetTransaction(ctx, id)
		if !found {
			break
		}

		if !k.IsExpired(ctx, tx) {
			break
		}

		if tx.Status == types.TXN_PENDING {
			k.Refund(ctx, tx, true)
		}
	}

	k.SetTransactionChaser(ctx, id)
}
