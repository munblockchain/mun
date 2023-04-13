import { Client, registry, MissingWalletError } from "mun-client-ts";

import { Params } from "mun-client-ts/mun.ibank/types";
import { TransactionWrapper } from "mun-client-ts/mun.ibank/types";
import { Transaction } from "mun-client-ts/mun.ibank/types";

export { Params, TransactionWrapper, Transaction };

function initClient(vuexGetters) {
  return new Client(
    vuexGetters["common/env/getEnv"],
    vuexGetters["common/wallet/signer"]
  );
}

function mergeResults(value, next_values) {
  for (let prop of Object.keys(next_values)) {
    if (Array.isArray(next_values[prop])) {
      value[prop] = [...value[prop], ...next_values[prop]];
    } else {
      value[prop] = next_values[prop];
    }
  }
  return value;
}

type Field = {
  name: string;
  type: unknown;
};
function getStructure(template) {
  let structure: { fields: Field[] } = { fields: [] };
  for (const [key, value] of Object.entries(template)) {
    let field = { name: key, type: typeof value };
    structure.fields.push(field);
  }
  return structure;
}
const getDefaultState = () => {
  return {
    Params: {},
    Transaction: {},
    TransactionAll: {},
    Incoming: {},
    Outgoing: {},

    _Structure: {
      Params: getStructure(Params.fromPartial({})),
      TransactionWrapper: getStructure(TransactionWrapper.fromPartial({})),
      Transaction: getStructure(Transaction.fromPartial({})),
    },
    _Registry: registry,
    _Subscriptions: new Set(),
  };
};

