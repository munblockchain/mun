/* eslint-disable */
import { ConsumerClientID } from "../monitoringp/consumer_client_id";
import { ConnectionChannelID } from "../monitoringp/connection_channel_id";
import { MonitoringInfo } from "../monitoringp/monitoring_info";
import { Params } from "../monitoringp/params";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tendermint.spn.monitoringp";

/** GenesisState defines the monitoringp module's genesis state. */
export interface GenesisState {
  portId: string;
  consumerClientID: ConsumerClientID | undefined;
  connectionChannelID: ConnectionChannelID | undefined;
  monitoringInfo: MonitoringInfo | undefined;
  /** this line is used by starport scaffolding # genesis/proto/state */
  params: Params | undefined;
}

const baseGenesisState: object = { portId: "" };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.consumerClientID !== undefined) {
      ConsumerClientID.encode(
        message.consumerClientID,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.connectionChannelID !== undefined) {
      ConnectionChannelID.encode(
        message.connectionChannelID,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.monitoringInfo !== undefined) {
      MonitoringInfo.encode(
        message.monitoringInfo,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.consumerClientID = ConsumerClientID.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.connectionChannelID = ConnectionChannelID.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.monitoringInfo = MonitoringInfo.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId);
    } else {
      message.portId = "";
    }
    if (
      object.consumerClientID !== undefined &&
      object.consumerClientID !== null
    ) {
      message.consumerClientID = ConsumerClientID.fromJSON(
        object.consumerClientID
      );
    } else {
      message.consumerClientID = undefined;
    }
    if (
      object.connectionChannelID !== undefined &&
      object.connectionChannelID !== null
    ) {
      message.connectionChannelID = ConnectionChannelID.fromJSON(
        object.connectionChannelID
      );
    } else {
      message.connectionChannelID = undefined;
    }
    if (object.monitoringInfo !== undefined && object.monitoringInfo !== null) {
      message.monitoringInfo = MonitoringInfo.fromJSON(object.monitoringInfo);
    } else {
      message.monitoringInfo = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.consumerClientID !== undefined &&
      (obj.consumerClientID = message.consumerClientID
        ? ConsumerClientID.toJSON(message.consumerClientID)
        : undefined);
    message.connectionChannelID !== undefined &&
      (obj.connectionChannelID = message.connectionChannelID
        ? ConnectionChannelID.toJSON(message.connectionChannelID)
        : undefined);
    message.monitoringInfo !== undefined &&
      (obj.monitoringInfo = message.monitoringInfo
        ? MonitoringInfo.toJSON(message.monitoringInfo)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId;
    } else {
      message.portId = "";
    }
    if (
      object.consumerClientID !== undefined &&
      object.consumerClientID !== null
    ) {
      message.consumerClientID = ConsumerClientID.fromPartial(
        object.consumerClientID
      );
    } else {
      message.consumerClientID = undefined;
    }
    if (
      object.connectionChannelID !== undefined &&
      object.connectionChannelID !== null
    ) {
      message.connectionChannelID = ConnectionChannelID.fromPartial(
        object.connectionChannelID
      );
    } else {
      message.connectionChannelID = undefined;
    }
    if (object.monitoringInfo !== undefined && object.monitoringInfo !== null) {
      message.monitoringInfo = MonitoringInfo.fromPartial(
        object.monitoringInfo
      );
    } else {
      message.monitoringInfo = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
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
