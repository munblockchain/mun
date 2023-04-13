/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { Transaction } from "./transaction";

export const protobufPackage = "mun.ibank";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetTransactionRequest {
  id: number;
}

export interface QueryGetTransactionResponse {
  transaction: Transaction | undefined;
}

export interface QueryAllTransactionRequest {
  address: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllTransactionResponse {
  transactions: TransactionWrapper[];
  pagination: PageResponse | undefined;
}

export interface QueryIncomingRequest {
  receiver: string;
  pending: boolean;
  pagination: PageRequest | undefined;
}

export interface QueryIncomingResponse {
  transactions: TransactionWrapper[];
  pagination: PageResponse | undefined;
}

export interface TransactionWrapper {
  transaction: Transaction | undefined;
  timeLeft: number;
}

export interface QueryOutgoingRequest {
  sender: string;
  pending: boolean;
  pagination: PageRequest | undefined;
}

export interface QueryOutgoingResponse {
  transactions: TransactionWrapper[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetTransactionRequest(): QueryGetTransactionRequest {
  return { id: 0 };
}

export const QueryGetTransactionRequest = {
  encode(message: QueryGetTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTransactionRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetTransactionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTransactionRequest>, I>>(object: I): QueryGetTransactionRequest {
    const message = createBaseQueryGetTransactionRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetTransactionResponse(): QueryGetTransactionResponse {
  return { transaction: undefined };
}

export const QueryGetTransactionResponse = {
  encode(message: QueryGetTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transaction = Transaction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTransactionResponse {
    return { transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined };
  },

  toJSON(message: QueryGetTransactionResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined
      && (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetTransactionResponse>, I>>(object: I): QueryGetTransactionResponse {
    const message = createBaseQueryGetTransactionResponse();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTransactionRequest(): QueryAllTransactionRequest {
  return { address: "", pagination: undefined };
}

export const QueryAllTransactionRequest = {
  encode(message: QueryAllTransactionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTransactionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTransactionRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTransactionRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTransactionRequest>, I>>(object: I): QueryAllTransactionRequest {
    const message = createBaseQueryAllTransactionRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllTransactionResponse(): QueryAllTransactionResponse {
  return { transactions: [], pagination: undefined };
}

export const QueryAllTransactionResponse = {
  encode(message: QueryAllTransactionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.transactions) {
      TransactionWrapper.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactions.push(TransactionWrapper.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTransactionResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => TransactionWrapper.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllTransactionResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) => e ? TransactionWrapper.toJSON(e) : undefined);
    } else {
      obj.transactions = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllTransactionResponse>, I>>(object: I): QueryAllTransactionResponse {
    const message = createBaseQueryAllTransactionResponse();
    message.transactions = object.transactions?.map((e) => TransactionWrapper.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryIncomingRequest(): QueryIncomingRequest {
  return { receiver: "", pending: false, pagination: undefined };
}

export const QueryIncomingRequest = {
  encode(message: QueryIncomingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receiver !== "") {
      writer.uint32(10).string(message.receiver);
    }
    if (message.pending === true) {
      writer.uint32(16).bool(message.pending);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncomingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncomingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string();
          break;
        case 2:
          message.pending = reader.bool();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIncomingRequest {
    return {
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      pending: isSet(object.pending) ? Boolean(object.pending) : false,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncomingRequest): unknown {
    const obj: any = {};
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.pending !== undefined && (obj.pending = message.pending);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryIncomingRequest>, I>>(object: I): QueryIncomingRequest {
    const message = createBaseQueryIncomingRequest();
    message.receiver = object.receiver ?? "";
    message.pending = object.pending ?? false;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryIncomingResponse(): QueryIncomingResponse {
  return { transactions: [], pagination: undefined };
}

export const QueryIncomingResponse = {
  encode(message: QueryIncomingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.transactions) {
      TransactionWrapper.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncomingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncomingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactions.push(TransactionWrapper.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIncomingResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => TransactionWrapper.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncomingResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) => e ? TransactionWrapper.toJSON(e) : undefined);
    } else {
      obj.transactions = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryIncomingResponse>, I>>(object: I): QueryIncomingResponse {
    const message = createBaseQueryIncomingResponse();
    message.transactions = object.transactions?.map((e) => TransactionWrapper.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseTransactionWrapper(): TransactionWrapper {
  return { transaction: undefined, timeLeft: 0 };
}

export const TransactionWrapper = {
  encode(message: TransactionWrapper, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeLeft !== 0) {
      writer.uint32(16).uint32(message.timeLeft);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionWrapper {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transaction = Transaction.decode(reader, reader.uint32());
          break;
        case 2:
          message.timeLeft = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionWrapper {
    return {
      transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined,
      timeLeft: isSet(object.timeLeft) ? Number(object.timeLeft) : 0,
    };
  },

  toJSON(message: TransactionWrapper): unknown {
    const obj: any = {};
    message.transaction !== undefined
      && (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    message.timeLeft !== undefined && (obj.timeLeft = Math.round(message.timeLeft));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionWrapper>, I>>(object: I): TransactionWrapper {
    const message = createBaseTransactionWrapper();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    message.timeLeft = object.timeLeft ?? 0;
    return message;
  },
};

function createBaseQueryOutgoingRequest(): QueryOutgoingRequest {
  return { sender: "", pending: false, pagination: undefined };
}

export const QueryOutgoingRequest = {
  encode(message: QueryOutgoingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pending === true) {
      writer.uint32(16).bool(message.pending);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOutgoingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.pending = reader.bool();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryOutgoingRequest {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      pending: isSet(object.pending) ? Boolean(object.pending) : false,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryOutgoingRequest): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.pending !== undefined && (obj.pending = message.pending);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOutgoingRequest>, I>>(object: I): QueryOutgoingRequest {
    const message = createBaseQueryOutgoingRequest();
    message.sender = object.sender ?? "";
    message.pending = object.pending ?? false;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryOutgoingResponse(): QueryOutgoingResponse {
  return { transactions: [], pagination: undefined };
}

export const QueryOutgoingResponse = {
  encode(message: QueryOutgoingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.transactions) {
      TransactionWrapper.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOutgoingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOutgoingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactions.push(TransactionWrapper.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryOutgoingResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => TransactionWrapper.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryOutgoingResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) => e ? TransactionWrapper.toJSON(e) : undefined);
    } else {
      obj.transactions = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOutgoingResponse>, I>>(object: I): QueryOutgoingResponse {
    const message = createBaseQueryOutgoingResponse();
    message.transactions = object.transactions?.map((e) => TransactionWrapper.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Transaction by id. */
  Transaction(request: QueryGetTransactionRequest): Promise<QueryGetTransactionResponse>;
  /** Queries a list of Transaction items. */
  TransactionAll(request: QueryAllTransactionRequest): Promise<QueryAllTransactionResponse>;
  /** Queries a list of ShowIncoming items. */
  Incoming(request: QueryIncomingRequest): Promise<QueryIncomingResponse>;
  /** Queries a list of ShowOutgoing items. */
  Outgoing(request: QueryOutgoingRequest): Promise<QueryOutgoingResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Transaction = this.Transaction.bind(this);
    this.TransactionAll = this.TransactionAll.bind(this);
    this.Incoming = this.Incoming.bind(this);
    this.Outgoing = this.Outgoing.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Transaction(request: QueryGetTransactionRequest): Promise<QueryGetTransactionResponse> {
    const data = QueryGetTransactionRequest.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Query", "Transaction", data);
    return promise.then((data) => QueryGetTransactionResponse.decode(new _m0.Reader(data)));
  }

  TransactionAll(request: QueryAllTransactionRequest): Promise<QueryAllTransactionResponse> {
    const data = QueryAllTransactionRequest.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Query", "TransactionAll", data);
    return promise.then((data) => QueryAllTransactionResponse.decode(new _m0.Reader(data)));
  }

  Incoming(request: QueryIncomingRequest): Promise<QueryIncomingResponse> {
    const data = QueryIncomingRequest.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Query", "Incoming", data);
    return promise.then((data) => QueryIncomingResponse.decode(new _m0.Reader(data)));
  }

  Outgoing(request: QueryOutgoingRequest): Promise<QueryOutgoingResponse> {
    const data = QueryOutgoingRequest.encode(request).finish();
    const promise = this.rpc.request("mun.ibank.Query", "Outgoing", data);
    return promise.then((data) => QueryOutgoingResponse.decode(new _m0.Reader(data)));
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
