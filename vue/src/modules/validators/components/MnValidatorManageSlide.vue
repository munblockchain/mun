<template>
    <MnDrawer :title="slideTitle" :open="props.open" @close="onCloseSlide">
        <div v-if="!address">
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">Please connect your wallet with Keplr!</span>
            </div>
        </div>
        <div v-else-if="showHomePanel" class="space-y-4">
            <div v-for="(content, index) in homepageContent"
                class="shadow rounded ring-2 p-4 transition-all duration-200 ring-gray-300 dark:ring-stone-700 hover:cursor-pointer hover:ring-lilac hover:bg-lilac hover:text-white"
                @click="state.activePage = index + 1">
                <h3 class="mb-2 text-base">{{ content.title }}</h3>
                <h3 class="text-sm text-gray-5001">{{ content.desc }}</h3>
            </div>
        </div>

        <div v-else class="space-y-4">

            <MnComboBox label="Validator" :options="dropdownOptions" v-model="state.srcOperatorObject" />
            <MnComboBox v-show="showRedelegate" label="Destination Validator" :options="dropdownOptions"
                v-model="state.dstOperatorObject" />
            <MnInputGroup v-if="!showWithdraw" label="Amount" :prefix="STAKING_DENOM" v-model="state.tx.amount" />
            <div class="flex gap-4 pt-4">
                <MnButton class="grow" :disabled="!ableToTx" :loading="state.sendingTx" @click="sendTx">{{
                    homepageContent[state.activePage - 1].title
                }}</MnButton>
                <MnButton @click="state.activePage = 0">Back</MnButton>
            </div>
        </div>

    </MnDrawer>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import MnInputGroup from '../../../components/common/form/MnInputGroup.vue';
import MnDrawer from '../../../components/common/MnDrawer.vue';
import { useAddress, useAssets } from '../../../composables';
import { Amount } from '../../../utils/interfaces';
import { StakingValidator } from '../types';
import { DrawerContent } from '../constants'
import MnComboBox from '../../../components/common/form/MnComboBox.vue';
import { useToast } from 'vue-toastification'

const props = defineProps<{
    open: boolean,
    validator: StakingValidator,
    validators: StakingValidator[]
}>()

const dropdownOptions = computed(() => {
    if (props.validators.length == 0) return []
    return props.validators.map(mapValidatorToOption)
})
const mapValidatorToOption = (v: StakingValidator) => {
    return {
        text: v.description?.moniker!,
        value: v.operator_address!,
        image: ''
    }
}
const emits = defineEmits(['close'])
const toast = useToast()
const state = reactive({
    //Home(0), Delegate(1), Undelegate(2), Redelegate(3), Withdraw(4)
    activePage: 0,
    tx: {
        amount: '',
        src_operator: '',
        dst_operator: '',
    },
    sendingTx: false,
    srcOperatorObject: {} as any,
    dstOperatorObject: {} as any
})

// watch

watch(() => props.validator, () => {
    state.activePage = 0
    state.srcOperatorObject = mapValidatorToOption(props.validator)
})
watch(() => state.srcOperatorObject, () => { state.tx.src_operator = state.srcOperatorObject.value })
watch(() => state.dstOperatorObject, () => { state.tx.dst_operator = state.dstOperatorObject.value })

const showHomePanel = computed(() => state.activePage == 0)
const showDelegate = computed(() => state.activePage == 1)
const showUndelegate = computed(() => state.activePage == 2)
const showRedelegate = computed(() => state.activePage == 3)
const showWithdraw = computed(() => state.activePage == 4)
const slideTitle = computed(() => {
    const titles = ['Select an option', 'Delegate', 'Undelegate', 'Redelegate', 'Withdraw']
    return titles[state.activePage]
})

const homepageContent = DrawerContent

let $s = useStore()
let { address } = useAddress({ $s })
let { balances } = useAssets({ $s })
let STAKING_DENOM = $s.getters['common/env/coinDenom']
let STAKING_DENOM_MIN = $s.getters['common/env/coinDenomMin']
let STAKING_DENOM_DECIMALS = Number($s.getters['common/env/coinDenomMinDecimal'])

let validTxAmount = computed<boolean>(() => state.tx.amount.length > 0 && !isNaN(Number(state.tx.amount)) && Number(state.tx.amount) != 0)
let ableToTx = computed<boolean>(() => {
    if (state.sendingTx || state.tx.src_operator.length == 0) return false
    if (showRedelegate.value && state.tx.dst_operator.length == 0) return false
    if (!showWithdraw.value && !validTxAmount.value) return false
    return true
})
// let ableToTxDelegate = computed<boolean>(() => )

let queryValidators = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/QueryValidators", opts);
let queryBankTotal = (opts: any) => $s.dispatch("cosmos.bank.v1beta1/QueryTotalSupply", opts);
let queryDelegatorDelegations = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/QueryDelegatorDelegations", opts);
let queryDelegatorUnbondingDelegations = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/QueryDelegatorUnbondingDelegations", opts);
let queryDelegatorRewards = (opts: any) => $s.dispatch("cosmos.distribution.v1beta1/QueryDelegationTotalRewards", opts);
let queryAllBalances = (opts: any) => $s.dispatch("cosmos.bank.v1beta1/QueryAllBalances", opts);
let queryInflation = (opts: any) => $s.dispatch("cosmos.mint.v1beta1/QueryInflation", opts);
let queryBondedtoken = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/QueryPool", opts);
let queryDistributionParms = (opts: any) => $s.dispatch("cosmos.distribution.v1beta1/QueryParams", opts);

let sendMsgDelegate = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/sendMsgDelegate", opts);
let sendMsgUndelegate = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/sendMsgUndelegate", opts);
let sendMsgRedelegate = (opts: any) => $s.dispatch("cosmos.staking.v1beta1/sendMsgBeginRedelegate", opts);
let sendMsgWithdrawRewards = (opts: any) => $s.dispatch("cosmos.distribution.v1beta1/sendMsgWithdrawDelegatorReward", opts);

function onCloseSlide() {
    if (!state.sendingTx) emits('close')
}

async function sendTx() {

    let amount: Amount = {
        amount: (Number(state.tx.amount) * (10 ** STAKING_DENOM_DECIMALS)).toString(),
        denom: STAKING_DENOM_MIN
    }

    let payload: any = {
        amount,
        delegatorAddress: address.value,
        validatorAddress: state.tx.src_operator,
    };

    let payload_redelegate: any = {
        amount,
        validatorSrcAddress: state.tx.src_operator,
        validatorDstAddress: state.tx.dst_operator,
        delegatorAddress: address.value,
    };

    let payload_withdraw: any = {
        delegatorAddress: address.value,
        validatorAddress: state.tx.src_operator,
    };

    let send
    switch (state.activePage) {
        case 1:
            send = () =>
                sendMsgDelegate({
                    value: payload,
                });
            break;
        case 2:
            send = () =>
                sendMsgUndelegate({
                    value: payload,
                })
            break;
        case 3:
            send = () =>
                sendMsgRedelegate({
                    value: payload_redelegate,
                });
            break;
        default:
            send = () =>
                sendMsgWithdrawRewards({
                    value: payload_withdraw,
                });
    }

    state.sendingTx = true
    try {
        const tx_response = await send()
        console.log(tx_response)
        if (tx_response.code != 0) {
            throw new Error()
        }
        state.sendingTx = false
        toast.success('Success')
    } catch (e) {
        state.sendingTx = false
        toast.error('Failed')
        console.error(e)
    }
}

</script>