package v303

import (
	"mun/app/keepers"

	ibanktypes "mun/x/ibank/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

const (
	MerkleRoot = "4567efe1ffef2087b5ab30112753e7088bb509ce1955e79744ff44db4ab8790d"
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	keepers *keepers.AppKeepers,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, fromVm module.VersionMap) (module.VersionMap, error) {
		keepers.ClaimKeeper.SetMerkleRoot(ctx, MerkleRoot)
		keepers.IbankKeeper.SetParams(ctx, ibanktypes.DefaultParams())

		return mm.RunMigrations(ctx, configurator, fromVm)
	}
}

func ManualUpgrade(ctx sdk.Context, keepers *keepers.AppKeepers) {
	keepers.ClaimKeeper.SetMerkleRoot(ctx, MerkleRoot)
	keepers.IbankKeeper.SetParams(ctx, ibanktypes.DefaultParams())
}
