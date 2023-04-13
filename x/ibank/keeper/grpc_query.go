package keeper

import (
	"mun/x/ibank/types"
	"time"
)

var _ types.QueryServer = Keeper{}

func CalculateTimeLeftInSeconds(start, end time.Time, expirationDuration time.Duration) uint32 {
	if start.Add(expirationDuration).After(end) {
		return uint32(expirationDuration.Seconds() - end.Sub(start).Seconds())
	}
	return 0
}
