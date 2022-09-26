package mun_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "mun/testutil/keeper"
	"mun/testutil/nullify"
	"mun/x/mun"
	"mun/x/mun/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.MunKeeper(t)
	mun.InitGenesis(ctx, *k, genesisState)
	got := mun.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
