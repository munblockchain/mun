package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:            DefaultParams(),
		TransactionList:   []Transaction{},
		TransactionCount:  0,
		TransactionChaser: 0,
		// this line is used by starport scaffolding # genesis/types/default
	}
}

func NewGenesisState(params Params) *GenesisState {
	return &GenesisState{
		Params:            params,
		TransactionList:   nil,
		TransactionCount:  0,
		TransactionChaser: 0,
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in transaction
	transactionIDMap := make(map[uint64]bool)
	transactionCount := gs.GetTransactionCount()
	for _, elem := range gs.TransactionList {
		if _, ok := transactionIDMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for transaction")
		}
		if elem.Id >= transactionCount {
			return fmt.Errorf("transaction id should be lower or equal than the last id")
		}
		transactionIDMap[elem.Id] = true
	}

	if gs.Params.DurationOfExpiration <= 0 {
		return fmt.Errorf("duration of expiration should be positive; %d", gs.Params.DurationOfExpiration)
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
