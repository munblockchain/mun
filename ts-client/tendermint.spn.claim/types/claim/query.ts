/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../claim/params";
import { ClaimRecord } from "../claim/claim_record";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Mission } from "../claim/mission";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "tendermint.spn.claim";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetClaimRecordRequest {
  address: string;
}

export interface QueryGetClaimRecordResponse {
  claimRecord: ClaimRecord | undefined;
}

export interface QueryAllClaimRecordRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllClaimRecordResponse {
  claimRecord: ClaimRecord[];
  pagination: PageResponse | undefined;
}

export interface QueryGetMissionRequest {
  missionID: number;
}

export interface QueryGetMissionResponse {
  Mission: Mission | undefined;
}

export interface QueryAllMissionRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllMissionResponse {
  Mission: Mission[];
  pagination: PageResponse | undefined;
}

export interface QueryGetAirdropSupplyRequest {}

export interface QueryGetAirdropSupplyResponse {
  AirdropSupply: Coin | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
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
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetClaimRecordRequest: object = { address: "" };

export const QueryGetClaimRecordRequest = {
  encode(
    message: QueryGetClaimRecordRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetClaimRecordRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetClaimRecordRequest,
    } as QueryGetClaimRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetClaimRecordRequest {
    const message = {
      ...baseQueryGetClaimRecordRequest,
    } as QueryGetClaimRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryGetClaimRecordRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetClaimRecordRequest>
  ): QueryGetClaimRecordRequest {
    const message = {
      ...baseQueryGetClaimRecordRequest,
    } as QueryGetClaimRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryGetClaimRecordResponse: object = {};

export const QueryGetClaimRecordResponse = {
  encode(
    message: QueryGetClaimRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.claimRecord !== undefined) {
      ClaimRecord.encode(
        message.claimRecord,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetClaimRecordResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetClaimRecordResponse,
    } as QueryGetClaimRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimRecord = ClaimRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetClaimRecordResponse {
    const message = {
      ...baseQueryGetClaimRecordResponse,
    } as QueryGetClaimRecordResponse;
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      message.claimRecord = ClaimRecord.fromJSON(object.claimRecord);
    } else {
      message.claimRecord = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetClaimRecordResponse): unknown {
    const obj: any = {};
    message.claimRecord !== undefined &&
      (obj.claimRecord = message.claimRecord
        ? ClaimRecord.toJSON(message.claimRecord)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetClaimRecordResponse>
  ): QueryGetClaimRecordResponse {
    const message = {
      ...baseQueryGetClaimRecordResponse,
    } as QueryGetClaimRecordResponse;
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      message.claimRecord = ClaimRecord.fromPartial(object.claimRecord);
    } else {
      message.claimRecord = undefined;
    }
    return message;
  },
};

const baseQueryAllClaimRecordRequest: object = {};

export const QueryAllClaimRecordRequest = {
  encode(
    message: QueryAllClaimRecordRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllClaimRecordRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllClaimRecordRequest,
    } as QueryAllClaimRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllClaimRecordRequest {
    const message = {
      ...baseQueryAllClaimRecordRequest,
    } as QueryAllClaimRecordRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllClaimRecordRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllClaimRecordRequest>
  ): QueryAllClaimRecordRequest {
    const message = {
      ...baseQueryAllClaimRecordRequest,
    } as QueryAllClaimRecordRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllClaimRecordResponse: object = {};

export const QueryAllClaimRecordResponse = {
  encode(
    message: QueryAllClaimRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.claimRecord) {
      ClaimRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllClaimRecordResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllClaimRecordResponse,
    } as QueryAllClaimRecordResponse;
    message.claimRecord = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimRecord.push(ClaimRecord.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllClaimRecordResponse {
    const message = {
      ...baseQueryAllClaimRecordResponse,
    } as QueryAllClaimRecordResponse;
    message.claimRecord = [];
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      for (const e of object.claimRecord) {
        message.claimRecord.push(ClaimRecord.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllClaimRecordResponse): unknown {
    const obj: any = {};
    if (message.claimRecord) {
      obj.claimRecord = message.claimRecord.map((e) =>
        e ? ClaimRecord.toJSON(e) : undefined
      );
    } else {
      obj.claimRecord = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllClaimRecordResponse>
  ): QueryAllClaimRecordResponse {
    const message = {
      ...baseQueryAllClaimRecordResponse,
    } as QueryAllClaimRecordResponse;
    message.claimRecord = [];
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      for (const e of object.claimRecord) {
        message.claimRecord.push(ClaimRecord.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetMissionRequest: object = { missionID: 0 };

export const QueryGetMissionRequest = {
  encode(
    message: QueryGetMissionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.missionID !== 0) {
      writer.uint32(8).uint64(message.missionID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetMissionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetMissionRequest } as QueryGetMissionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.missionID = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMissionRequest {
    const message = { ...baseQueryGetMissionRequest } as QueryGetMissionRequest;
    if (object.missionID !== undefined && object.missionID !== null) {
      message.missionID = Number(object.missionID);
    } else {
      message.missionID = 0;
    }
    return message;
  },

  toJSON(message: QueryGetMissionRequest): unknown {
    const obj: any = {};
    message.missionID !== undefined && (obj.missionID = message.missionID);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetMissionRequest>
  ): QueryGetMissionRequest {
    const message = { ...baseQueryGetMissionRequest } as QueryGetMissionRequest;
    if (object.missionID !== undefined && object.missionID !== null) {
      message.missionID = object.missionID;
    } else {
      message.missionID = 0;
    }
    return message;
  },
};

const baseQueryGetMissionResponse: object = {};

export const QueryGetMissionResponse = {
  encode(
    message: QueryGetMissionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Mission !== undefined) {
      Mission.encode(message.Mission, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetMissionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetMissionResponse,
    } as QueryGetMissionResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Mission = Mission.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMissionResponse {
    const message = {
      ...baseQueryGetMissionResponse,
    } as QueryGetMissionResponse;
    if (object.Mission !== undefined && object.Mission !== null) {
      message.Mission = Mission.fromJSON(object.Mission);
    } else {
      message.Mission = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetMissionResponse): unknown {
    const obj: any = {};
    message.Mission !== undefined &&
      (obj.Mission = message.Mission
        ? Mission.toJSON(message.Mission)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetMissionResponse>
  ): QueryGetMissionResponse {
    const message = {
      ...baseQueryGetMissionResponse,
    } as QueryGetMissionResponse;
    if (object.Mission !== undefined && object.Mission !== null) {
      message.Mission = Mission.fromPartial(object.Mission);
    } else {
      message.Mission = undefined;
    }
    return message;
  },
};

const baseQueryAllMissionRequest: object = {};

export const QueryAllMissionRequest = {
  encode(
    message: QueryAllMissionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMissionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllMissionRequest } as QueryAllMissionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllMissionRequest {
    const message = { ...baseQueryAllMissionRequest } as QueryAllMissionRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMissionRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMissionRequest>
  ): QueryAllMissionRequest {
    const message = { ...baseQueryAllMissionRequest } as QueryAllMissionRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllMissionResponse: object = {};

export const QueryAllMissionResponse = {
  encode(
    message: QueryAllMissionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Mission) {
      Mission.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllMissionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllMissionResponse,
    } as QueryAllMissionResponse;
    message.Mission = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Mission.push(Mission.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllMissionResponse {
    const message = {
      ...baseQueryAllMissionResponse,
    } as QueryAllMissionResponse;
    message.Mission = [];
    if (object.Mission !== undefined && object.Mission !== null) {
      for (const e of object.Mission) {
        message.Mission.push(Mission.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllMissionResponse): unknown {
    const obj: any = {};
    if (message.Mission) {
      obj.Mission = message.Mission.map((e) =>
        e ? Mission.toJSON(e) : undefined
      );
    } else {
      obj.Mission = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllMissionResponse>
  ): QueryAllMissionResponse {
    const message = {
      ...baseQueryAllMissionResponse,
    } as QueryAllMissionResponse;
    message.Mission = [];
    if (object.Mission !== undefined && object.Mission !== null) {
      for (const e of object.Mission) {
        message.Mission.push(Mission.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetAirdropSupplyRequest: object = {};

export const QueryGetAirdropSupplyRequest = {
  encode(
    _: QueryGetAirdropSupplyRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAirdropSupplyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAirdropSupplyRequest,
    } as QueryGetAirdropSupplyRequest;
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

  fromJSON(_: any): QueryGetAirdropSupplyRequest {
    const message = {
      ...baseQueryGetAirdropSupplyRequest,
    } as QueryGetAirdropSupplyRequest;
    return message;
  },

  toJSON(_: QueryGetAirdropSupplyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryGetAirdropSupplyRequest>
  ): QueryGetAirdropSupplyRequest {
    const message = {
      ...baseQueryGetAirdropSupplyRequest,
    } as QueryGetAirdropSupplyRequest;
    return message;
  },
};

const baseQueryGetAirdropSupplyResponse: object = {};

export const QueryGetAirdropSupplyResponse = {
  encode(
    message: QueryGetAirdropSupplyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.AirdropSupply !== undefined) {
      Coin.encode(message.AirdropSupply, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetAirdropSupplyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetAirdropSupplyResponse,
    } as QueryGetAirdropSupplyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.AirdropSupply = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAirdropSupplyResponse {
    const message = {
      ...baseQueryGetAirdropSupplyResponse,
    } as QueryGetAirdropSupplyResponse;
    if (object.AirdropSupply !== undefined && object.AirdropSupply !== null) {
      message.AirdropSupply = Coin.fromJSON(object.AirdropSupply);
    } else {
      message.AirdropSupply = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetAirdropSupplyResponse): unknown {
    const obj: any = {};
    message.AirdropSupply !== undefined &&
      (obj.AirdropSupply = message.AirdropSupply
        ? Coin.toJSON(message.AirdropSupply)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetAirdropSupplyResponse>
  ): QueryGetAirdropSupplyResponse {
    const message = {
      ...baseQueryGetAirdropSupplyResponse,
    } as QueryGetAirdropSupplyResponse;
    if (object.AirdropSupply !== undefined && object.AirdropSupply !== null) {
      message.AirdropSupply = Coin.fromPartial(object.AirdropSupply);
    } else {
      message.AirdropSupply = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a ClaimRecord by address. */
  ClaimRecord(
    request: QueryGetClaimRecordRequest
  ): Promise<QueryGetClaimRecordResponse>;
  /** Queries a list of ClaimRecord items. */
  ClaimRecordAll(
    request: QueryAllClaimRecordRequest
  ): Promise<QueryAllClaimRecordResponse>;
  /** Queries a Mission by ID. */
  Mission(request: QueryGetMissionRequest): Promise<QueryGetMissionResponse>;
  /** Queries a list of Mission items. */
  MissionAll(request: QueryAllMissionRequest): Promise<QueryAllMissionResponse>;
  /** Queries a AirdropSupply by index. */
  AirdropSupply(
    request: QueryGetAirdropSupplyRequest
  ): Promise<QueryGetAirdropSupplyResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  ClaimRecord(
    request: QueryGetClaimRecordRequest
  ): Promise<QueryGetClaimRecordResponse> {
    const data = QueryGetClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "ClaimRecord",
      data
    );
    return promise.then((data) =>
      QueryGetClaimRecordResponse.decode(new Reader(data))
    );
  }

  ClaimRecordAll(
    request: QueryAllClaimRecordRequest
  ): Promise<QueryAllClaimRecordResponse> {
    const data = QueryAllClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "ClaimRecordAll",
      data
    );
    return promise.then((data) =>
      QueryAllClaimRecordResponse.decode(new Reader(data))
    );
  }

  Mission(request: QueryGetMissionRequest): Promise<QueryGetMissionResponse> {
    const data = QueryGetMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "Mission",
      data
    );
    return promise.then((data) =>
      QueryGetMissionResponse.decode(new Reader(data))
    );
  }

  MissionAll(
    request: QueryAllMissionRequest
  ): Promise<QueryAllMissionResponse> {
    const data = QueryAllMissionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "MissionAll",
      data
    );
    return promise.then((data) =>
      QueryAllMissionResponse.decode(new Reader(data))
    );
  }

  AirdropSupply(
    request: QueryGetAirdropSupplyRequest
  ): Promise<QueryGetAirdropSupplyResponse> {
    const data = QueryGetAirdropSupplyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.spn.claim.Query",
      "AirdropSupply",
      data
    );
    return promise.then((data) =>
      QueryGetAirdropSupplyResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
