package keeper

import (
	"context"
	"mun/x/claim/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) MerkleRoot(
	goCtx context.Context,
	req *types.QueryMerkleRootRequest,
) (*types.QueryMerkleRootResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	return &types.QueryMerkleRootResponse{
		MerkleRoot: k.GetMerkleRoot(ctx),
	}, nil
}

func (k Keeper) Whitelisted(goCtx context.Context,
	req *types.QueryWhitelistedRequest,
) (*types.QueryWhitelistedResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	merkleRoot := k.GetMerkleRoot(ctx)

	return &types.QueryWhitelistedResponse{
		Whitelisted: k.VerifyMerkleTree(merkleRoot, req.Address, req.Proof),
	}, nil
}
