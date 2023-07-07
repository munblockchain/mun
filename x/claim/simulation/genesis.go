package simulation

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"mun/x/claim/types"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
)

const (
	Enabled            = "enabled"
	ClaimDenom         = "claim_denom"
	StartTime          = "start_time"
	DurationUntilDecay = "duration_until_decay"
	DurationOfDecay    = "duratin_of_decay"
)

func RandomEnabledFlag(r *rand.Rand) bool {
	return r.Int63n(101) <= 50 // 50% chance of airdrop enabled
}

func RandomStartTime(r *rand.Rand) time.Time {
	return time.Time{}.Add(time.Second * time.Duration(r.Int63n(10000)))
}

func RandomDurationUntilDecay(r *rand.Rand) time.Duration {
	// 1~100 seconds
	return time.Second * time.Duration(1+r.Int63n(100))
}

func RandomDurationOfDecay(r *rand.Rand) time.Duration {
	// 1~5000 seconds
	return time.Second * time.Duration(1+r.Int63n(5000))
}

func RandomGenesisModuleAccountBalance(r *rand.Rand) sdk.Coin {
	// 1000000 ~ 2000000 TMUN
	return sdk.NewCoin("utmun", sdk.NewInt(r.Int63n(1000000)+1000000).Mul(sdk.NewInt(1000000)))
}

func RandomGenesisMerkleRoot() string {
	return "04c287c1de1a9734959d8c04725fe56d7b70efefd4f13eb6885386cf55a8501b" // sha256("random genesis merkle root")
}

func RandomGenesisClaimRecords(simState *module.SimulationState) []types.ClaimRecord {
	records := make([]types.ClaimRecord, 0)

	for _, acc := range simState.Accounts {
		records = append(records, types.ClaimRecord{
			Address:         acc.Address.String(),
			ActionReady:     make([]bool, 0),
			ActionCompleted: make([]bool, 0),
		})
	}
	return records
}

// RandomizedGenState generates a random GenesisState for claim
func RandomizedGenState(simState *module.SimulationState) {
	var enabled bool
	simState.AppParams.GetOrGenerate(
		simState.Cdc, Enabled, &enabled, simState.Rand,
		func(r *rand.Rand) { enabled = RandomEnabledFlag(r) },
	)

	claimDenom := "utmun"

	var startTime time.Time
	simState.AppParams.GetOrGenerate(
		simState.Cdc, StartTime, &startTime, simState.Rand,
		func(r *rand.Rand) { startTime = RandomStartTime(r) },
	)

	var durationUntilDecay time.Duration
	simState.AppParams.GetOrGenerate(
		simState.Cdc, DurationUntilDecay, &durationUntilDecay, simState.Rand,
		func(r *rand.Rand) { durationUntilDecay = RandomDurationUntilDecay(r) },
	)

	var durationOfDecay time.Duration
	simState.AppParams.GetOrGenerate(
		simState.Cdc, DurationOfDecay, &durationOfDecay, simState.Rand,
		func(r *rand.Rand) { durationOfDecay = RandomDurationOfDecay(r) },
	)

	params := types.NewParams(
		enabled,
		claimDenom,
		startTime,
		durationUntilDecay,
		durationOfDecay,
	)

	claimGenesis := types.NewGenesisState(
		RandomGenesisModuleAccountBalance(simState.Rand),
		params,
		RandomGenesisClaimRecords(simState),
		RandomGenesisMerkleRoot(),
	)

	bz, err := json.MarshalIndent(&claimGenesis.Params, "", " ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Selected randomly generated claim parameters:\n%s\n", bz)
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(claimGenesis)
}
