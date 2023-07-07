package types

const (
	// ModuleName defines the module name
	ModuleName = "claim"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_claim"

	// ParamsKey defines the store key for claim module parameters
	ParamsKey = "params"

	// ActionKey defines the store key to store user accomplished actions
	ActionKey = "action"

	InitialClaimAmount = "1000000000utmun"
)

// KVStore keys
var (
	// ClaimRecordsStorePrefix defines the store prefix for the claim records
	ClaimRecordsStorePrefix = []byte{0x01}

	// MerkleRootStorePrefix defines the store prefix for the merkle root
	MerkleRootStorePrefix = []byte{0x02}
)
