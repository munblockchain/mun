package simulation_test

import (
	"encoding/binary"
	"fmt"
	"testing"

	"mun/app"
	"mun/x/ibank/simulation"
	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/types/kv"
	"github.com/stretchr/testify/require"
)

func TestDecodeStore(t *testing.T) {
	cdc := app.MakeEncodingConfig().Marshaler
	dec := simulation.NewDecodeStore(cdc)

	tx := types.Transaction{
		Id: 1,
	}
	txCount := 1
	txChaser := 1
	txCountInBytes := make([]byte, 8)
	txChaserInBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(txCountInBytes, uint64(txCount))
	binary.BigEndian.PutUint64(txChaserInBytes, uint64(txChaser))

	kvParis := kv.Pairs{
		Pairs: []kv.Pair{
			{Key: []byte(types.TransactionKey), Value: cdc.MustMarshal(&tx)},
			{Key: []byte(types.TransactionCountKey), Value: txCountInBytes},
			{Key: []byte(types.TransactionChaserKey), Value: txChaserInBytes},
		},
	}

	tests := []struct {
		name        string
		expectedLog string
	}{
		{"TransactionKey", fmt.Sprintf("%v\n%v", tx, tx)},
		{"TransactionCounterKey", fmt.Sprintf("%v\n%v", txCount, txCount)},
		{"TransactionChaserKey", fmt.Sprintf("%v\n%v", txChaser, txChaser)},
		{"other", ""},
	}

	for i, tt := range tests {
		i, tt := i, tt
		t.Run(tt.name, func(t *testing.T) {
			switch i {
			case len(tests) - 1:
				require.Panics(t, func() { dec(kvParis.Pairs[i], kvParis.Pairs[i]) }, tt.name)
			default:
				require.Equal(t, tt.expectedLog, dec(kvParis.Pairs[i], kvParis.Pairs[i]), tt.name)
			}
		})
	}
}
