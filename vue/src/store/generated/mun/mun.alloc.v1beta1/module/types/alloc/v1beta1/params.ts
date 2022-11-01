/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mun.alloc.v1beta1";

export interface WeightedAddress {
  address: string;
  weight: string;
}

export interface DistributionProportions {
  nft_incentives: string;
  developer_rewards: string;
}

export interface Params {
  /** distribution_proportions defines the proportion of the minted denom */
  distribution_proportions: DistributionProportions | undefined;
  /** address to receive developer rewards */
  weighted_developer_rewards_receivers: WeightedAddress[];
}

const baseWeightedAddress: object = { address: "", weight: "" };

export const WeightedAddress = {
  encode(message: WeightedAddress, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WeightedAddress {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWeightedAddress } as WeightedAddress;
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
    const message = { ...baseWeightedAddress } as WeightedAddress;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = String(object.weight);
    } else {
      message.weight = "";
    }
    return message;
  },

  toJSON(message: WeightedAddress): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.weight !== undefined && (obj.weight = message.weight);
    return obj;
  },

  fromPartial(object: DeepPartial<WeightedAddress>): WeightedAddress {
    const message = { ...baseWeightedAddress } as WeightedAddress;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    } else {
      message.weight = "";
    }
    return message;
  },
};

const baseDistributionProportions: object = {
  nft_incentives: "",
  developer_rewards: "",
};

export const DistributionProportions = {
  encode(
    message: DistributionProportions,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.nft_incentives !== "") {
      writer.uint32(10).string(message.nft_incentives);
    }
    if (message.developer_rewards !== "") {
      writer.uint32(18).string(message.developer_rewards);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DistributionProportions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDistributionProportions,
    } as DistributionProportions;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nft_incentives = reader.string();
          break;
        case 2:
          message.developer_rewards = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionProportions {
    const message = {
      ...baseDistributionProportions,
    } as DistributionProportions;
    if (object.nft_incentives !== undefined && object.nft_incentives !== null) {
      message.nft_incentives = String(object.nft_incentives);
    } else {
      message.nft_incentives = "";
    }
    if (
      object.developer_rewards !== undefined &&
      object.developer_rewards !== null
    ) {
      message.developer_rewards = String(object.developer_rewards);
    } else {
      message.developer_rewards = "";
    }
    return message;
  },

  toJSON(message: DistributionProportions): unknown {
    const obj: any = {};
    message.nft_incentives !== undefined &&
      (obj.nft_incentives = message.nft_incentives);
    message.developer_rewards !== undefined &&
      (obj.developer_rewards = message.developer_rewards);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DistributionProportions>
  ): DistributionProportions {
    const message = {
      ...baseDistributionProportions,
    } as DistributionProportions;
    if (object.nft_incentives !== undefined && object.nft_incentives !== null) {
      message.nft_incentives = object.nft_incentives;
    } else {
      message.nft_incentives = "";
    }
    if (
      object.developer_rewards !== undefined &&
      object.developer_rewards !== null
    ) {
      message.developer_rewards = object.developer_rewards;
    } else {
      message.developer_rewards = "";
    }
    return message;
  },
};

const baseParams: object = {};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.distribution_proportions !== undefined) {
      DistributionProportions.encode(
        message.distribution_proportions,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.weighted_developer_rewards_receivers) {
      WeightedAddress.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    message.weighted_developer_rewards_receivers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distribution_proportions = DistributionProportions.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.weighted_developer_rewards_receivers.push(
            WeightedAddress.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    message.weighted_developer_rewards_receivers = [];
    if (
      object.distribution_proportions !== undefined &&
      object.distribution_proportions !== null
    ) {
      message.distribution_proportions = DistributionProportions.fromJSON(
        object.distribution_proportions
      );
    } else {
      message.distribution_proportions = undefined;
    }
    if (
      object.weighted_developer_rewards_receivers !== undefined &&
      object.weighted_developer_rewards_receivers !== null
    ) {
      for (const e of object.weighted_developer_rewards_receivers) {
        message.weighted_developer_rewards_receivers.push(
          WeightedAddress.fromJSON(e)
        );
      }
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.distribution_proportions !== undefined &&
      (obj.distribution_proportions = message.distribution_proportions
        ? DistributionProportions.toJSON(message.distribution_proportions)
        : undefined);
    if (message.weighted_developer_rewards_receivers) {
      obj.weighted_developer_rewards_receivers = message.weighted_developer_rewards_receivers.map(
        (e) => (e ? WeightedAddress.toJSON(e) : undefined)
      );
    } else {
      obj.weighted_developer_rewards_receivers = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    message.weighted_developer_rewards_receivers = [];
    if (
      object.distribution_proportions !== undefined &&
      object.distribution_proportions !== null
    ) {
      message.distribution_proportions = DistributionProportions.fromPartial(
        object.distribution_proportions
      );
    } else {
      message.distribution_proportions = undefined;
    }
    if (
      object.weighted_developer_rewards_receivers !== undefined &&
      object.weighted_developer_rewards_receivers !== null
    ) {
      for (const e of object.weighted_developer_rewards_receivers) {
        message.weighted_developer_rewards_receivers.push(
          WeightedAddress.fromPartial(e)
        );
      }
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
