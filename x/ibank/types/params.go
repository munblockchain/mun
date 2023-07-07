package types

import (
	"fmt"
	"time"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

const (
	DefaultDurationOfExpiration = "48h"
)

// Parameter store keys
var (
	KeyDurationOfExpiration = []byte("DurationOfExpiration")
)

var _ paramtypes.ParamSet = (*Params)(nil)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(duration time.Duration) Params {
	return Params{
		DurationOfExpiration: duration,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	dur, _ := time.ParseDuration(DefaultDurationOfExpiration)
	return NewParams(dur)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyDurationOfExpiration, &p.DurationOfExpiration, validateDuration),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

func validateDuration(i interface{}) error {
	d, ok := i.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	if d < 1 {
		return fmt.Errorf("duration must be greater than 1: %d", d)
	}
	return nil
}
