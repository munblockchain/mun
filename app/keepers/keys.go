package keepers

import (
	"github.com/CosmWasm/wasmd/x/wasm"
	"github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	packetforwardtypes "github.com/strangelove-ventures/packet-forward-middleware/v4/router/types"

	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	icacontrollertypes "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts/controller/types"
	icahosttypes "github.com/cosmos/ibc-go/v4/modules/apps/27-interchain-accounts/host/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v4/modules/apps/transfer/types"
	ibcfeetypes "github.com/cosmos/ibc-go/v4/modules/core/05-port/types"
	ibchost "github.com/cosmos/ibc-go/v4/modules/core/24-host"

	claimmoduletypes "mun/x/claim/types"

	ibankmoduletypes "mun/x/ibank/types"
)

func newKVStoreKeys() map[string]*storetypes.KVStoreKey {
	return sdk.NewKVStoreKeys(
		authtypes.StoreKey, authz.ModuleName, banktypes.StoreKey, stakingtypes.StoreKey,
		minttypes.StoreKey, distrtypes.StoreKey, slashingtypes.StoreKey,
		govtypes.StoreKey, paramstypes.StoreKey, ibchost.StoreKey, upgradetypes.StoreKey, feegrant.StoreKey,
		evidencetypes.StoreKey, ibctransfertypes.StoreKey, icahosttypes.StoreKey, capabilitytypes.StoreKey,
		ibcfeetypes.StoreKey, packetforwardtypes.StoreKey, icacontrollertypes.StoreKey,
		wasm.StoreKey, claimmoduletypes.StoreKey, ibankmoduletypes.StoreKey,
		// this line is used by starport scaffolding # stargate/app/storeKey
	)
}
