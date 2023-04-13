package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		TransactionList: []Transaction{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in transaction
	transactionIdMap := make(map[uint64]bool)
	transactionCount := gs.GetTransactionCount()
	for _, elem := range gs.TransactionList {
		if _, ok := transactionIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for transaction")
		}
		if elem.Id >= transactionCount {
			return fmt.Errorf("transaction id should be lower or equal than the last id")
		}
		transactionIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
