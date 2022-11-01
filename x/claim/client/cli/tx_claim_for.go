package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"mun/x/claim/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdClaimFor() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "claim-for [action=0:InitialClaim,1:Staking,2:Voting,3:Swapping]",
		Short: "Claim For Action",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			action, _ := strconv.ParseInt(args[0], 10, 64)
			typeAction := types.ActionInitialClaim

			if action == 3 {
				typeAction = types.ActionSwap
			} else if action == 1 {
				typeAction = types.ActionDelegateStake
			} else if action == 2 {
				typeAction = types.ActionVote
			}

			msg := types.NewMsgClaimFor(
				clientCtx.GetFromAddress().String(),
				clientCtx.GetFromAddress().String(),
				typeAction,
			)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
