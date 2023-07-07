package simulation

import (
	"crypto/sha256"
	"fmt"
	"math/rand"
	"mun/x/claim/keeper"
	"mun/x/claim/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

const (
	DefaultWeightMsgClaimFor         int = 100
	DefaultWeightMsgUpdateMerkleRoot int = 80

	OpWeightMsgClaimFor         = "op_weight_msg_claim_for"
	OpWeightMsgUpdateMerkleRoot = "op_weight_msg_update_merkle_root"
)

func WeightedOperations(
	appParams simtypes.AppParams,
	cdc codec.JSONCodec,
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k *keeper.Keeper,
) []simtypes.WeightedOperation {
	var (
		weightMsgClaimFor         int
		weightMsgUpdateMerkleRoot int
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgClaimFor, &weightMsgClaimFor, nil,
		func(_ *rand.Rand) {
			weightMsgClaimFor = DefaultWeightMsgClaimFor
		},
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgUpdateMerkleRoot, &weightMsgUpdateMerkleRoot, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateMerkleRoot = DefaultWeightMsgUpdateMerkleRoot
		},
	)

	return simulation.WeightedOperations{
		// simulation.NewWeightedOperation(
		// 	weightMsgClaimFor,
		// 	SimulateMsgClaimFor(ak, bk, k),
		// ),
		// simulation.NewWeightedOperation(
		// 	weightMsgUpdateMerkleRoot,
		// 	SimulateMsgUpdateMerkleRoot(ak),
		// ),
	}
}

func SimulateMsgClaimFor(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k *keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		sender := simAccount.Address.String()
		msg := types.NewMsgClaimFor(sender, types.Action(rand.Intn(3)), "")

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

func SimulateMsgUpdateMerkleRoot(ak types.AccountKeeper) simtypes.Operation {
	return func(
		r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		// Generate random merkle root hash
		randomValue := fmt.Sprintf("%d", rand.Int())
		merkleRoot := fmt.Sprintf("%x", sha256.Sum256([]byte(randomValue)))

		msg := types.NewMsgUpdateMerkleRoot(simAccount.Address.String(), merkleRoot)

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
			ModuleName:    types.ModuleName,
		}

		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}
