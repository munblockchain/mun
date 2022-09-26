package wasm

import (
	"encoding/json"
	"fmt"

	sgwasm "mun/internal/wasm"
	claimtypes "mun/x/claim/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sgwasm.Encoder = Encoder

type ClaimAction string

const (
	ClaimActionSwapToken = "swap_token"
)

type ClaimFor struct {
	Address string      `json:"address"`
	Action  ClaimAction `json:"action"`
}

func (a ClaimAction) ToAction() (claimtypes.Action, error) {
	if a == ClaimActionSwapToken {
		return claimtypes.ActionSwap, nil
	}

	return 0, fmt.Errorf("invalid action")
}

type ClaimMsg struct {
	ClaimFor *ClaimFor `json:"claim_for,omitempty"`
}

func (c ClaimFor) Encode(contract sdk.AccAddress) ([]sdk.Msg, error) {
	action, err := c.Action.ToAction()
	if err != nil {
		return nil, err
	}
	msg := claimtypes.NewMsgClaimFor(contract.String(), c.Address, action)
	return []sdk.Msg{msg}, nil
}

func Encoder(contract sdk.AccAddress, data json.RawMessage, version string) ([]sdk.Msg, error) {
	msg := &ClaimMsg{}
	err := json.Unmarshal(data, msg)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONUnmarshal, err.Error())
	}
	if msg.ClaimFor != nil {
		return msg.ClaimFor.Encode(contract)
	}
	return nil, fmt.Errorf("wasm: invalid custom claim message")
}
