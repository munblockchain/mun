package keeper_test

import (
	"mun/app"
	"mun/x/ibank/types"
	"testing"

	"github.com/cosmos/cosmos-sdk/simapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"github.com/tendermint/tendermint/types/time"
)

const (
	fooDenom = "foo"
	barDenom = "bar"
)

func newFooCoin(amt int64) sdk.Coin {
	return sdk.NewInt64Coin(fooDenom, amt)
}

func newBarCoin(amt int64) sdk.Coin {
	return sdk.NewInt64Coin(barDenom, amt)
}

type IntegrationTestSuite struct {
	suite.Suite

	Ctx sdk.Context
	App *app.App
}

func (suite *IntegrationTestSuite) SetupTest() {
	isCheckTx := false

	suite.App = app.Setup()
	suite.Ctx = suite.App.GetBaseApp().NewContext(isCheckTx, tmproto.Header{
		ChainID: "mun-test-1",
		Height:  1,
		Time:    time.Now().UTC(),
	})
}

func (suite *IntegrationTestSuite) TestCreateModuleAccount() {
	app := suite.App

	// remove module account
	ibankModuleAcc := app.AccountKeeper.GetAccount(suite.Ctx, app.AccountKeeper.GetModuleAddress(types.ModuleName))
	app.AccountKeeper.RemoveAccount(suite.Ctx, ibankModuleAcc)

	// ensure module account was removed
	suite.Ctx = app.BaseApp.NewContext(false, tmproto.Header{})
	ibankModuleAcc = app.AccountKeeper.GetAccount(suite.Ctx, app.AccountKeeper.GetModuleAddress(types.ModuleName))
	suite.Require().Nil(ibankModuleAcc)

	// create module account
	app.IbankKeeper.CreateModuleAccount(suite.Ctx)

	// check module account is initialized
	ibankModuleAcc = app.AccountKeeper.GetAccount(suite.Ctx, app.AccountKeeper.GetModuleAddress(types.ModuleName))
	suite.Require().NotNil(ibankModuleAcc)
}

func (suite *IntegrationTestSuite) TestSendCoin() {
	app, ctx := suite.App, suite.Ctx
	balances := sdk.NewCoins(newFooCoin(100), newBarCoin(50))

	// Alice
	addrAlice := sdk.AccAddress([]byte("addr1_______________"))
	accAlice := app.AccountKeeper.NewAccountWithAddress(ctx, addrAlice)
	app.AccountKeeper.SetAccount(ctx, accAlice)
	suite.Require().NoError(simapp.FundAccount(app.BankKeeper, ctx, addrAlice, balances))
	suite.Require().Equal(balances, app.BankKeeper.GetAllBalances(ctx, addrAlice))

	// Bob
	addrBob := sdk.AccAddress([]byte("addr2_______________"))

	suite.Require().Nil(app.AccountKeeper.GetAccount(ctx, addrBob))
	app.BankKeeper.GetAllBalances(ctx, addrBob)
	suite.Require().Empty(app.BankKeeper.GetAllBalances(ctx, addrBob))

	// Module account
	addrIbank := app.AccountKeeper.GetModuleAddress(types.ModuleName)
	suite.Require().Empty(app.BankKeeper.GetAllBalances(ctx, addrIbank))

	// Sending
	sendAmt := newFooCoin(50)
	password := "password"
	suite.Require().NoError(app.IbankKeeper.SendCoin(ctx, addrAlice, addrBob, sendAmt, password))

	// Check balances
	expectedAliceBalances := sdk.NewCoins(newFooCoin(50), newBarCoin(50))
	app.BankKeeper.GetAllBalances(ctx, addrAlice)
	suite.Require().Equal(expectedAliceBalances, app.BankKeeper.GetAllBalances(ctx, addrAlice))
	suite.Require().Empty(app.BankKeeper.GetAllBalances(ctx, addrBob))
	suite.Require().Equal(sdk.NewCoins(sendAmt), app.BankKeeper.GetAllBalances(ctx, addrIbank))

	// Check pending transaction
	tx, found := app.IbankKeeper.GetTransaction(ctx, 0)
	suite.Require().Equal(true, found)
	suite.Require().Equal([]sdk.Coin{sendAmt}, tx.Coins)
	suite.Require().Equal(password, tx.Password)
	suite.Require().Equal(addrAlice.String(), tx.Sender)
	suite.Require().Equal(addrBob.String(), tx.Receiver)
	suite.Require().Equal(int32(3), tx.Retry)
	suite.Require().Equal(types.TxnStatus_TXN_PENDING, tx.Status)
}

func (suite *IntegrationTestSuite) TestReceiveCoin() {
	app, ctx := suite.App, suite.Ctx
	bankKeeper := app.BankKeeper

	// Test case
	aliceBalances := sdk.NewCoins(newFooCoin(100), newBarCoin(50))
	bobBalances := sdk.NewCoins(newFooCoin(10))
	sendAmt := newBarCoin(30)
	updatedAliceBal1 := aliceBalances.Sub(sdk.NewCoins(sendAmt)) // balance after send
	expectedAliceBal := aliceBalances.Sub(sdk.NewCoins(sendAmt)) //sdk.NewCoins(newFooCoin(90), newBarCoin(50))
	expectedBobBal := bobBalances.Add(sendAmt)

	phrases := "word1 word2 word3 word4 word5 word6"
	password := app.IbankKeeper.GetPasswordFromWords(ctx, phrases)
	transactionId := 0

	// Alice
	addrAlice := sdk.AccAddress([]byte("addr1_______________"))
	accAlice := app.AccountKeeper.NewAccountWithAddress(ctx, addrAlice)
	app.AccountKeeper.SetAccount(ctx, accAlice)
	suite.Require().NoError(simapp.FundAccount(bankKeeper, ctx, addrAlice, aliceBalances))
	suite.Require().Equal(aliceBalances, bankKeeper.GetAllBalances(ctx, addrAlice))

	// Bob
	addrBob := sdk.AccAddress([]byte("addr2_______________"))
	accBob := app.AccountKeeper.NewAccountWithAddress(ctx, addrBob)
	app.AccountKeeper.SetAccount(ctx, accBob)
	suite.Require().NoError(simapp.FundAccount(bankKeeper, ctx, addrBob, bobBalances))
	suite.Require().Equal(bobBalances, bankKeeper.GetAllBalances(ctx, addrBob))

	// Send
	suite.Require().NoError(app.IbankKeeper.SendCoin(ctx, addrAlice, addrBob, sendAmt, password))

	// Check balance after send
	suite.Require().Equal(updatedAliceBal1, bankKeeper.GetAllBalances(ctx, addrAlice))

	// Receive
	suite.Require().NoError(app.IbankKeeper.ReceiveCoin(ctx, addrBob, int64(transactionId), phrases))

	// check tx
	tx, found := app.IbankKeeper.GetTransaction(ctx, uint64(transactionId))
	suite.Require().Equal(true, found)
	suite.Require().Equal(types.TxnStatus_TXN_SENT, tx.Status)

	// Check result after receive
	suite.Require().Equal(expectedAliceBal, bankKeeper.GetAllBalances(ctx, addrAlice))
	suite.Require().Equal(expectedBobBal, bankKeeper.GetAllBalances(ctx, addrBob))
}

func (suite *IntegrationTestSuite) TestRefund() {
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}
