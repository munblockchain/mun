<template>
  <AppLayout :links="navbarLinks">
    <div class="" style="min-height: calc(100vh - 195px);">
      <router-view />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import AppLayout from './layouts/AppLayout.vue'

import useIBCDenom from './composables/useIBCDenom'
import { onBeforeMount } from 'vue';
import router from './router';

const navbarLinks = [
  { name: 'Wallet', url: '/wallet' },
  // { name: 'Assets', url: '/assets' },
  { name: 'Validators', url: '/validators' },
  { name: 'Airdrop', url: '/airdrop' },
  { name: 'Remittance', url: '/broker' },
]

let $s = useStore()

onBeforeMount(async () => {
  await $s.dispatch('common/env/init')
  router.push('wallet')
})

// Get IBC Denom traces
const { setIBCDenomTraces } = useIBCDenom({ $s });
let queryIBCDenomTraces = (opts: any) => $s.dispatch("ibc.applications.transfer.v1/QueryDenomTraces", opts);
queryIBCDenomTraces({ all: true }).then(res => {
  setIBCDenomTraces(res.denom_traces);
})
</script>

<style lang="scss">
@import './styles/app.scss';
</style>