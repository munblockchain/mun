package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
)

type AccountKeeper interface {
	GetModuleAddress(name string) sdk.AccAddress
	SetModuleAccount(ctx sdk.Context, macc authtypes.ModuleAccountI)
	GetAccount(ctx sdk.Context, addr sdk.AccAddress) authtypes.AccountI // only used for simulation
}

type BankKeeper interface {
	SendCoinsFromModuleToAccount(ctx sdk.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
	SendCoinsFromModuleToModule(ctx sdk.Context, senderPool, recipientPool string, amt sdk.Coins) error
	GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin
	MintCoins(ctx sdk.Context, moduleName string, amt sdk.Coins) error
	SpendableCoins(ctx sdk.Context, addr sdk.AccAddress) sdk.Coins
}

type StakingKeeper interface {
	BondDenom(sdk.Context) string
}

type DistrKeeper interface {
	FundCommunityPool(ctx sdk.Context, amount sdk.Coins, sender sdk.AccAddress) error
}
