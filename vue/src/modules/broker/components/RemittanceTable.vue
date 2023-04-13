<template>
    <div class="mb-8 flex items-center gap-2">
        <BarsArrowDownIcon class="w-4 h-4" />
        <span class="text-sm">Latest {{ numTxs }}{{ showIncoming ? ' incoming' : ' outgoing' }} remittance</span>
    </div>
    <div class="overflow-x-auto mx-[-16px] table-custom">
        <table class="w-full">
            <thead>
                <th></th>
                <th>Hash</th>
                <th>RMT-ID</th>
                <th><a @click="switchAgeDisplayMode" class="text-sky-900 hover:cursor-pointer">{{ ageText }}</a></th>
                <th>{{ showIncoming ? 'Sender' : 'Recipient' }}</th>
                <th>Amount</th>
                <th>Attempts</th>
                <th></th>
            </thead>
            <tbody>
                <RemittanceItem v-if="showIncoming" v-for="tx in incomingTxs" :tx="tx" :address="address"
                    :time="currentUnixTime" :age-display-mode="state.ageDisplayMode" @receive="onReceiveGift" />

                <RemittanceItem v-else v-for="tx in outgoingTxs" :tx="tx" :address="address" :time="currentUnixTime"
                    :age-display-mode="state.ageDisplayMode" />

                <tr v-if="numTxs == 0">
                    <td colspan="10" class="text-center !py-8 !text-sm" style="border: none;">
                        No remittance history
                    </td>
                </tr>
                <tr v-else-if="showLoadMoreButton">
                    <td colspan="10" class="text-center" style="border: none;">
                        <div class="w-full flex justify-center">
                            <MnButton size="sm" @click="() => loadTransactions(false)">Load more</MnButton>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <GiftReceiveDrawer :open="state.showReceiveModal" @close="state.showReceiveModal = false" :tx="state.activeTx"
        @received="reloadTxById" />
</template>

