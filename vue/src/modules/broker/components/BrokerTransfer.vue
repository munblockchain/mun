<template>
    <MnDrawer title="Remittance" :open="props.open" @close="onCloseSlide">

        <div class="space-y-6">
            <MnInputGroup label="Recipient" v-model="state.tx.receiver" />
            <div class="grid grid-cols-2 gap-2">
                <MnSelect label="Token" :options="optionsForTokenDropdown" @change="d => state.tx.denom = d" />
                <MnInputGroup label="Amount" v-model="state.tx.amount" />
            </div>

            <div>
                <div class="flex gap-4 mb-4">
                    <label class="leading-6 font-medium text-sm block">Password</label>
                    <a href="#" @click="copyPasswordToClipboard"
                        class="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-neutral-800">
                        <ClipboardDocumentIcon class="w-4 h-4" />
                    </a>
                    <a href="#" @click="regeneratePassword"
                        class="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-neutral-800">
                        <ArrowPathIcon class="w-4 h-4" />
                    </a>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span v-for="phrase in state.tx.password"
                        class="px-[8px] py-[4px] bg-[#e9ecef] text-[#111b36] font-medium rounded-[5px] text-sm dark:bg-[#222] dark:text-[#ccc]">
                        {{ phrase }}
                    </span>
                </div>
            </div>
            <MnInputGroup label="Memo (Optional)" v-model="state.tx.memo" />

            <MnButton size="sm" class="w-full py-2" :loading="state.sendingTx" :disabled="!ableToTx || state.sendingTx"
                @click="Transfer">Send</MnButton>
        </div>
    </MnDrawer>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import MnInputGroup from '../../../components/common/form/MnInputGroup.vue';
import MnSelect from '../../../components/common/form/MnSelect.vue';
import MnDrawer from '../../../components/common/MnDrawer.vue';
import { useAddress, useAssets, useDenom } from '../../../composables'
import { Bech32 } from '@cosmjs/encoding';
import { generatePasswordPhrases } from '../helper';
import { copyToClipboard } from '../../../utils/helpers'
import { ClipboardDocumentIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useToast } from 'vue-toastification'

let $s = useStore()
let { address } = useAddress({ $s })
let { balances } = useAssets({ $s })
let { unnormalizeAmount } = useDenom({ $s })
const emits = defineEmits(['close'])
const props = defineProps<{
    open: boolean
}>()
const toast = useToast()

let state = reactive({
    tx: {
        receiver: '',
        denom: '',
        amount: '',
        channel: '',
        memo: '',
        password: ['', '', '', '', '', '']
    },
    sendingTx: false,
})

let validReceiver = computed<boolean>(() => {
    let valid: boolean
    try { valid = !!Bech32.decode(state.tx.receiver) } catch { valid = false }
    return valid
})

let validTxAmount = computed<boolean>(() => state.tx.amount.length > 0 && !isNaN(Number(state.tx.amount)))

const ableToTx = computed<boolean>(() => (
    validTxAmount.value &&
    validReceiver.value &&
    !!address.value
))

const optionsForTokenDropdown = computed(() => {
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

onMounted(() => regeneratePassword())
watch(() => props.open, regeneratePassword)

function regeneratePassword() {
    state.tx.password = generatePasswordPhrases()
}

function copyPasswordToClipboard() {
    copyToClipboard(state.tx.password.join(" "))
}

async function Transfer() {

    let sendMsgSend = (opts: any) => $s.dispatch('mun.ibank/sendMsgSend', opts)

    state.sendingTx = true

    let amount = balances.value.assets
        .filter(asset =>
            asset.amount.denom == state.tx.denom
        ).map(asset => {
            asset.amount.amount = state.tx.amount
            return asset
        }).map(unnormalizeAmount)

    let memo = state.tx.memo

    let payload: any = {
        amount: amount[0],
        fromAddress: address.value,
        toAddress: state.tx.receiver,
    }

    try {
        const tx_response = await sendMsgSend({
            value: payload,
            memo
        })
        console.log(tx_response)

        if (tx_response.code != 0) {
            throw new Error()
        }
        toast.success(state.tx.amount + " " + state.tx.denom + " has successfully sent to " + state.tx.receiver)
        state.sendingTx = false
        emits('close')
    } catch (e) {
        console.error(e)
        toast.error("failed to send funds")
        state.sendingTx = false
    }
}

</script>