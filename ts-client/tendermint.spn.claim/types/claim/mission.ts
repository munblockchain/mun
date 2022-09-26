/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tendermint.spn.claim";

export interface Mission {
  missionID: number;
  description: string;
  weight: string;
}

const baseMission: object = { missionID: 0, description: "", weight: "" };

export const Mission = {
  encode(message: Mission, writer: Writer = Writer.create()): Writer {
    if (message.missionID !== 0) {
      writer.uint32(8).uint64(message.missionID);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.weight !== "") {
      writer.uint32(26).string(message.weight);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Mission {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMission } as Mission;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.missionID = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.weight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Mission {
    const message = { ...baseMission } as Mission;
    if (object.missionID !== undefined && object.missionID !== null) {
      message.missionID = Number(object.missionID);
    } else {
      message.missionID = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = String(object.weight);
    } else {
      message.weight = "";
    }
    return message;
  },

  toJSON(message: Mission): unknown {
    const obj: any = {};
    message.missionID !== undefined && (obj.missionID = message.missionID);
    message.description !== undefined &&
      (obj.description = message.description);
    message.weight !== undefined && (obj.weight = message.weight);
    return obj;
  },

  fromPartial(object: DeepPartial<Mission>): Mission {
    const message = { ...baseMission } as Mission;
    if (object.missionID !== undefined && object.missionID !== null) {
      message.missionID = object.missionID;
    } else {
      message.missionID = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    } else {
      message.weight = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
