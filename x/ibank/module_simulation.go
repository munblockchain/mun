package ibank

import (
	"math/rand"
	"mun/x/ibank/simulation"
	"mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

// AppModuleSimulation functions

// GenerateGenesisState creates a randomized GenState of the ibank module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	simulation.RandomizedGenState(simState)
}

// RandomizedParams creates randomized cronos param changes for the simulator.
func (AppModule) RandomizedParams(r *rand.Rand) []simtypes.ParamChange {
	return simulation.ParamChanges(r)
}

// ProposalContents returns nothing for governance proposals.
func (am AppModule) ProposalContents(simState module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RegisterStoreDecoder registers a decoder for ibank module's types
func (am AppModule) RegisterStoreDecoder(sdr sdk.StoreDecoderRegistry) {
	sdr[types.StoreKey] = simulation.NewDecodeStore(am.cdc)
}

// WeightedOperations returns the all the ibank module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	return simulation.WeightedOperations(
		simState.AppParams, simState.Cdc, am.accountKeeper, am.bankKeeper, &am.keeper,
	)
}
