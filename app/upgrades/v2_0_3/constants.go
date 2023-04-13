package v2_0_3

import (
	upgrade "mun/app/upgrades"

	store "github.com/cosmos/cosmos-sdk/store/types"
)

const (
	// UpgradeName defines the on-chain upgrade name.
	UpgradeName = "mun-upgrade-v203"
)

var Upgrade = upgrade.UpgradeMun{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added: []string{},
	},
}
