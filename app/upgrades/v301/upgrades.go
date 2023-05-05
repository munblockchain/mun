package v301

import (
	"mun/app/keepers"

	"github.com/CosmWasm/wasmd/x/wasm"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	icacontrollertypes "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts/controller/types"
)

func CreateUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	keepers *keepers.AppKeepers,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, fromVm module.VersionMap) (module.VersionMap, error) {
		fromVm[wasm.ModuleName] = 1

		sb, ok := keepers.ParamsKeeper.GetSubspace(icacontrollertypes.SubModuleName)
		if !ok {
			panic("ica controller sub space does not exist")
		}

		sb.Set(ctx, icacontrollertypes.KeyControllerEnabled, true)
		defaultParams := icacontrollertypes.DefaultParams()
		sb.SetParamSet(ctx, &defaultParams)

		return mm.RunMigrations(ctx, configurator, fromVm)
	}
}
