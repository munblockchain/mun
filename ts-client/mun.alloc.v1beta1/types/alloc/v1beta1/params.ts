/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

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
  distributionProportions: DistributionProportions | undefined;
  /** address to receive developer rewards */
  weightedDeveloperRewardsReceivers: WeightedAddress[];
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
  nftIncentives: "",
  developerRewards: "",
};

export const DistributionProportions = {
  encode(
    message: DistributionProportions,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.nftIncentives !== "") {
      writer.uint32(10).string(message.nftIncentives);
    }
    if (message.developerRewards !== "") {
      writer.uint32(18).string(message.developerRewards);
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
    const message = {
      ...baseDistributionProportions,
    } as DistributionProportions;
    if (object.nftIncentives !== undefined && object.nftIncentives !== null) {
      message.nftIncentives = String(object.nftIncentives);
    } else {
      message.nftIncentives = "";
    }
    if (
      object.developerRewards !== undefined &&
      object.developerRewards !== null
    ) {
      message.developerRewards = String(object.developerRewards);
    } else {
      message.developerRewards = "";
    }
    return message;
  },

  toJSON(message: DistributionProportions): unknown {
    const obj: any = {};
    message.nftIncentives !== undefined &&
      (obj.nftIncentives = message.nftIncentives);
    message.developerRewards !== undefined &&
      (obj.developerRewards = message.developerRewards);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DistributionProportions>
  ): DistributionProportions {
    const message = {
      ...baseDistributionProportions,
    } as DistributionProportions;
    if (object.nftIncentives !== undefined && object.nftIncentives !== null) {
      message.nftIncentives = object.nftIncentives;
    } else {
      message.nftIncentives = "";
    }
    if (
      object.developerRewards !== undefined &&
      object.developerRewards !== null
    ) {
      message.developerRewards = object.developerRewards;
    } else {
      message.developerRewards = "";
    }
    return message;
  },
};

const baseParams: object = {};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.distributionProportions !== undefined) {
      DistributionProportions.encode(
        message.distributionProportions,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.weightedDeveloperRewardsReceivers) {
      WeightedAddress.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    message.weightedDeveloperRewardsReceivers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributionProportions = DistributionProportions.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.weightedDeveloperRewardsReceivers.push(
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
    message.weightedDeveloperRewardsReceivers = [];
    if (
      object.distributionProportions !== undefined &&
      object.distributionProportions !== null
    ) {
      message.distributionProportions = DistributionProportions.fromJSON(
        object.distributionProportions
      );
    } else {
      message.distributionProportions = undefined;
    }
    if (
      object.weightedDeveloperRewardsReceivers !== undefined &&
      object.weightedDeveloperRewardsReceivers !== null
    ) {
      for (const e of object.weightedDeveloperRewardsReceivers) {
        message.weightedDeveloperRewardsReceivers.push(
          WeightedAddress.fromJSON(e)
        );
      }
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.distributionProportions !== undefined &&
      (obj.distributionProportions = message.distributionProportions
        ? DistributionProportions.toJSON(message.distributionProportions)
        : undefined);
    if (message.weightedDeveloperRewardsReceivers) {
      obj.weightedDeveloperRewardsReceivers = message.weightedDeveloperRewardsReceivers.map(
        (e) => (e ? WeightedAddress.toJSON(e) : undefined)
      );
    } else {
      obj.weightedDeveloperRewardsReceivers = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    message.weightedDeveloperRewardsReceivers = [];
    if (
      object.distributionProportions !== undefined &&
      object.distributionProportions !== null
    ) {
      message.distributionProportions = DistributionProportions.fromPartial(
        object.distributionProportions
      );
    } else {
      message.distributionProportions = undefined;
    }
    if (
      object.weightedDeveloperRewardsReceivers !== undefined &&
      object.weightedDeveloperRewardsReceivers !== null
    ) {
      for (const e of object.weightedDeveloperRewardsReceivers) {
        message.weightedDeveloperRewardsReceivers.push(
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
