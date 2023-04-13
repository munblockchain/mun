/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Action, actionFromJSON, actionToJSON } from "./claim_record";

export const protobufPackage = "mun.claim.v1beta1";

export interface ClaimAuthorization {
  contractAddress: string;
  action: Action;
}

/** Params defines the claim module's parameters. */
export interface Params {
  airdropEnabled: boolean;
  airdropStartTime: Date | undefined;
  durationUntilDecay: Duration | undefined;
  durationOfDecay:
    | Duration
    | undefined;
  /** denom of claimable asset */
  claimDenom: string;
  /** list of contracts and their allowed claim actions */
  allowedClaimers: ClaimAuthorization[];
}

function createBaseClaimAuthorization(): ClaimAuthorization {
  return { contractAddress: "", action: 0 };
}

export const ClaimAuthorization = {
  encode(message: ClaimAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimAuthorization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimAuthorization {
    return {
      contractAddress: isSet(object.contractAddress) ? String(object.contractAddress) : "",
      action: isSet(object.action) ? actionFromJSON(object.action) : 0,
    };
  },

  toJSON(message: ClaimAuthorization): unknown {
    const obj: any = {};
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    message.action !== undefined && (obj.action = actionToJSON(message.action));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClaimAuthorization>, I>>(object: I): ClaimAuthorization {
    const message = createBaseClaimAuthorization();
    message.contractAddress = object.contractAddress ?? "";
    message.action = object.action ?? 0;
    return message;
  },
};

function createBaseParams(): Params {
  return {
    airdropEnabled: false,
    airdropStartTime: undefined,
    durationUntilDecay: undefined,
    durationOfDecay: undefined,
    claimDenom: "",
    allowedClaimers: [],
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.airdropEnabled === true) {
      writer.uint32(8).bool(message.airdropEnabled);
    }
    if (message.airdropStartTime !== undefined) {
      Timestamp.encode(toTimestamp(message.airdropStartTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.durationUntilDecay !== undefined) {
      Duration.encode(message.durationUntilDecay, writer.uint32(26).fork()).ldelim();
    }
    if (message.durationOfDecay !== undefined) {
      Duration.encode(message.durationOfDecay, writer.uint32(34).fork()).ldelim();
    }
    if (message.claimDenom !== "") {
      writer.uint32(42).string(message.claimDenom);
    }
    for (const v of message.allowedClaimers) {
      ClaimAuthorization.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdropEnabled = reader.bool();
          break;
        case 2:
          message.airdropStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.durationUntilDecay = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.durationOfDecay = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.claimDenom = reader.string();
          break;
        case 6:
          message.allowedClaimers.push(ClaimAuthorization.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      airdropEnabled: isSet(object.airdropEnabled) ? Boolean(object.airdropEnabled) : false,
      airdropStartTime: isSet(object.airdropStartTime) ? fromJsonTimestamp(object.airdropStartTime) : undefined,
      durationUntilDecay: isSet(object.durationUntilDecay) ? Duration.fromJSON(object.durationUntilDecay) : undefined,
      durationOfDecay: isSet(object.durationOfDecay) ? Duration.fromJSON(object.durationOfDecay) : undefined,
      claimDenom: isSet(object.claimDenom) ? String(object.claimDenom) : "",
      allowedClaimers: Array.isArray(object?.allowedClaimers)
        ? object.allowedClaimers.map((e: any) => ClaimAuthorization.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.airdropEnabled !== undefined && (obj.airdropEnabled = message.airdropEnabled);
    message.airdropStartTime !== undefined && (obj.airdropStartTime = message.airdropStartTime.toISOString());
    message.durationUntilDecay !== undefined
      && (obj.durationUntilDecay = message.durationUntilDecay
        ? Duration.toJSON(message.durationUntilDecay)
        : undefined);
    message.durationOfDecay !== undefined
      && (obj.durationOfDecay = message.durationOfDecay ? Duration.toJSON(message.durationOfDecay) : undefined);
    message.claimDenom !== undefined && (obj.claimDenom = message.claimDenom);
    if (message.allowedClaimers) {
      obj.allowedClaimers = message.allowedClaimers.map((e) => e ? ClaimAuthorization.toJSON(e) : undefined);
    } else {
      obj.allowedClaimers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.airdropEnabled = object.airdropEnabled ?? false;
    message.airdropStartTime = object.airdropStartTime ?? undefined;
    message.durationUntilDecay = (object.durationUntilDecay !== undefined && object.durationUntilDecay !== null)
      ? Duration.fromPartial(object.durationUntilDecay)
      : undefined;
    message.durationOfDecay = (object.durationOfDecay !== undefined && object.durationOfDecay !== null)
      ? Duration.fromPartial(object.durationOfDecay)
      : undefined;
    message.claimDenom = object.claimDenom ?? "";
    message.allowedClaimers = object.allowedClaimers?.map((e) => ClaimAuthorization.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
