package simulation

import (
	"fmt"
	"math/rand"
	"mun/x/claim/types"

	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// ParamChanges defines the parameters that can be modified by param change proposals
// on the simulation
func ParamChanges(r *rand.Rand) []simtypes.ParamChange {
	return []simtypes.ParamChange{
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyEnabled),
			func(r *rand.Rand) string {
				return fmt.Sprintf("%v", RandomEnabledFlag(r))
			},
		),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyStartTime),
			func(r *rand.Rand) string {
				return fmt.Sprintf("\"%s\"", RandomStartTime(r).UTC().Format("2006-01-02T15:04:05Z07:00"))
			},
		),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyDurationUntilDecay),
			func(r *rand.Rand) string {
				return fmt.Sprintf("\"%d\"", RandomDurationUntilDecay(r))
			},
		),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyDurationOfDecay),
			func(r *rand.Rand) string {
				return fmt.Sprintf("\"%d\"", RandomDurationOfDecay(r))
			},
		),
	}
}
