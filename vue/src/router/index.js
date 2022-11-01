import { createRouter, createWebHistory } from 'vue-router'

import TokenData from '../views/TokenData.vue'
import CoinData from '../views/CoinData.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: CoinData },
  { path: '/coin', component: CoinData },
  { path: '/token', component: TokenData }
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
