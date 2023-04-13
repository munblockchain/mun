<template>
    <MnDrawer title="Token Transfer" :open="props.open" @close="onCloseSlide">

        <div class="space-y-6">
            <MnInputGroup label="Recipient" v-model="state.tx.receiver" />
            <div class="grid grid-cols-2 gap-2">
                <MnSelect label="Token" :options="optionsForTokenDropdown" @change="d => state.tx.denom = d" />
                <MnInputGroup label="Amount" v-model="state.tx.amount" />
            </div>
            <MnInputGroup label="Memo (Optional)" v-model="state.tx.memo" />

            <MnButton size="sm" class="w-full py-2" :loading="state.sendingTx" :disabled="!ableToTx || state.sendingTx"
                @click="Transfer">Send</MnButton>
        </div>
    </MnDrawer>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import MnInputGroup from '../../../components/common/form/MnInputGroup.vue';
import MnSelect from '../../../components/common/form/MnSelect.vue';
import MnDrawer from '../../../components/common/MnDrawer.vue';
import { useAddress, useAssets, useDenom } from '../../../composables'
import { Amount } from '../../../utils/interfaces'
import long from 'long'
import { Bech32 } from '@cosmjs/encoding';

let $s = useStore()
let { address } = useAddress({ $s })
let { balances } = useAssets({ $s })
let { unnormalizeAmount } = useDenom({ $s })
const emits = defineEmits(['close'])
const props = defineProps<{
    open: boolean
}>()

let state = reactive({
    tx: {
        receiver: '',
        denom: '',
        amount: '',
        channel: '',
        memo: ''
    },
    sendingTx: false,
})

let validReceiver = computed<boolean>(() => {
    let valid: boolean
    try { valid = !!Bech32.decode(state.tx.receiver) } catch { valid = false }
    return valid
})

let validTxAmount = computed<boolean>(() => state.tx.amount.length > 0 && !isNaN(Number(state.tx.amount)))

let haveAssets = computed<boolean>(() => !balances.value.isLoading && balances.value.assets.length > 0)

const ableToTx = computed<boolean>(() => (
    validTxAmount.value &&
    validReceiver.value &&
    !!address.value
))

let optionsForTokenDropdown = computed(() => {
    if (balances.value.isLoading) return []
    return balances.value.assets.map((asset) => ({
        value: asset.amount.denom,
        text: asset.amount.denom,
        image: ''
    }))
})

function onCloseSlide() {
    if (!state.sendingTx)
        emits('close')
}

async function Transfer() {

    let sendMsgSend = (opts: any) => $s.dispatch('cosmos.bank.v1beta1/sendMsgSend', opts)
    let sendMsgTransfer = (opts: any) => $s.dispatch('ibc.applications.transfer.v1/sendMsgTransfer', opts)

    state.sendingTx = true

    let amount = balances.value.assets
        .filter(asset =>
            asset.amount.denom == state.tx.denom
        ).map(asset => {
            asset.amount.amount = state.tx.amount
            return asset
        }).map(unnormalizeAmount)

    let memo = state.tx.memo
    let isIBC = state.tx.channel !== ''
    let send

    let payload: any = {
        amount,
        toAddress: state.tx.receiver,
        fromAddress: address.value
    }

    try {
        if (isIBC) {
            payload = {
                ...payload,
                sourcePort: 'transfer',
                sourceChannel: state.tx.channel,
                sender: address.value,
                receiver: state.tx.receiver,
                timeoutHeight: 0,
                timeoutTimestamp: long
                    .fromNumber(new Date().getTime() + 60000)
                    .multiply(1000000),
                token: state.tx.amount[0]
            }

            send = () =>
                sendMsgTransfer({
                    value: payload,
                    memo
                })
        } else {
            send = () =>
                sendMsgSend({
                    value: payload,
                    memo
                })
        }

        const tx_response = await send()
        console.log(tx_response)

        if (tx_response.code != 0) {
            throw new Error()
        }
        state.sendingTx = false
        emits('close')
    } catch (e) {
        console.error(e)
        state.sendingTx = false
    }
}

</script>