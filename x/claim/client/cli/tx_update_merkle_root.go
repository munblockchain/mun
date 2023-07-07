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

func CmdUpdateMerkleRoot() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-merkle-root [hash]",
		Short: "Update merkle root for initial airdrop",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateMerkleRoot(
				clientCtx.GetFromAddress().String(),
				args[0],
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
