package keeper_test

import (
	"context"
	"testing"
	"time"

	"mun/testutil/simapp"
	"mun/x/claim/keeper"
	"mun/x/claim/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	app := simapp.New(t.TempDir())
	ctx := app.BaseApp.NewContext(false, tmproto.Header{Height: 2, ChainID: "stargaze-1", Time: time.Now().UTC()})
	app.ClaimKeeper.CreateModuleAccount(ctx, sdk.NewCoin(types.DefaultClaimDenom, sdk.NewInt(10000000)))
	return keeper.NewMsgServerImpl(app.ClaimKeeper), sdk.WrapSDKContext(ctx)
}
