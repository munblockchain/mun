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
		Use:   "claim-for [action=0:InitialClaim,1:Staking,2:Voting]",
		Short: "Claim For Action",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			action, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}

			var typeAction types.Action
			var proof string
			switch action {
			case 1:
				typeAction = types.ActionDelegateStake
			case 2:
				typeAction = types.ActionVote
			default:
				typeAction = types.ActionInitialClaim
				proof = cmd.Flags().Lookup("proof").Value.String()
			}

			msg := types.NewMsgClaimFor(
				clientCtx.GetFromAddress().String(),
				typeAction,
				proof,
			)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	cmd.Flags().String("proof", "", "Proof for initial claim")

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
