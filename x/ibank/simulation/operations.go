package simulation

import (
	"math/rand"
	"mun/x/ibank/keeper"
	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

const (
	DefaultWeightMsgSend    int = 100
	DefaultWeightMsgReceive int = 100

	OpWeightMsgSend    = "op_weight_msg_send"
	OpWeightMsgReceive = "op_weight_msg_receive"
)

func WeightedOperations(
	appParams simtypes.AppParams, cdc codec.JSONCodec, ak types.AccountKeeper,
	bk types.BankKeeper, k *keeper.Keeper,
) simulation.WeightedOperations {
	var (
		weightMsgSend    int
		weightMsgReceive int
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgSend, &weightMsgSend, nil,
		func(_ *rand.Rand) {
			weightMsgSend = DefaultWeightMsgSend
		},
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgReceive, &weightMsgReceive, nil,
		func(_ *rand.Rand) {
			weightMsgReceive = DefaultWeightMsgReceive
		},
	)

	return simulation.WeightedOperations{
		simulation.NewWeightedOperation(
			weightMsgSend,
			SimulateMsgSend(ak, bk, k),
		),
		// simulation.NewWeightedOperation(
		// 	weightMsgReceive,
		// 	SimulateMsgReceive(ak, bk, k),
		// ),
	}
}

func SimulateMsgSend(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k *keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		msg := &types.MsgSend{}

		if len(accs) < 2 {
			return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "Send simulation: not enough accounts"), nil, nil
		}

		fromAccount, _ := simtypes.RandomAcc(r, accs)
		toAccount, _ := simtypes.RandomAcc(r, accs)

		password := "557cf1df72ade86102a1d8f8e83cec2eab834133c2f7e6a1d64f13603d69fece" // sha256("word1 word2 word3 word4 word5 word6")
		spendable := bk.SpendableCoins(ctx, fromAccount.Address)
		if len(spendable) == 0 {
			return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "Send simulation: not enough funds to simulate"), nil, nil
		}

		msg = types.NewMsgSend(
			fromAccount.Address.String(),
			toAccount.Address.String(),
			spendable[0],
			password,
		)

		txCtx := simulation.OperationInput{
			R:               r,
			App:             app,
			TxGen:           simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:             nil,
			Msg:             msg,
			MsgType:         msg.Type(),
			Context:         ctx,
			SimAccount:      fromAccount,
			AccountKeeper:   ak,
			Bankkeeper:      bk,
			ModuleName:      types.ModuleName,
			CoinsSpentInMsg: sdk.NewCoins(spendable[0]),
		}

		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}

func SimulateMsgReceive(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k *keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgReceive{}

		txCount := k.GetTransactionCount(ctx)
		if txCount == 0 {
			return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "Send simulation: no ibank txs to simulate"), nil, nil
		}

		txID := rand.Int63n(int64(txCount))
		password := "word1 word2 word3 word4 word5 word6"

		msg = types.NewMsgReceive(
			simAccount.Address.String(),
			txID,
			password,
		)

		txCtx := simulation.OperationInput{
			R:             r,
			App:           app,
			TxGen:         simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:           nil,
			Msg:           msg,
			MsgType:       msg.Type(),
			Context:       ctx,
			SimAccount:    simAccount,
			AccountKeeper: ak,
			Bankkeeper:    bk,
			ModuleName:    types.ModuleName,
		}

		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}
