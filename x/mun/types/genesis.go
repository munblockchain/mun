package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		VersionList: []Version{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in version
	versionIndexMap := make(map[string]struct{})

	for _, elem := range gs.VersionList {
		index := string(VersionKey(elem.Index))
		if _, ok := versionIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for version")
		}
		versionIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
