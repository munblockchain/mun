package simulation

import (
	"math/rand"

	"mun/x/ibank/keeper"
	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgReceive(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgReceive{
			Receiver: simAccount.Address.String(),
		}

		// TODO: Handling the Receive simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "Receive simulation not implemented"), nil, nil
	}
}
