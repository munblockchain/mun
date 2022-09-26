package keeper

import (
	"context"

	"mun/x/alloc/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) FundFairburnPool(goCtx context.Context, msg *types.MsgFundFairburnPool) (*types.MsgFundFairburnPoolResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, err
	}
	err = k.sendToFairburnPool(ctx, sender, msg.Amount)
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Sender),
		),
		sdk.NewEvent(
			types.EventTypeFundFairburnPool,
			sdk.NewAttribute(sdk.AttributeKeyAmount, msg.Amount.String()),
		),
	})
	return &types.MsgFundFairburnPoolResponse{}, nil
}
