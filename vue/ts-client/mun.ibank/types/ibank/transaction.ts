/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "mun.ibank";

export enum TxnStatus {
  TXN_PENDING = 0,
  TXN_SENT = 1,
  TXN_EXPIRED = 2,
  TXN_DECLINED = 3,
  UNRECOGNIZED = -1,
}

export function txnStatusFromJSON(object: any): TxnStatus {
  switch (object) {
    case 0:
    case "TXN_PENDING":
      return TxnStatus.TXN_PENDING;
    case 1:
    case "TXN_SENT":
      return TxnStatus.TXN_SENT;
    case 2:
    case "TXN_EXPIRED":
      return TxnStatus.TXN_EXPIRED;
    case 3:
    case "TXN_DECLINED":
      return TxnStatus.TXN_DECLINED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TxnStatus.UNRECOGNIZED;
  }
}

export function txnStatusToJSON(object: TxnStatus): string {
  switch (object) {
    case TxnStatus.TXN_PENDING:
      return "TXN_PENDING";
    case TxnStatus.TXN_SENT:
      return "TXN_SENT";
    case TxnStatus.TXN_EXPIRED:
      return "TXN_EXPIRED";
    case TxnStatus.TXN_DECLINED:
      return "TXN_DECLINED";
    case TxnStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Transaction {
  id: number;
  sender: string;
  sentAt: Date | undefined;
  receiver: string;
  /** If sent_at is equal to received_at, transaction have not been performed */
  receivedAt: Date | undefined;
  coins: Coin[];
  status: TxnStatus;
  /** hash value of 6 word password */
  password: string;
  retry: number;
}

function createBaseTransaction(): Transaction {
  return {
    id: 0,
    sender: "",
    sentAt: undefined,
    receiver: "",
    receivedAt: undefined,
    coins: [],
    status: 0,
    password: "",
    retry: 0,
  };
}

export const Transaction = {
  encode(message: Transaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.sentAt !== undefined) {
      Timestamp.encode(toTimestamp(message.sentAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.receiver !== "") {
      writer.uint32(34).string(message.receiver);
    }
    if (message.receivedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.receivedAt), writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.password !== "") {
      writer.uint32(66).string(message.password);
    }
    if (message.retry !== 0) {
      writer.uint32(72).int32(message.retry);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transaction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.sentAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.receiver = reader.string();
          break;
        case 5:
          message.receivedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.status = reader.int32() as any;
          break;
        case 8:
          message.password = reader.string();
          break;
        case 9:
          message.retry = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Transaction {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      sender: isSet(object.sender) ? String(object.sender) : "",
      sentAt: isSet(object.sentAt) ? fromJsonTimestamp(object.sentAt) : undefined,
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      receivedAt: isSet(object.receivedAt) ? fromJsonTimestamp(object.receivedAt) : undefined,
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      status: isSet(object.status) ? txnStatusFromJSON(object.status) : 0,
      password: isSet(object.password) ? String(object.password) : "",
      retry: isSet(object.retry) ? Number(object.retry) : 0,
    };
  },

  toJSON(message: Transaction): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.sender !== undefined && (obj.sender = message.sender);
    message.sentAt !== undefined && (obj.sentAt = message.sentAt.toISOString());
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.receivedAt !== undefined && (obj.receivedAt = message.receivedAt.toISOString());
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    message.status !== undefined && (obj.status = txnStatusToJSON(message.status));
    message.password !== undefined && (obj.password = message.password);
    message.retry !== undefined && (obj.retry = Math.round(message.retry));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Transaction>, I>>(object: I): Transaction {
    const message = createBaseTransaction();
    message.id = object.id ?? 0;
    message.sender = object.sender ?? "";
    message.sentAt = object.sentAt ?? undefined;
    message.receiver = object.receiver ?? "";
    message.receivedAt = object.receivedAt ?? undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.password = object.password ?? "";
    message.retry = object.retry ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
