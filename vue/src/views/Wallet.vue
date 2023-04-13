<template>
    <MyAddressCard @send="state.openSlide = true" />

    <MyAssetsOverview />

    <TokenTransferHistory />

    <TransferSlide @close="state.openSlide = false" :open="state.openSlide" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MyAddressCard from '../modules/base/MyAddressCard.vue';
import MyAssetsOverview from '../modules/base/MyAssetsOverview.vue';
import TokenTransferHistory from '../modules/wallet/components/TokenTransferHistory.vue';
import TransferSlide from '../modules/wallet/components/TransferSlide.vue';

let state = reactive({
    openSlide: false
})

</script>