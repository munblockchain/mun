package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "mun/testutil/keeper"
	"mun/x/mun/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.MunKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
