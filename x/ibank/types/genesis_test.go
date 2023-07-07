package types_test

import (
	"testing"

	"mun/x/ibank/types"

	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{
				Params: types.DefaultParams(),
				TransactionList: []types.Transaction{
					{
						Id: 0,
					},
					{
						Id: 1,
					},
				},
				TransactionCount: 2,
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated transaction",
			genState: &types.GenesisState{
				TransactionList: []types.Transaction{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid transaction count",
			genState: &types.GenesisState{
				TransactionList: []types.Transaction{
					{
						Id: 1,
					},
				},
				TransactionCount: 0,
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
