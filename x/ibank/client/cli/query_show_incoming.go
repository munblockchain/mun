package cli

import (
	"strconv"

	"mun/x/ibank/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdShowIncoming() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "incoming [receiver] [pending]",
		Short: "Query show-incoming",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqReceiver := args[0]
			reqPending, err := cast.ToBoolE(args[1])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryIncomingRequest{

				Receiver: reqReceiver,
				Pending:  reqPending,
			}

			res, err := queryClient.Incoming(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
