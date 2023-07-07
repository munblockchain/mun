package keeper

import (
	"context"
	"mun/x/claim/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

const (
	AdminAddress = "mun1g5azxlyk6hnurr627xqd4n6efwjhmngqh3qkl5"
)

func (k msgServer) UpdateMerkleRoot(goCtx context.Context, msg *types.MsgUpdateMerkleRoot) (*types.MsgUpdateMerkleRootResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if AdminAddress != msg.Sender {
		return nil, types.ErrInvalidAdminAddress
	}

	k.Keeper.SetMerkleRoot(ctx, msg.RootValue)

	return &types.MsgUpdateMerkleRootResponse{}, nil
}
