import { createRouter, createWebHistory } from 'vue-router'

import Broker from '../views/Broker.vue'
import Wallet from '../views/Wallet.vue'
import Validators from '../views/Validators.vue'
import Airdrop from '../views/Airdrop.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Wallet },
  { path: '/wallet', component: Wallet },
  { path: '/validators', component: Validators },
  { path: '/airdrop', component: Airdrop },
  { path: '/broker', component: Broker },
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
