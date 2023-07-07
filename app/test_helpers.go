package app

import (
	"encoding/json"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/simapp"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	dbm "github.com/tendermint/tm-db"
)

var defaultGenesisBz []byte

func getDefaultGenesisStateBytes(cdc codec.JSONCodec) []byte {
	if len(defaultGenesisBz) == 0 {
		genesisState := NewDefaultGenesisState(cdc)
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}
		defaultGenesisBz = stateBytes
	}
	return defaultGenesisBz
}

func Setup() *App {
	db := dbm.NewMemDB()
	encConfig := MakeEncodingConfig()
	app := NewMunApp(
		log.NewNopLogger(),
		db,
		nil,
		true,
		map[int64]bool{},
		DefaultNodeHome,
		0,
		encConfig,
		simapp.EmptyAppOptions{},
	)

	stateBytes := getDefaultGenesisStateBytes(encConfig.Marshaler)
	app.InitChain(abci.RequestInitChain{
		Validators:      []abci.ValidatorUpdate{},
		ConsensusParams: simapp.DefaultConsensusParams,
		AppStateBytes:   stateBytes,
	})

	return app
}
