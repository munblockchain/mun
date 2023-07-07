package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpdateMerkleRoot{}

// msg types
const (
	TypeMsgUpdateMerkleRoot = "update_merkle_root"
)

func NewMsgUpdateMerkleRoot(sender string, value string) *MsgUpdateMerkleRoot {
	return &MsgUpdateMerkleRoot{
		Sender:    sender,
		RootValue: value,
	}
}

func (msg *MsgUpdateMerkleRoot) Route() string {
	return RouterKey
}

func (msg *MsgUpdateMerkleRoot) Type() string {
	return TypeMsgUpdateMerkleRoot
}

func (msg *MsgUpdateMerkleRoot) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

func (msg *MsgUpdateMerkleRoot) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	return nil
}
