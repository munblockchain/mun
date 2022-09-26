/* eslint-disable */
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Params } from "../../claim/v1beta1/params";
import { ClaimRecord } from "../../claim/v1beta1/claim_record";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mun.claim.v1beta1";

/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  /**
   * this line is used by starport scaffolding # genesis/proto/state
   * balance of the claim module's account
   */
  moduleAccountBalance: Coin | undefined;
  /** params defines all the parameters of the module. */
  params: Params | undefined;
  /** list of claim records, one for every airdrop recipient */
  claimRecords: ClaimRecord[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.moduleAccountBalance !== undefined) {
      Coin.encode(
        message.moduleAccountBalance,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.claimRecords) {
      ClaimRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleAccountBalance = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 3:
          message.claimRecords.push(
            ClaimRecord.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      message.moduleAccountBalance = Coin.fromJSON(object.moduleAccountBalance);
    } else {
      message.moduleAccountBalance = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.moduleAccountBalance !== undefined &&
      (obj.moduleAccountBalance = message.moduleAccountBalance
        ? Coin.toJSON(message.moduleAccountBalance)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.claimRecords) {
      obj.claimRecords = message.claimRecords.map((e) =>
        e ? ClaimRecord.toJSON(e) : undefined
      );
    } else {
      obj.claimRecords = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      message.moduleAccountBalance = Coin.fromPartial(
        object.moduleAccountBalance
      );
    } else {
      message.moduleAccountBalance = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
