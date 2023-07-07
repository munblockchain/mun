package keeper

import (
	"context"

	"mun/x/claim/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ClaimFor(goCtx context.Context, msg *types.MsgClaimFor) (*types.MsgClaimForResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	address, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, err
	}
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return nil, types.ErrAirdropNotEnabled
	}

	// Check if whitelisted for Initial Claim
	if msg.GetAction() == types.ActionInitialClaim {
		merkleRoot := k.Keeper.GetMerkleRoot(ctx)
		if !k.Keeper.VerifyMerkleTree(merkleRoot, msg.Sender, msg.GetProof()) {
			return nil, types.ErrUnauthorizedClaimer
		}
	}

	coins, err := k.Keeper.ClaimCoinsForAction(ctx, address, msg.GetAction())
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Sender),
		),
	})
	return &types.MsgClaimForResponse{
		Address:       msg.Sender,
		ClaimedAmount: coins,
	}, nil
}
