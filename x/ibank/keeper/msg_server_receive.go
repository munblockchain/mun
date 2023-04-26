package keeper

import (
	"context"

	"mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Receive(goCtx context.Context, msg *types.MsgReceive) (*types.MsgReceiveResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	receiver, err := sdk.AccAddressFromBech32(msg.Receiver)
	if err != nil {
		return nil, err
	}

	if err := k.ReceiveCoin(ctx, receiver, msg.TransactionId, msg.Password); err != nil {
		return nil, err
	}

	return &types.MsgReceiveResponse{}, nil
}
