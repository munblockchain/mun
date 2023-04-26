package keeper

import (
	"context"

	"mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Send(goCtx context.Context, msg *types.MsgSend) (*types.MsgSendResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	from, err := sdk.AccAddressFromBech32(msg.FromAddress)
	if err != nil {
		return nil, err
	}
	to, err := sdk.AccAddressFromBech32(msg.ToAddress)
	if err != nil {
		return nil, err
	}

	if err := k.SendCoin(ctx, from, to, msg.Amount, msg.PasswordHash); err != nil {
		return nil, err
	}

	return &types.MsgSendResponse{}, nil
}
