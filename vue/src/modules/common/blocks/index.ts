import { Store } from 'vuex'
import blocks from './blocks.js'

export default function init(store: Store<any>) {
  if (!store.hasModule(['common'])) {
    store.registerModule(['common'], { namespaced: true })
  }
  store.registerModule(['common', 'blocks'], blocks)
  store.subscribe((mutation) => {
    if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
      store.dispatch('common/blocks/init', null, { root: true })
    }
  })
}
