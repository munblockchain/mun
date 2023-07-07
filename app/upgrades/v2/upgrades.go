package v2

import (
	"mun/app/keepers"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	keepers *keepers.AppKeepers,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		ctx.Logger().Info("start to run module migrations...")

		unbondingTime, _ := time.ParseDuration("1814400s")
		stakingParams := stakingtypes.Params{
			UnbondingTime:     unbondingTime,
			MaxValidators:     150,
			MaxEntries:        7,
			HistoricalEntries: 10000,
			BondDenom:         "utmun",
		}

		keepers.StakingKeeper.SetParams(ctx, stakingParams)
		return mm.RunMigrations(ctx, configurator, vm)
	}
}
