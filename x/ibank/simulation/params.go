package simulation

import (
	"math/rand"

	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	// "github.com/cosmos/cosmos-sdk/x/staking/types"
)

// ParamChanges defines the parameters that can be modified by param change proposals
// on the simulation
func ParamChanges(r *rand.Rand) []simtypes.ParamChange {
	return []simtypes.ParamChange{}
}
