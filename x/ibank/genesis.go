package ibank

import (
	"mun/x/ibank/keeper"
	"mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the transaction
	for _, elem := range genState.TransactionList {
		k.SetTransaction(ctx, elem)
	}

	k.CreateModuleAccount(ctx)
	k.SetTransactionCount(ctx, genState.TransactionCount)
	k.SetTransactionChaser(ctx, genState.TransactionChaser)

	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.TransactionList = k.GetAllTransaction(ctx)
	genesis.TransactionCount = k.GetTransactionCount(ctx)
	genesis.TransactionChaser = k.GetTransactionChaser(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
