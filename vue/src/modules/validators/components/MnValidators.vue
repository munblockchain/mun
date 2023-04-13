<template>
    <MnCard>
        <h1 class="mb-8">Show top {{ paginationLimit }} validators</h1>
        <!-- Tab -->
        <div class="flex border-b-1 border-b-gray-100 dark:border-b-stone-700 -m-4 pl-4 mb-2">
            <a v-for="(tb, index) in ['Active', 'Inactive', 'All Validators']"
                class="border-b-1 mr-8 px-2 py-4 cursor-pointer text-sm md:text-base"
                :class="[index == state.activeTab ? 'border-b-lilac text-lilac' : 'border-b-transparent text-gray-600 dark:text-gray-300']"
                @click="state.activeTab = index">
                {{ tb }} <span class="ml-2 bg-gray-300 dark:bg-stone-700 px-2 rounded-full text-xs md:text-sm">{{
                    validatorCounts[index] }}</span>
            </a>
        </div>

        <div class="h-8"></div>

        <!-- Table -->
        <div class="overflow-x-auto -m-4">
            <table class="w-full">
                <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Voting Power</th>
                    <th>Commission</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in filterValidators">
                        <td>{{ index + 1 }}</td>
                        <td>{{ val.description?.moniker }}</td>
                        <td>{{ (Number(val.tokens) / 1e6).toFixed(2) }}</td>
                        <td>{{ (Number(val.commission?.commission_rates?.rate) * 100).toFixed(2) }}%</td>
                        <td>
                            <button @click="() => showManageSlide(val)">Manage</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </MnCard>

    <MnValidatorManageSlide :open="state.openSlide" @close="state.openSlide = false" :validator="state.selectedValidator"
        :validators="validators" />
</template>

<script setup lang="ts">
import { reactive, Ref, ref, computed } from 'vue';
import { useStore } from 'vuex';
import MnCard from '../../../components/common/MnCard.vue';
import { useAddress } from '../../../composables';
import { StakingValidator } from '../types';
import MnValidatorManageSlide from './MnValidatorManageSlide.vue';

let $s = useStore()
let { address } = useAddress({ $s });

const state = reactive({
    activeTab: 0,
    openSlide: false,
    selectedValidator: {} as StakingValidator
})

const validators: Ref<Array<StakingValidator>> = ref([])

const validatorCounts = computed(() => {
    let activeCount = validators.value.filter(v => v.jailed == false).length
    let total = validators.value.length
    return [activeCount, total - activeCount, total]
})

const filterValidators = computed(() => {
    if (state.activeTab == 0) {
        return validators.value.filter(val => val.jailed == false)
    } else if (state.activeTab == 1) {
        return validators.value.filter(val => val.jailed == true)
    }
    return validators.value
})

function showManageSlide(val: StakingValidator) {
    state.selectedValidator = val
    state.openSlide = true
}

// Vuex methods
let queryValidators = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/QueryValidators", opts);
const paginationLimit = 200

async function updateDisplayInfo() {
    const res = await queryValidators({
        query: {
            "pagination.limit": paginationLimit + "",
            "pagination.offset": "0"
        }
    });
    validators.value = (res.validators as StakingValidator[]).sort((a, b) => Number(a.tokens) < Number(b.tokens) ? 1 : -1)
}

updateDisplayInfo()

</script>

<style scoped lang="scss">
table {
    th {
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #eee;

        &:first-child {
            padding-left: 16px;
        }
    }

    td {
        padding: 10px;
        border-bottom: 1px solid #eee;

        &:first-child {
            padding-left: 16px;
        }
    }
}

.dark table {

    th,
    td {
        border-bottom: 1px solid #222;
    }
}
</style>