package simulation

import (
	"encoding/binary"
	"fmt"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/types/kv"
)

// NewDecodeStore returns a decoder function closure that unmarshals the KVPair's
// Value to the corresponding ibank type.
func NewDecodeStore(cdc codec.Codec) func(kvA, kvB kv.Pair) string {
	return func(kvA, kvB kv.Pair) string {
		switch {
		case string(kvA.Key) == types.TransactionKey:
			var txA, txB types.Transaction
			cdc.MustUnmarshal(kvA.Value, &txA)
			cdc.MustUnmarshal(kvB.Value, &txB)
			return fmt.Sprintf("%v\n%v", txA, txB)

		case string(kvA.Key) == types.TransactionCountKey:
			return fmt.Sprintf("%v\n%v", binary.BigEndian.Uint64(kvA.Value), binary.BigEndian.Uint64(kvB.Value))

		case string(kvA.Key) == types.TransactionChaserKey:
			return fmt.Sprintf("%v\n%v", binary.BigEndian.Uint64(kvA.Value), binary.BigEndian.Uint64(kvB.Value))

		default:
			panic(fmt.Sprintf("invalid ibank key prefix %v", kvA.Key))
		}
	}
}
