package upgrade

import (
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	stakingkeeper stakingkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		ctx.Logger().Info("start to run module migrations...")

		unbond_time, _ := time.ParseDuration("1814400s")
		stakingParams := stakingtypes.Params{
			UnbondingTime:     unbond_time,
			MaxValidators:     150,
			MaxEntries:        7,
			HistoricalEntries: 10000,
			BondDenom:         "utmun",
		}

		stakingkeeper.SetParams(ctx, stakingParams)
		return mm.RunMigrations(ctx, configurator, vm)
	}
}
