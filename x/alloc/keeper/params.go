package keeper

import (
	"mun/x/alloc/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetParams returns the total set of alloc module parameters.
func (k Keeper) GetParams(ctx sdk.Context) (params types.Params) {
	k.paramstore.GetParamSet(ctx, &params)
	return params
}

// SetParams sets the total set of alloc module parameters.
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}
