/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mun.ibank";

export interface MsgSend {
  fromAddress: string;
  toAddress: string;
  amount: Coin | undefined;
  passwordHash: string;
}

export interface MsgSendResponse {
}

export interface MsgReceive {
  receiver: string;
  transactionId: number;
  password: string;
}

export interface MsgReceiveResponse {
}

function createBaseMsgSend(): MsgSend {
  return { fromAddress: "", toAddress: "", amount: undefined, passwordHash: "" };
}

export const MsgSend = {
  encode(message: MsgSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromAddress !== "") {
      writer.uint32(10).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(18).string(message.toAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.passwordHash !== "") {
      writer.uint32(34).string(message.passwordHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromAddress = reader.string();
          break;
        case 2:
          message.toAddress = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.passwordHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSend {
    return {
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      passwordHash: isSet(object.passwordHash) ? String(object.passwordHash) : "",
    };
  },

  toJSON(message: MsgSend): unknown {
    const obj: any = {};
    message.fromAddress !== undefined && (obj.fromAddress = message.fromAddress);
    message.toAddress !== undefined && (obj.toAddress = message.toAddress);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.passwordHash !== undefined && (obj.passwordHash = message.passwordHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSend>, I>>(object: I): MsgSend {
    const message = createBaseMsgSend();
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.passwordHash = object.passwordHash ?? "";
    return message;
  },
};

function createBaseMsgSendResponse(): MsgSendResponse {
  return {};
}

export const MsgSendResponse = {
  encode(_: MsgSendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSendResponse {
    return {};
  },

  toJSON(_: MsgSendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendResponse>, I>>(_: I): MsgSendResponse {
    const message = createBaseMsgSendResponse();
    return message;
  },
};

function createBaseMsgReceive(): MsgReceive {
  return { receiver: "", transactionId: 0, password: "" };
}

export const MsgReceive = {
  encode(message: MsgReceive, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receiver !== "") {
      writer.uint32(10).string(message.receiver);
    }
    if (message.transactionId !== 0) {
      writer.uint32(16).int64(message.transactionId);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReceive {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReceive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string();
          break;
        case 2:
          message.transactionId = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReceive {
    return {
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      transactionId: isSet(object.transactionId) ? Number(object.transactionId) : 0,
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: MsgReceive): unknown {
    const obj: any = {};
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.transactionId !== undefined && (obj.transactionId = Math.round(message.transactionId));
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReceive>, I>>(object: I): MsgReceive {
    const message = createBaseMsgReceive();
    message.receiver = object.receiver ?? "";
    message.transactionId = object.transactionId ?? 0;
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseMsgReceiveResponse(): MsgReceiveResponse {
  return {};
}

export const MsgReceiveResponse = {
  encode(_: MsgReceiveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReceiveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReceiveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgReceiveResponse {
    return {};
  },

  toJSON(_: MsgReceiveResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReceiveResponse>, I>>(_: I): MsgReceiveResponse {
    const message = createBaseMsgReceiveResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  Send(request: MsgSend): Promise<MsgSendResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Receive(request: MsgReceive): Promise<MsgReceiveResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Send = this.Send.bind(this);
    this.Receive = this.Receive.bind(this);
  }
  Send(request: MsgSend): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Msg", "Send", data);
    return promise.then((data) => MsgSendResponse.decode(new _m0.Reader(data)));
  }

  Receive(request: MsgReceive): Promise<MsgReceiveResponse> {
    const data = MsgReceive.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Msg", "Receive", data);
    return promise.then((data) => MsgReceiveResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