// initial state
const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    QUERY(state, { query, key, value }) {
      state[query][JSON.stringify(key)] = value;
    },
    SUBSCRIBE(state, subscription) {
      state._Subscriptions.add(JSON.stringify(subscription));
    },
    UNSUBSCRIBE(state, subscription) {
      state._Subscriptions.delete(JSON.stringify(subscription));
    },
  },
  getters: {
    getParams:
      (state) =>
      (params = { params: {} }) => {
        if (!(<any>params).query) {
          (<any>params).query = null;
        }
        return state.Params[JSON.stringify(params)] ?? {};
      },
    getTransaction:
      (state) =>
      (params = { params: {} }) => {
        if (!(<any>params).query) {
          (<any>params).query = null;
        }
        return state.Transaction[JSON.stringify(params)] ?? {};
      },
    getTransactionAll:
      (state) =>
      (params = { params: {} }) => {
        if (!(<any>params).query) {
          (<any>params).query = null;
        }
        return state.TransactionAll[JSON.stringify(params)] ?? {};
      },
    getIncoming:
      (state) =>
      (params = { params: {} }) => {
        if (!(<any>params).query) {
          (<any>params).query = null;
        }
        return state.Incoming[JSON.stringify(params)] ?? {};
      },
    getOutgoing:
      (state) =>
      (params = { params: {} }) => {
        if (!(<any>params).query) {
          (<any>params).query = null;
        }
        return state.Outgoing[JSON.stringify(params)] ?? {};
      },

    getTypeStructure: (state) => (type) => {
      return state._Structure[type].fields;
    },
    getRegistry: (state) => {
      return state._Registry;
    },
  },
  actions: {
    init({ dispatch, rootGetters }) {
      console.log("Vuex module: mun.ibank initialized!");
      if (rootGetters["common/env/client"]) {
        rootGetters["common/env/client"].on("newblock", () => {
          dispatch("StoreUpdate");
        });
      }
    },
    resetState({ commit }) {
      commit("RESET_STATE");
    },
    unsubscribe({ commit }, subscription) {
      commit("UNSUBSCRIBE", subscription);
    },
    async StoreUpdate({ state, dispatch }) {
      state._Subscriptions.forEach(async (subscription) => {
        try {
          const sub = JSON.parse(subscription);
          await dispatch(sub.action, sub.payload);
        } catch (e) {
          throw new Error("Subscriptions: " + e.message);
        }
      });
    },

    async QueryParams(
      { commit, rootGetters, getters },
      {
        options: { subscribe, all } = { subscribe: false, all: false },
        params,
        query = null,
      }
    ) {
      try {
        const key = params ?? {};
        const client = initClient(rootGetters);
        let value = (await client.MunIbank.query.queryParams()).data;

        commit("QUERY", {
          query: "Params",
          key: { params: { ...key }, query },
          value,
        });
        if (subscribe)
          commit("SUBSCRIBE", {
            action: "QueryParams",
            payload: { options: { all }, params: { ...key }, query },
          });
        return getters["getParams"]({ params: { ...key }, query }) ?? {};
      } catch (e) {
        throw new Error(
          "QueryClient:QueryParams API Node Unavailable. Could not perform query: " +
            e.message
        );
      }
    },

    async QueryTransaction(
      { commit, rootGetters, getters },
      {
        options: { subscribe, all } = { subscribe: false, all: false },
        params,
        query = null,
      }
    ) {
      try {
        const key = params ?? {};
        const client = initClient(rootGetters);
        let value = (await client.MunIbank.query.queryTransaction(key.id)).data;

        commit("QUERY", {
          query: "Transaction",
          key: { params: { ...key }, query },
          value,
        });
        if (subscribe)
          commit("SUBSCRIBE", {
            action: "QueryTransaction",
            payload: { options: { all }, params: { ...key }, query },
          });
        return getters["getTransaction"]({ params: { ...key }, query }) ?? {};
      } catch (e) {
        throw new Error(
          "QueryClient:QueryTransaction API Node Unavailable. Could not perform query: " +
            e.message
        );
      }
    },

    async QueryTransactionAll(
      { commit, rootGetters, getters },
      {
        options: { subscribe, all } = { subscribe: false, all: false },
        params,
        query = null,
      }
    ) {
      try {
        const key = params ?? {};
        const client = initClient(rootGetters);
        let value = (
          await client.MunIbank.query.queryTransactionAll(
            key.address,
            query ?? undefined
          )
        ).data;

        while (
          all &&
          (<any>value).pagination &&
          (<any>value).pagination.next_key != null
        ) {
          let next_values = (
            await client.MunIbank.query.queryTransactionAll(key.address, {
              ...(query ?? {}),
              "pagination.key": (<any>value).pagination.next_key,
            } as any)
          ).data;
          value = mergeResults(value, next_values);
        }
        commit("QUERY", {
          query: "TransactionAll",
          key: { params: { ...key }, query },
          value,
        });
        if (subscribe)
          commit("SUBSCRIBE", {
            action: "QueryTransactionAll",
            payload: { options: { all }, params: { ...key }, query },
          });
        return (
          getters["getTransactionAll"]({ params: { ...key }, query }) ?? {}
        );
      } catch (e) {
        throw new Error(
          "QueryClient:QueryTransactionAll API Node Unavailable. Could not perform query: " +
            e.message
        );
      }
    },

    async QueryIncoming(
      { commit, rootGetters, getters },
      {
        options: { subscribe, all } = { subscribe: false, all: false },
        params,
        query = null,
      }
    ) {
      try {
        const key = params ?? {};
        const client = initClient(rootGetters);
        let value = (
          await client.MunIbank.query.queryIncoming(
            key.receiver,
            key.pending,
            query ?? undefined
          )
        ).data;

        while (
          all &&
          (<any>value).pagination &&
          (<any>value).pagination.next_key != null
        ) {
          let next_values = (
            await client.MunIbank.query.queryIncoming(
              key.receiver,
              key.pending,
              {
                ...(query ?? {}),
                "pagination.key": (<any>value).pagination.next_key,
              } as any
            )
          ).data;
          value = mergeResults(value, next_values);
        }
        commit("QUERY", {
          query: "Incoming",
          key: { params: { ...key }, query },
          value,
        });
        if (subscribe)
          commit("SUBSCRIBE", {
            action: "QueryIncoming",
            payload: { options: { all }, params: { ...key }, query },
          });
        return getters["getIncoming"]({ params: { ...key }, query }) ?? {};
      } catch (e) {
        throw new Error(
          "QueryClient:QueryIncoming API Node Unavailable. Could not perform query: " +
            e.message
        );
      }
    },

    async QueryOutgoing(
      { commit, rootGetters, getters },
      {
        options: { subscribe, all } = { subscribe: false, all: false },
        params,
        query = null,
      }
    ) {
      try {
        const key = params ?? {};
        const client = initClient(rootGetters);
        let value = (
          await client.MunIbank.query.queryOutgoing(
            key.sender,
            key.pending,
            query ?? undefined
          )
        ).data;

        while (
          all &&
          (<any>value).pagination &&
          (<any>value).pagination.next_key != null
        ) {
          let next_values = (
            await client.MunIbank.query.queryOutgoing(key.sender, key.pending, {
              ...(query ?? {}),
              "pagination.key": (<any>value).pagination.next_key,
            } as any)
          ).data;
          value = mergeResults(value, next_values);
        }
        commit("QUERY", {
          query: "Outgoing",
          key: { params: { ...key }, query },
          value,
        });
        if (subscribe)
          commit("SUBSCRIBE", {
            action: "QueryOutgoing",
            payload: { options: { all }, params: { ...key }, query },
          });
        return getters["getOutgoing"]({ params: { ...key }, query }) ?? {};
      } catch (e) {
        throw new Error(
          "QueryClient:QueryOutgoing API Node Unavailable. Could not perform query: " +
            e.message
        );
      }
    },

    async sendMsgReceive({ rootGetters }, { value, fee = [], memo = "" }) {
      try {
        const client = await initClient(rootGetters);
        const result = await client.MunIbank.tx.sendMsgReceive({
          value,
          fee: { amount: fee, gas: "200000" },
          memo,
        });
        return result;
      } catch (e) {
        if (e == MissingWalletError) {
          throw new Error(
            "TxClient:MsgReceive:Init Could not initialize signing client. Wallet is required."
          );
        } else {
          throw new Error(
            "TxClient:MsgReceive:Send Could not broadcast Tx: " + e.message
          );
        }
      }
    },
    async sendMsgSend({ rootGetters }, { value, fee = [], memo = "" }) {
      try {
        const client = await initClient(rootGetters);
        const result = await client.MunIbank.tx.sendMsgSend({
          value,
          fee: { amount: fee, gas: "200000" },
          memo,
        });
        return result;
      } catch (e) {
        if (e == MissingWalletError) {
          throw new Error(
            "TxClient:MsgSend:Init Could not initialize signing client. Wallet is required."
          );
        } else {
          throw new Error(
            "TxClient:MsgSend:Send Could not broadcast Tx: " + e.message
          );
        }
      }
    },

    async MsgReceive({ rootGetters }, { value }) {
      try {
        const client = initClient(rootGetters);
        const msg = await client.MunIbank.tx.msgReceive({ value });
        return msg;
      } catch (e) {
        if (e == MissingWalletError) {
          throw new Error(
            "TxClient:MsgReceive:Init Could not initialize signing client. Wallet is required."
          );
        } else {
          throw new Error(
            "TxClient:MsgReceive:Create Could not create message: " + e.message
          );
        }
      }
    },
    async MsgSend({ rootGetters }, { value }) {
      try {
        const client = initClient(rootGetters);
        const msg = await client.MunIbank.tx.msgSend({ value });
        return msg;
      } catch (e) {
        if (e == MissingWalletError) {
          throw new Error(
            "TxClient:MsgSend:Init Could not initialize signing client. Wallet is required."
          );
        } else {
          throw new Error(
            "TxClient:MsgSend:Create Could not create message: " + e.message
          );
        }
      }
    },
  },
};
