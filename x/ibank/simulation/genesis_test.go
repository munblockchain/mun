package simulation_test

import (
	"encoding/json"
	"math/rand"
	"mun/x/ibank/simulation"
	"mun/x/ibank/types"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/stretchr/testify/require"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
)

func TestRandomizedGenState(t *testing.T) {
	registry := codectypes.NewInterfaceRegistry()
	types.RegisterInterfaces(registry)
	cdc := codec.NewProtoCodec(registry)

	s := rand.NewSource(1)
	r := rand.New(s)

	simState := module.SimulationState{
		AppParams:    make(simtypes.AppParams),
		Cdc:          cdc,
		Rand:         r,
		NumBonded:    3,
		Accounts:     simtypes.RandomAccounts(r, 3),
		InitialStake: 1000,
		GenState:     make(map[string]json.RawMessage),
	}

	simulation.RandomizedGenState(&simState)

	var ibankGenesis types.GenesisState
	simState.Cdc.MustUnmarshalJSON(simState.GenState[types.ModuleName], &ibankGenesis)

	require.Equal(t, time.Duration(172800000000000), ibankGenesis.Params.DurationOfExpiration)
}
