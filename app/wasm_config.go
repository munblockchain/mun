package app

import (
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
)

const (
	// DefaultMunInstanceCost is initially set the same as in wasmd
	DefaultMunInstanceCost uint64 = 60_000
	// DefaultMunCompileCost set to a large number for testing
	DefaultMunCompileCost uint64 = 100
)

// MunGasRegisterConfig is defaults plus a custom compile amount
func MunGasRegisterConfig() wasmkeeper.WasmGasRegisterConfig {
	gasConfig := wasmkeeper.DefaultGasRegisterConfig()
	gasConfig.InstanceCost = DefaultMunInstanceCost
	gasConfig.CompileCost = DefaultMunCompileCost

	return gasConfig
}

func NewMunWasmGasRegister() wasmkeeper.WasmGasRegister {
	return wasmkeeper.NewWasmGasRegister(MunGasRegisterConfig())
}
