package simulation_test

import (
	"math/rand"
	"mun/x/claim/simulation"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParamChanges(t *testing.T) {
	s := rand.NewSource(1)
	r := rand.New(s)

	expected := []struct {
		composedKey string
		key         string
		simValue    string
		subspace    string
	}{
		{"claim/Enabled", "Enabled", "false", "claim"},
		{"claim/StartTime", "StartTime", "\"0001-01-01T00:59:11Z\"", "claim"},
		{"claim/DurationUntilDecay", "DurationUntilDecay", "\"22000000000\"", "claim"},
		{"claim/DurationOfDecay", "DurationOfDecay", "\"52000000000\"", "claim"},
	}

	paramChanges := simulation.ParamChanges(r)

	require.Len(t, paramChanges, 4)

	for i, p := range paramChanges {
		require.Equal(t, expected[i].composedKey, p.ComposedKey())
		require.Equal(t, expected[i].key, p.Key())
		require.Equal(t, expected[i].simValue, p.SimValue()(r))
		require.Equal(t, expected[i].subspace, p.Subspace())
	}
}
