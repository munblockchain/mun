package keeper

import (
	"mun/x/mun/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/version"
)

// SetVersion set a specific version in the store from its index
func (k Keeper) SetVersion(ctx sdk.Context, version types.Version) {
}

// GetVersion returns a version from its index
func (k Keeper) GetVersion(
	ctx sdk.Context,
	index string,

) (val types.Version, found bool) {
	version := types.Version{
		Index:   "1",
		Version: version.Version,
	}

	return version, true
}

// RemoveVersion removes a version from the store
func (k Keeper) RemoveVersion(
	ctx sdk.Context,
	index string,

) {
}
