/* eslint-disable */
import { Coin } from "../cosmos/base/v1beta1/coin";
import { ClaimRecord } from "../claim/claim_record";
import { Mission } from "../claim/mission";
import { Params } from "../claim/params";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tendermint.spn.claim";

/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  airdropSupply: Coin | undefined;
  claimRecords: ClaimRecord[];
  missions: Mission[];
  params: Params | undefined;
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.airdropSupply !== undefined) {
      Coin.encode(message.airdropSupply, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.claimRecords) {
      ClaimRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.missions) {
      Mission.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    message.missions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdropSupply = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.claimRecords.push(
            ClaimRecord.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.missions.push(Mission.decode(reader, reader.uint32()));
          break;
        case 4:
          message.params = Params.decode(reader, reader.uint32());
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
    message.missions = [];
    if (object.airdropSupply !== undefined && object.airdropSupply !== null) {
      message.airdropSupply = Coin.fromJSON(object.airdropSupply);
    } else {
      message.airdropSupply = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromJSON(e));
      }
    }
    if (object.missions !== undefined && object.missions !== null) {
      for (const e of object.missions) {
        message.missions.push(Mission.fromJSON(e));
      }
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.airdropSupply !== undefined &&
      (obj.airdropSupply = message.airdropSupply
        ? Coin.toJSON(message.airdropSupply)
        : undefined);
    if (message.claimRecords) {
      obj.claimRecords = message.claimRecords.map((e) =>
        e ? ClaimRecord.toJSON(e) : undefined
      );
    } else {
      obj.claimRecords = [];
    }
    if (message.missions) {
      obj.missions = message.missions.map((e) =>
        e ? Mission.toJSON(e) : undefined
      );
    } else {
      obj.missions = [];
    }
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    message.missions = [];
    if (object.airdropSupply !== undefined && object.airdropSupply !== null) {
      message.airdropSupply = Coin.fromPartial(object.airdropSupply);
    } else {
      message.airdropSupply = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromPartial(e));
      }
    }
    if (object.missions !== undefined && object.missions !== null) {
      for (const e of object.missions) {
        message.missions.push(Mission.fromPartial(e));
      }
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
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
