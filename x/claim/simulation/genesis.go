package simulation

import (
	"mun/x/claim/types"

	"github.com/cosmos/cosmos-sdk/types/module"
)

// RandomizedGenState generates a random GenesisState  for claim
func RandomizedGenState(simState *module.SimulationState) {
	claimGenesis := types.DefaultGenesis()
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(claimGenesis)
}
