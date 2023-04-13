import { Store } from 'vuex'
import wallet from './wallet.js'

export default function init(store: Store<any>) {
  if (!store.hasModule(['common'])) {
    store.registerModule(['common'], { namespaced: true })
  }
  store.registerModule(['common', 'wallet'], wallet)
}
