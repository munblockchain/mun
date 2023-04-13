import { createStore, Store } from 'vuex'

import init from './config'

const store: Store<any> = createStore({
  state() {
    return {}
  },
  mutations: {},
  actions: {}
})
init(store)
export default store
