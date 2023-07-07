package ibank

import (
	"fmt"
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

		if tx.Status == types.TxPending {
			if err := k.Refund(ctx, tx, true); err != nil {
				ctx.Logger().Error(fmt.Sprintf("ibank: refund error on end blocker, id: %d", id))
			}
		}
	}

	k.SetTransactionChaser(ctx, id)
}
