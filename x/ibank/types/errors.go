package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/ibank module sentinel errors
var (
	ErrNoTransaction   = sdkerrors.Register(ModuleName, 2, "transaction not found")
	ErrAlreadyReceived = sdkerrors.Register(ModuleName, 3, "already received this fund")
	ErrTxExpired       = sdkerrors.Register(ModuleName, 4, "transaction has expired")
	ErrTxDeclined      = sdkerrors.Register(ModuleName, 5, "transaction is declined")
	ErrInvalidReceiver = sdkerrors.Register(ModuleName, 6, "invalid receiver")
)
