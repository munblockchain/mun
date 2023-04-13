/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "mun.alloc.v1beta1";

export interface WeightedAddress {
  address: string;
  weight: string;
}

export interface DistributionProportions {
  nftIncentives: string;
  developerRewards: string;
}

export interface Params {
  /** distribution_proportions defines the proportion of the minted denom */
  distributionProportions:
    | DistributionProportions
    | undefined;
  /** address to receive developer rewards */
  weightedDeveloperRewardsReceivers: WeightedAddress[];
}

function createBaseWeightedAddress(): WeightedAddress {
  return { address: "", weight: "" };
}

export const WeightedAddress = {
  encode(message: WeightedAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeightedAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightedAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.weight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WeightedAddress {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      weight: isSet(object.weight) ? String(object.weight) : "",
    };
  },

  toJSON(message: WeightedAddress): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.weight !== undefined && (obj.weight = message.weight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WeightedAddress>, I>>(object: I): WeightedAddress {
    const message = createBaseWeightedAddress();
    message.address = object.address ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBaseDistributionProportions(): DistributionProportions {
  return { nftIncentives: "", developerRewards: "" };
}

export const DistributionProportions = {
  encode(message: DistributionProportions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nftIncentives !== "") {
      writer.uint32(10).string(message.nftIncentives);
    }
    if (message.developerRewards !== "") {
      writer.uint32(18).string(message.developerRewards);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributionProportions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionProportions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftIncentives = reader.string();
          break;
        case 2:
          message.developerRewards = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionProportions {
    return {
      nftIncentives: isSet(object.nftIncentives) ? String(object.nftIncentives) : "",
      developerRewards: isSet(object.developerRewards) ? String(object.developerRewards) : "",
    };
  },

  toJSON(message: DistributionProportions): unknown {
    const obj: any = {};
    message.nftIncentives !== undefined && (obj.nftIncentives = message.nftIncentives);
    message.developerRewards !== undefined && (obj.developerRewards = message.developerRewards);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributionProportions>, I>>(object: I): DistributionProportions {
    const message = createBaseDistributionProportions();
    message.nftIncentives = object.nftIncentives ?? "";
    message.developerRewards = object.developerRewards ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return { distributionProportions: undefined, weightedDeveloperRewardsReceivers: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distributionProportions !== undefined) {
      DistributionProportions.encode(message.distributionProportions, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.weightedDeveloperRewardsReceivers) {
      WeightedAddress.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.distributionProportions = DistributionProportions.decode(reader, reader.uint32());
          break;
        case 2:
          message.weightedDeveloperRewardsReceivers.push(WeightedAddress.decode(reader, reader.uint32()));
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
      distributionProportions: isSet(object.distributionProportions)
        ? DistributionProportions.fromJSON(object.distributionProportions)
        : undefined,
      weightedDeveloperRewardsReceivers: Array.isArray(object?.weightedDeveloperRewardsReceivers)
        ? object.weightedDeveloperRewardsReceivers.map((e: any) => WeightedAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.distributionProportions !== undefined && (obj.distributionProportions = message.distributionProportions
      ? DistributionProportions.toJSON(message.distributionProportions)
      : undefined);
    if (message.weightedDeveloperRewardsReceivers) {
      obj.weightedDeveloperRewardsReceivers = message.weightedDeveloperRewardsReceivers.map((e) =>
        e ? WeightedAddress.toJSON(e) : undefined
      );
    } else {
      obj.weightedDeveloperRewardsReceivers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.distributionProportions =
      (object.distributionProportions !== undefined && object.distributionProportions !== null)
        ? DistributionProportions.fromPartial(object.distributionProportions)
        : undefined;
    message.weightedDeveloperRewardsReceivers =
      object.weightedDeveloperRewardsReceivers?.map((e) => WeightedAddress.fromPartial(e)) || [];
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
