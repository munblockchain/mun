<template>
    <tr>
        <td><a class="text-sky-700">{{ hash }}</a></td>
        <td>{{ tx.height }}</td>
        <td>{{ tx.timestamp }}</td>
        <td>{{ sender }}</td>
        <td>
            <MnBadge size="lg" :type="isOut ? 'success' : 'warning'">{{ tx.dir }}</MnBadge>
        </td>
        <td>{{ receiver }}</td>
        <td>{{ coin.amount }} {{ coin.denom }}</td>
        <!-- <td></td> -->
    </tr>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import MnBadge from '../../../components/common/MnBadge.vue';
import { useDenom } from '../../../composables';
import { TxForUI } from '../../../composables/useTokenTransfer';
import { toShortAddress } from '../../../utils/helpers';

const props = defineProps<{
    tx: TxForUI
}>()
const { tx } = toRefs(props)
let $s = useStore()
let { normalizeAmount } = useDenom({ $s })

const isOut = computed(() => tx.value.dir == 'out')

const coin = computed(() => normalizeAmount(tx.value.amount[0]))
const hash = computed(() => toShortAddress(tx.value.hash))
const sender = computed(() => toShortAddress(tx.value.sender))
const receiver = computed(() => toShortAddress(tx.value.receiver))
</script>