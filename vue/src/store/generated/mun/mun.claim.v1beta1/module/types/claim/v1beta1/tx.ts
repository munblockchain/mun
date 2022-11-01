/* eslint-disable */
import {
  Action,
  actionFromJSON,
  actionToJSON,
} from "../../claim/v1beta1/claim_record";
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "mun.claim.v1beta1";

export interface MsgInitialClaim {
  sender: string;
}

export interface MsgInitialClaimResponse {
  /** total initial claimable amount for the user */
  claimed_amount: Coin[];
}

export interface MsgClaimFor {
  sender: string;
  address: string;
  action: Action;
}

export interface MsgClaimForResponse {
  address: string;
  /** total initial claimable amount for the user */
  claimed_amount: Coin[];
}

const baseMsgInitialClaim: object = { sender: "" };

export const MsgInitialClaim = {
  encode(message: MsgInitialClaim, writer: Writer = Writer.create()): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    return message;
  },

  toJSON(message: MsgInitialClaim): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgInitialClaim>): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    return message;
  },
};

const baseMsgInitialClaimResponse: object = {};

export const MsgInitialClaimResponse = {
  encode(
    message: MsgInitialClaimResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.claimed_amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.claimed_amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaimResponse {
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgInitialClaimResponse): unknown {
    const obj: any = {};
    if (message.claimed_amount) {
      obj.claimed_amount = message.claimed_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimed_amount = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgInitialClaimResponse>
  ): MsgInitialClaimResponse {
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgClaimFor: object = { sender: "", address: "", action: 0 };

export const MsgClaimFor = {
  encode(message: MsgClaimFor, writer: Writer = Writer.create()): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.action !== 0) {
      writer.uint32(24).int32(message.action);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimFor {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimFor } as MsgClaimFor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimFor {
    const message = { ...baseMsgClaimFor } as MsgClaimFor;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = actionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    return message;
  },

  toJSON(message: MsgClaimFor): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.address !== undefined && (obj.address = message.address);
    message.action !== undefined && (obj.action = actionToJSON(message.action));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgClaimFor>): MsgClaimFor {
    const message = { ...baseMsgClaimFor } as MsgClaimFor;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    return message;
  },
};

const baseMsgClaimForResponse: object = { address: "" };

export const MsgClaimForResponse = {
  encode(
    message: MsgClaimForResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.claimed_amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimForResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimForResponse } as MsgClaimForResponse;
    message.claimed_amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.claimed_amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimForResponse {
    const message = { ...baseMsgClaimForResponse } as MsgClaimForResponse;
    message.claimed_amount = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgClaimForResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.claimed_amount) {
      obj.claimed_amount = message.claimed_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimed_amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgClaimForResponse>): MsgClaimForResponse {
    const message = { ...baseMsgClaimForResponse } as MsgClaimForResponse;
    message.claimed_amount = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ClaimFor(request: MsgClaimFor): Promise<MsgClaimForResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse> {
    const data = MsgInitialClaim.encode(request).finish();
    const promise = this.rpc.request(
      "mun.claim.v1beta1.Msg",
      "InitialClaim",
      data
    );
    return promise.then((data) =>
      MsgInitialClaimResponse.decode(new Reader(data))
    );
  }

  ClaimFor(request: MsgClaimFor): Promise<MsgClaimForResponse> {
    const data = MsgClaimFor.encode(request).finish();
    const promise = this.rpc.request("mun.claim.v1beta1.Msg", "ClaimFor", data);
    return promise.then((data) => MsgClaimForResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
