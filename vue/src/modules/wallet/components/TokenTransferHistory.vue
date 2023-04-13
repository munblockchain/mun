<template>
    <div class="flex gap-2 mt-8 mb-4">
        <MnTagButton :active="showAll" text="All Transfers" @click="state.filter.mode = 0" />
        <MnTagButton :active="showSent" text="Sent" @click="state.filter.mode = 1" />
        <MnTagButton :active="showReceived" text="Received" @click="state.filter.mode = 2" />
    </div>

    <MnCard :key="comKey">
        <Suspense v-if="address">
            <template #default>
                <TransferList :filter="state.filter" />
            </template>

            <template #fallback>
                <div class="space-y-4 animate-pulse">
                    <div v-for="_ in [1, 1, 1, 1, 1]" class="h-5 bg-slate-200 dark:bg-stone-600 rounded"></div>
                </div>
            </template>
        </Suspense>
        <div class="" v-else>Connect your wallet to check transfer history.</div>
    </MnCard>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import MnTagButton from '../../../components/common/buttons/MnTagButton.vue';
import MnCard from '../../../components/common/MnCard.vue';
import TransferList from './TransferList.vue';
import { useAddress } from '../../../composables';

let $s = useStore()
let { address } = useAddress({ $s })
const state = reactive({
    filter: {
        mode: 0,
        text: ''
    }
})

let comKey = ref(0)
watch(() => address.value, () => {
    comKey.value++
})

// computed
const showAll = computed(() => state.filter.mode == 0)
const showSent = computed(() => state.filter.mode == 1)
const showReceived = computed(() => state.filter.mode == 2)

</script>

<style lang="scss" scoped>

</style>