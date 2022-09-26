package alloc

import (
	"mun/x/alloc/keeper"
	"mun/x/alloc/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the alloc module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	k.SetParams(ctx, genState.Params)
	k.GetModuleAccount(ctx, types.FairburnPoolName)
	err := k.FundCommunityPool(ctx)
	if err != nil {
		panic(err)
	}
}

// ExportGenesis returns the alloc module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	return &types.GenesisState{
		Params: k.GetParams(ctx),
	}
}
