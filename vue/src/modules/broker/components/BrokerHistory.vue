<template>
    <div class="flex gap-3">
        <MnTagButton :active="showIncoming" @click="state.activeTab = 0" text="Incoming">
            <ArrowSmallDownIcon class="w-4 h-4" />
        </MnTagButton>

        <MnTagButton :active="!showIncoming" @click="state.activeTab = 1" text="Outgoing">
            <ArrowSmallUpIcon class="w-3 h-3" />
        </MnTagButton>
    </div>

    <MnCard class="mt-4">
        <!-- <div class="mb-16 flex items-center gap-2">
            <BarsArrowDownIcon class="w-4 h-4" />
            <span class="text-sm">Latest 25 incoming remittance</span>
        </div> -->

        <Suspense v-if="address">
            <template #default>
                <RemittanceTable :filter="filter" />
            </template>

            <template #fallback>
                loading transactions...
            </template>
        </Suspense>
        <div class="empty" v-else>Transaction history is empty</div>
    </MnCard>
</template>

<script setup lang="ts">
import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/vue/24/outline';
import { reactive, computed, ref, Ref, watch } from 'vue';
import { useStore } from 'vuex';
import MnTagButton from '../../../components/common/buttons/MnTagButton.vue';
import MnCard from '../../../components/common/MnCard.vue';
import { useAddress, useUTCTime } from '../../../composables';
import RemittanceTable from './RemittanceTable.vue';

let $s = useStore()
let { address } = useAddress({ $s })

const state = reactive({
    activeTab: 0,
    filterText: ''
})
const showIncoming = computed<boolean>(() => state.activeTab == 0)

const filter = computed(() => ({
    incoming: showIncoming.value,
    text: state.filterText
}))

</script>

<style scoped lang="scss">
.table-custom {
    table {
        th {
            font-size: 0.82rem;
            font-weight: 400;
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

    th,
    td {
        border-bottom: 1px solid #222;
    }
}
</style>