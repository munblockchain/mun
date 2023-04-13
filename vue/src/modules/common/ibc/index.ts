import { Store } from 'vuex'
import ibc from './ibc.js'

export default function init(store: Store<any>) {
  if (!store.hasModule(['common'])) {
    store.registerModule(['common'], { namespaced: true })
  }
  store.registerModule(['common', 'ibc'], ibc)
}
