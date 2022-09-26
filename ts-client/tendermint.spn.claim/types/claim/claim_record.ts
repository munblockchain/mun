/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tendermint.spn.claim";

export interface ClaimRecord {
  address: string;
  claimable: string;
  completedMissions: number[];
}

const baseClaimRecord: object = {
  address: "",
  claimable: "",
  completedMissions: 0,
};

export const ClaimRecord = {
  encode(message: ClaimRecord, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.claimable !== "") {
      writer.uint32(18).string(message.claimable);
    }
    writer.uint32(26).fork();
    for (const v of message.completedMissions) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClaimRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.completedMissions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.claimable = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.completedMissions.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.completedMissions.push(
              longToNumber(reader.uint64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.completedMissions = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.claimable !== undefined && object.claimable !== null) {
      message.claimable = String(object.claimable);
    } else {
      message.claimable = "";
    }
    if (
      object.completedMissions !== undefined &&
      object.completedMissions !== null
    ) {
      for (const e of object.completedMissions) {
        message.completedMissions.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: ClaimRecord): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.claimable !== undefined && (obj.claimable = message.claimable);
    if (message.completedMissions) {
      obj.completedMissions = message.completedMissions.map((e) => e);
    } else {
      obj.completedMissions = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ClaimRecord>): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.completedMissions = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.claimable !== undefined && object.claimable !== null) {
      message.claimable = object.claimable;
    } else {
      message.claimable = "";
    }
    if (
      object.completedMissions !== undefined &&
      object.completedMissions !== null
    ) {
      for (const e of object.completedMissions) {
        message.completedMissions.push(e);
      }
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
