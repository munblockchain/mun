export default {
  namespaced: true,

  state() {
    return {
      ibcDenoms: {},
    };
  },

  getters: {
    denom: (state) => state.ibcDenoms,
  },

  mutations: {
    SET_DENOM(state, { ibc_denom, base_denom }) {
      state.ibcDenoms[ibc_denom] = base_denom;
    },
  },

  actions: {
    append({ commit }, value) {
      commit("SET_DENOM", value);
    },
  },
};
