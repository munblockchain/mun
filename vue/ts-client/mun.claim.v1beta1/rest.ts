/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export enum V1Beta1Action {
  ActionInitialClaim = "ActionInitialClaim",
  ActionDelegateStake = "ActionDelegateStake",
  ActionVote = "ActionVote",
  ActionSwap = "ActionSwap",
}

export interface V1Beta1ClaimAuthorization {
  contract_address?: string;
  action?: V1Beta1Action;
}

export interface V1Beta1ClaimRecord {
  /** address of claim user */
  address?: string;

  /** total initial claimable amount for the user */
  initial_claimable_amount?: V1Beta1Coin[];

  /**
   * true if action is completed
   * index of bool in array refers to action enum #
   */
  action_completed?: boolean[];

  /**
   * true if action is ready to claim
   * index of bool in array refers to action enum #
   */
  action_ready?: boolean[];
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
}

export interface V1Beta1MsgClaimForResponse {
  address?: string;

  /** total initial claimable amount for the user */
  claimed_amount?: V1Beta1Coin[];
}

export interface V1Beta1MsgInitialClaimResponse {
  /** total initial claimable amount for the user */
  claimed_amount?: V1Beta1Coin[];
}

/**
 * Params defines the claim module's parameters.
 */
export interface V1Beta1Params {
  airdrop_enabled?: boolean;

  /** @format date-time */
  airdrop_start_time?: string;
  duration_until_decay?: string;
  duration_of_decay?: string;

  /** denom of claimable asset */
  claim_denom?: string;

  /** list of contracts and their allowed claim actions */
  allowed_claimers?: V1Beta1ClaimAuthorization[];
}

export interface V1Beta1QueryClaimRecordResponse {
  claim_record?: V1Beta1ClaimRecord;
}

export interface V1Beta1QueryClaimableForActionResponse {
  coins?: V1Beta1Coin[];
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface V1Beta1QueryModuleAccountBalanceResponse {
  /** params defines the parameters of the module. */
  moduleAccountBalance?: V1Beta1Coin[];
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface V1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: V1Beta1Params;
}

export interface V1Beta1QueryTotalClaimableResponse {
  coins?: V1Beta1Coin[];
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title claim/v1beta1/claim_record.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryClaimRecord
   * @request GET:/mun/claim/v1beta1/claim_record/{address}
   */
  queryClaimRecord = (address: string, params: RequestParams = {}) =>
    this.request<V1Beta1QueryClaimRecordResponse, RpcStatus>({
      path: `/mun/claim/v1beta1/claim_record/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryClaimableForAction
   * @request GET:/mun/claim/v1beta1/claimable_for_action/{address}/{action}
   */
  queryClaimableForAction = (
    address: string,
    action: "ActionInitialClaim" | "ActionDelegateStake" | "ActionVote" | "ActionSwap",
    params: RequestParams = {},
  ) =>
    this.request<V1Beta1QueryClaimableForActionResponse, RpcStatus>({
      path: `/mun/claim/v1beta1/claimable_for_action/${address}/${action}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleAccountBalance
   * @summary this line is used by starport scaffolding # 2
   * @request GET:/mun/claim/v1beta1/module_account_balance
   */
  queryModuleAccountBalance = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryModuleAccountBalanceResponse, RpcStatus>({
      path: `/mun/claim/v1beta1/module_account_balance`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/mun/claim/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryParamsResponse, RpcStatus>({
      path: `/mun/claim/v1beta1/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalClaimable
   * @request GET:/mun/claim/v1beta1/total_claimable/{address}
   */
  queryTotalClaimable = (address: string, params: RequestParams = {}) =>
    this.request<V1Beta1QueryTotalClaimableResponse, RpcStatus>({
      path: `/mun/claim/v1beta1/total_claimable/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
