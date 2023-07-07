package app

import (
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	ica "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts"
	icatypes "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts/types"
)

type ICAHostSimModule struct {
	ica.AppModule
	ica.AppModuleBasic
	cdc codec.Codec
}

var (
	_ module.AppModule           = ICAHostSimModule{}
	_ module.AppModuleBasic      = ICAHostSimModule{}
	_ module.AppModuleSimulation = ICAHostSimModule{}
)

func NewICAHostSimModule(baseModule ica.AppModule, cdc codec.Codec) ICAHostSimModule {
	return ICAHostSimModule{
		cdc:            cdc,
		AppModule:      baseModule,
		AppModuleBasic: baseModule.AppModuleBasic,
	}
}

// ICAHostSimModuleSimulation functions
// This thing does the bare minimum to avoid simulation panic-ing for missing state data.

// GenerateGenesisState creates a randomized GenState of the ica module.
func (i ICAHostSimModule) GenerateGenesisState(simState *module.SimulationState) {
	genesis := icatypes.DefaultGenesis()

	bz, err := json.MarshalIndent(&genesis, "", " ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Selected randomly generated %s parameters:\n%s\n", icatypes.ModuleName, bz)
	simState.GenState[icatypes.ModuleName] = simState.Cdc.MustMarshalJSON(genesis)
}

// ProposalContents returns all the ica content functions used to
// simulate governance proposals.
func (ICAHostSimModule) ProposalContents(simState module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized ica param changes for the simulator.
func (ICAHostSimModule) RandomizedParams(*rand.Rand) []simtypes.ParamChange {
	return nil
}

// RegisterStoreDecoder registers a decoder for ica module's types
func (ICAHostSimModule) RegisterStoreDecoder(sdr sdk.StoreDecoderRegistry) {
}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (ICAHostSimModule) WeightedOperations(_ module.SimulationState) []simtypes.WeightedOperation {
	return nil
}
