package v303

import (
	upgrade "mun/app/upgrades"

	store "github.com/cosmos/cosmos-sdk/store/types"
)

const (
	// UpgradeName defines the on-chain upgrade name.
	UpgradeName   = "mun-upgrade-v3.0.3"
	allocStoreKey = "alloc"
)

var Upgrade = upgrade.UpgradeMun{
	UpgradeName:          UpgradeName,
	CreateUpgradeHandler: CreateUpgradeHandler,
	StoreUpgrades: store.StoreUpgrades{
		Added:   []string{},
		Deleted: []string{allocStoreKey},
	},
}
