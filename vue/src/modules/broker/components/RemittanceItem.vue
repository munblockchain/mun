<template>
    <tr class="broker-tx-item">
        <td>
            <ShieldExclamationIcon v-if="isDeclined" class="w-5 h-5 text-red-600" />
            <CheckBadgeIcon v-if="isApproved" class="w-5 h-5 text-green-600" />
            <ReceiptRefundIcon v-if="isExpired" class="w-5 h-5 text-orange-600" />
            <RocketLaunchIcon v-if="isPending" class="w-5 h-5 text-yellow-500" />
        </td>
        <td>
            <a href="#" class="text-[#0784C2]">{{ hash }}</a>
        </td>
        <td>{{ TxnID }}</td>
        <td>{{ ageText }}</td>
        <td>{{ other }}</td>
        <td>{{ coin.amount }} {{ coin.denom }}</td>
        <td>
            <div class="flex text-green-300">
                <HeartIconSolid v-for="i in healthHearts" class="w-5 h-5" />
                <HeartIconOutline v-for="i in brokenHearts" class="w-5 h-5" />
            </div>
        </td>
        <td>
            <button v-if="isReceiving && isPending" size="sm" class="rounded bg-lilac p-1.5 text-white shadow-lg"
                @click="$emit('receive', tx)">
                <GiftIcon class="w-4 h-4" />
            </button>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { HeartIcon as HeartIconOutline, ShieldExclamationIcon, CheckBadgeIcon, ReceiptRefundIcon, RocketLaunchIcon, } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid, GiftIcon } from '@heroicons/vue/24/solid';
import { toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import { useDenom } from '../../../composables';
import { sec2time, toShortAddress } from '../../../utils/helpers';
import { calculateDisplayTransactionID } from '../helper';
import { RemittanceTx } from '../types';

const $s = useStore();
const { normalizeAmount } = useDenom({ $s });

const props = defineProps<{
    tx: RemittanceTx,
    address: string,
    ageDisplayMode: number,
    time: number // current UTC time in Unix timestamp
}>();
defineEmits(['receive'])

const { tx, address, ageDisplayMode, time: currentUTCTime } = toRefs(props);

const coin = computed(() => {
    return normalizeAmount(tx.value.transaction.coins[0]);
})

const TxnID = computed(() => calculateDisplayTransactionID(tx.value))

const isPending = computed(() => tx.value.transaction.status == 'TXN_PENDING')
const isApproved = computed(() => tx.value.transaction.status == 'TXN_SENT')
const isDeclined = computed(() => tx.value.transaction.status == 'TXN_DECLINED')
const isExpired = computed(() => tx.value.transaction.status == 'TXN_EXPIRED')
const hash = computed(() => toShortAddress(tx.value.transaction.hash ?? ''))
const other = computed(() => address.value == tx.value.transaction.sender ? toShortAddress(tx.value.transaction.receiver) : toShortAddress(tx.value.transaction.sender))
// const receiver = computed(() => props.address == tx.value.transaction.receiver ? 'Me' : toShortAddress(tx.value.transaction.receiver))
const isReceiving = computed(() => tx.value.transaction.receiver == address.value)
const healthHearts = computed(() => Array.from(Array(tx.value.transaction.retry).keys()))
const brokenHearts = computed(() => Array.from(Array(3 - tx.value.transaction.retry).keys()))

const ageText = computed(() => {
    if (ageDisplayMode.value > 1) {
        return txSentDate.value
    } else if (!isPending.value) {
        return '---'
    }
    const sent = Math.floor(new Date(tx.value.transaction.sent_at).getTime() / 1000)
    const duration_of_expiration = 3600 * 48 // 2 days
    switch (ageDisplayMode.value) {
        case 0: // Time remaining
            return sec2time(duration_of_expiration - (currentUTCTime.value - sent)) + ' left'
        case 1: // Age
            return sec2time(currentUTCTime.value - sent) + ' ago'
        default: // Sent at
            return txSentDate.value
    }
})

const txSentDate = computed(() => {
    let date = new Date(tx.value.transaction.sent_at)
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
})
</script>

<style lang="scss" scoped>
td {
    font-family: 'Lato';
    font-size: 0.85rem;
    text-align: left;
    white-space: nowrap !important;
    padding: 8px 10px;
    border-bottom: 1px solid #eee;

    &:first-child {
        padding-left: 16px;
    }
}

.dark td {
    border-color: #444;
}
</style>