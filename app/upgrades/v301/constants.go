package v301

import (
	upgrade "mun/app/upgrades"
	ibankmoduletypes "mun/x/ibank/types"

	store "github.com/cosmos/cosmos-sdk/store/types"
	icacontrollertypes "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts/controller/types"
	ibcfeetypes "github.com/cosmos/ibc-go/v4/modules/core/05-port/types"
	packetforwardtypes "github.com/strangelove-ventures/packet-forward-middleware/v4/router/types"
)

const (
	// UpgradeName defines the on-chain upgrade name.
	UpgradeName         = "mun-upgrade-v3.0.1"
	monitoringpStoreKey = "monitoringp"
)

var Upgrade = upgrade.UpgradeMun{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added:   []string{packetforwardtypes.ModuleName, icacontrollertypes.SubModuleName, ibcfeetypes.SubModuleName, ibankmoduletypes.ModuleName},
		Deleted: []string{monitoringpStoreKey},
	},
}
