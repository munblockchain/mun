package simulation

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/types/module"
	// "github.com/cosmos/cosmos-sdk/x/staking/types"
)

// Simulation parameter constants
const (
	ExpirationTime = "expiration_time"
)

func getExpirationTime(r *rand.Rand) time.Duration {
	dur, _ := time.ParseDuration(types.DefaultDurationOfExpiration)
	return dur
}

func RandomizedGenState(simState *module.SimulationState) {
	var (
		expirationTime time.Duration
	)

	simState.AppParams.GetOrGenerate(
		simState.Cdc, ExpirationTime, &expirationTime, simState.Rand,
		func(r *rand.Rand) { expirationTime = getExpirationTime(r) },
	)

	params := types.NewParams(expirationTime)

	ibankGenesis := types.NewGenesisState(params)

	bz, err := json.MarshalIndent(&ibankGenesis.Params, "", " ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Selected randomly generated ibank parameters:\n%s\n", bz)

	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(ibankGenesis)
}
