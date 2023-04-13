<template>
    <MyAddressCard @send="state.openSlide = true" buttonText="Transfer" />

    <MyAssetsOverview />

    <div class="h-8"></div>
    <BrokerHistory />

    <BrokerTransfer @close="state.openSlide = false" :open="state.openSlide" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MyAddressCard from '../modules/base/MyAddressCard.vue';
import MyAssetsOverview from '../modules/base/MyAssetsOverview.vue';
import BrokerHistory from '../modules/broker/components/BrokerHistory.vue';
import BrokerTransfer from '../modules/broker/components/BrokerTransfer.vue';

let state = reactive({
    openSlide: false
})

</script>