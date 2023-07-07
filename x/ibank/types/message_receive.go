package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgReceive = "receive"

var _ sdk.Msg = &MsgReceive{}

func NewMsgReceive(receiver string, transactionID int64, password string) *MsgReceive {
	return &MsgReceive{
		Receiver:      receiver,
		TransactionId: transactionID,
		Password:      password,
	}
}

func (msg *MsgReceive) Route() string {
	return RouterKey
}

func (msg *MsgReceive) Type() string {
	return TypeMsgReceive
}

func (msg *MsgReceive) GetSigners() []sdk.AccAddress {
	receiver, err := sdk.AccAddressFromBech32(msg.Receiver)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{receiver}
}

func (msg *MsgReceive) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgReceive) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Receiver)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid receiver address (%s)", err)
	}
	return nil
}
