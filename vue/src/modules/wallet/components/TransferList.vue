<template>
    <div class="overflow-x-auto mx-[-16px]">
        <table class="tx-table">
            <thead>
                <th>Hash</th>
                <th>Block</th>
                <th>Age</th>
                <th>From</th>
                <th></th>
                <th>To</th>
                <th>Value</th>
                <!-- <th>Txn Fee</th> -->
            </thead>
            <tbody>
                <TransferListItem v-for="tx in filteredTxs" :tx="tx" />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { useTokenTransfer } from '../../../composables'
import TransferListItem from './TransferListItem.vue';

const props = defineProps<{
    filter: {
        mode: number,
        text: string
    }
}>()
const { filter } = toRefs(props)

let $s = useStore()
const { txs, removeRealtimeListener } = await useTokenTransfer({ $s, realTime: true })

const filteredTxs = computed(() => txs.value.filter(tx => {
    if (filter.value.mode == 1) return tx.dir == 'out'
    else if (filter.value.mode == 2) return tx.dir == 'in'
    return true
}))

onUnmounted(() => {
    removeRealtimeListener()
})
</script>

<style lang="scss" scoped></style>