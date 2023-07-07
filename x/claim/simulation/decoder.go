package simulation

import (
	"bytes"
	"fmt"
	"mun/x/claim/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/types/kv"
)

// NewDecodeStore returns a decoder function closure that unmarshals the KVPair's
// Value to the corresponding claim type.
func NewDecodeStore(cdc codec.BinaryCodec) func(kvA, kvB kv.Pair) string {
	return func(kvA, kvB kv.Pair) string {
		switch {
		case bytes.Equal(kvA.Key, types.ClaimRecordsStorePrefix):
			var claimRecordA, claimRecordB types.ClaimRecord
			cdc.MustUnmarshal(kvA.Value, &claimRecordA)
			cdc.MustUnmarshal(kvB.Value, &claimRecordB)
			return fmt.Sprintf("%v\n%v", claimRecordA, claimRecordB)
		case bytes.Equal(kvA.Key, types.MerkleRootStorePrefix):
			return fmt.Sprintf("%v\n%v", string(kvA.Value), string(kvB.Value))
		default:
			panic(fmt.Sprintf("invalid claim key prefix %v", kvA.Key))
		}
	}
}