<script setup lang="ts">
import { BarsArrowDownIcon } from '@heroicons/vue/24/outline';
import { reactive, computed, ref, Ref, watch, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import { useAddress, useUTCTime, useRemittance } from '../../../composables';
import { RemittanceTx } from '../types';
import GiftReceiveDrawer from './GiftReceiveDrawer.vue';
import RemittanceItem from './RemittanceItem.vue';

let $s = useStore()
let { address } = useAddress({ $s })
let { getHashValue, removeListener: removeRemittanceListener, remittanceUpdateFlag } = useRemittance({ $s, opts: { realTime: true } })

onUnmounted(() => {
    removeRemittanceListener()
})

const props = defineProps<{
    filter: {
        incoming: boolean;
        text: string;
    }
}>()

const state = reactive({
    ageDisplayMode: 0,
    showLoadMoreButtonIn: true,
    showLoadMoreButtonOut: true,
    showReceiveModal: false,
    activeTx: {} as RemittanceTx
})

const showIncoming = computed<boolean>(() => props.filter.incoming)
const showLoadMoreButton = computed<boolean>(() => showIncoming.value ? state.showLoadMoreButtonIn : state.showLoadMoreButtonOut)
const currentUnixTime: Ref<number> = ref(0)

function switchAgeDisplayMode() {
    state.ageDisplayMode = (state.ageDisplayMode + 1) % 3
}
const ageText = computed(() => {
    if (state.ageDisplayMode == 0) return 'Time remaining'
    else if (state.ageDisplayMode == 1) return 'Age'
    return 'Date Time(UTC)'
})

// Time synchronization with UTC
currentUnixTime.value = await useUTCTime()
setInterval(() => { currentUnixTime.value++ }, 1000)

const incomingTxs: Ref<RemittanceTx[]> = ref([]);
const outgoingTxs: Ref<RemittanceTx[]> = ref([]);
const txs = computed(() => showIncoming.value ? incomingTxs.value : outgoingTxs.value)
const numTxs = computed(() => showIncoming.value ? incomingTxs.value.length : outgoingTxs.value.length)
let txQueryKeyIn = ref('')
let txQueryKeyOut = ref('')
const pageSize = 10;
// let QueryTransactionAll = (opts: any) => $s.dispatch("mun.ibank/QueryTransactionAll", opts);
let QueryTransaction = (opts: any) => $s.dispatch("mun.ibank/QueryTransaction", opts);
let QueryIncoming = (opts: any) => $s.dispatch("mun.ibank/QueryIncoming", opts);
let QueryOutgoing = (opts: any) => $s.dispatch("mun.ibank/QueryOutgoing", opts);

async function loadTransactions(loadAll: boolean) {
    if (loadAll) {
        loadIncomingTxs()
        loadOutgoingTxs()
    } else if (showIncoming.value) {
        loadIncomingTxs()
    } else {
        loadOutgoingTxs()
    }
}
await loadTransactions(true)

watch(() => address.value, () => {
    txQueryKeyIn.value = ''
    txQueryKeyOut.value = ''
    incomingTxs.value = []
    outgoingTxs.value = []
    state.showLoadMoreButtonIn = true
    state.showLoadMoreButtonOut = true
    loadTransactions(true)
})

async function loadIncomingTxs() {
    const res = await QueryIncoming({
        params: {
            receiver: address.value,
            pending: false
        },
        options: {},
        query: {
            "pagination.limit": "" + pageSize,
            "pagination.key": txQueryKeyIn.value,
            "pagination.reverse": true,
        }
    });

    const data = await getHashValue(true, incomingTxs.value.length, pageSize, res.transactions.slice(0, pageSize))

    incomingTxs.value.push(...data)
    txQueryKeyIn.value = res.pagination.next_key
    if (res.pagination.next_key == null) {
        state.showLoadMoreButtonIn = false
    }
}
async function loadOutgoingTxs() {
    const res = await QueryOutgoing({
        params: {
            sender: address.value,
            pending: false
        },
        options: {},
        query: {
            "pagination.limit": "" + pageSize,
            "pagination.key": txQueryKeyOut.value,
            "pagination.reverse": true,
        }
    });

    const data = await getHashValue(false, outgoingTxs.value.length, pageSize, res.transactions.slice(0, pageSize))

    outgoingTxs.value.push(...data)
    txQueryKeyOut.value = res.pagination.next_key
    if (res.pagination.next_key == null) {
        state.showLoadMoreButtonOut = false
    }
}

function onReceiveGift(tx: RemittanceTx) {
    state.activeTx = tx
    state.showReceiveModal = true
}

watch(() => remittanceUpdateFlag.value, () => {
    fetchLatestTxs()
})

async function fetchLatestTxs() {
    catchup2LatestTx(true, incomingTxs, QueryIncoming)
    catchup2LatestTx(false, outgoingTxs, QueryOutgoing)
}

async function catchup2LatestTx(incoming: boolean, txns: Ref<RemittanceTx[]>, fn: any) {

    let key: string | null = ''
    let appending: RemittanceTx[] = []
    for (; ;) {

        const res: any = await fn({
            params: {
                sender: address.value,
                receiver: address.value,
                pending: false
            },
            options: {},
            query: {
                "pagination.limit": "" + pageSize,
                "pagination.key": key,
                "pagination.reverse": true,
            }
        });

        let flag = false
        const trans = await getHashValue(incoming, appending.length, pageSize, res.transactions)
        for (let i = 0; i < trans.length; i++) {
            if (txns.value.length == 0 || trans[i].transaction.id > txs.value[0].transaction.id) {
                appending.push(trans[i])
            } else {
                flag = true
                break
            }
        }

        key = res.pagination.next_key
        if (key == null || flag) {
            break
        }
    }

    txns.value.unshift(...appending)
}

async function reloadTxById(txId: string) {
    const res = await QueryTransaction({
        params: {
            id: txId
        }
    })
    const { retry, status } = res.transaction;

    [incomingTxs, outgoingTxs].every((t) => {
        return t.value.every((tx, index) => {
            if (tx.transaction.id == txId) {
                t.value[index].transaction.retry = retry
                t.value[index].transaction.status = status
                return false
            }
            return true
        })
    })
}
</script>

<style scoped lang="scss">
.table-custom {
    table {
        th {
            font-size: 0.78rem;
            font-weight: 600;
            text-align: left;
            white-space: nowrap !important;
            padding: 5px 10px;
            border-bottom: 1px solid #eee;

            &:first-child {
                padding-left: 16px;
            }
        }

        td {
            font-size: 1.45rem;
            padding: 10px;
            white-space: nowrap !important;
            border-bottom: 1px solid #eee;

            &:first-child {
                padding-left: 16px;
            }
        }
    }
}

.dark .table-custom {

    th {
        border-bottom: 1px solid #444;
    }
}
</style>