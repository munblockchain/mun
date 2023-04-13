<template>
    <MnDrawer title="Receive remittance" :open="open" @close="onCloseDrawer">
        <div v-if="open" class="space-y-4 tx-desc-wrapper">
            <div>
                <label>RMT-ID</label>
                <div>{{ RMTID }}</div>
            </div>

            <div>
                <label>Amount:</label>
                <div>{{ coin?.amount }} {{ coin?.denom }}</div>
            </div>
            <div>
                <label>Sender:</label>
                <div>{{ tx.transaction.sender }}</div>
            </div>
            <div>
                <label>Date time (UTC):</label>
                <div>{{ txDate }}</div>
            </div>
            <div>
                <label>Attempt:</label>
                <div>{{ tx.transaction.retry }} remaining</div>
            </div>

            <div>
                <label class="block mt-[20px] mb-[10px]">Password:</label>
                <div class="grid grid-cols-4 gap-2">
                    <MnInputGroup class="" v-for="i in [0, 1, 2, 3, 4, 5]" v-model="receivePassword[i]"
                        @paste="e => onPaste(e, i)" />
                </div>
            </div>

            <div class="">
                <MnButton class="block w-full" @click="acceptRemittance" :loading="state.signingTx"
                    :disabled="state.signingTx || !ableToReceive">Accept</MnButton>
            </div>
        </div>
    </MnDrawer>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs, ref, Ref, watch } from 'vue';
import { useStore } from 'vuex';
import MnButton from '../../../components/common/buttons/MnButton.vue';
import MnInputGroup from '../../../components/common/form/MnInputGroup.vue';
import MnDrawer from '../../../components/common/MnDrawer.vue';
import { useAddress, useDenom } from '../../../composables';
import { calculateDisplayTransactionID } from '../helper';
import { RemittanceTx } from '../types';
import { checkReceiveRawLog } from '../helper'
import { useToast } from "vue-toastification";

const toast = useToast()
let $s = useStore()
let { address } = useAddress({ $s })
let { normalizeAmount } = useDenom({ $s })
const props = defineProps<{
    open: boolean,
    tx: RemittanceTx
}>()
const emits = defineEmits(['close', 'received'])
const { tx, open } = toRefs(props);

const state = reactive({
    signingTx: false
})
let receivePassword: Ref<string[]> = ref(['', '', '', '', '', ''])

function onCloseDrawer() {
    if (!state.signingTx) emits('close')
}

const RMTID = computed(() => calculateDisplayTransactionID(tx.value))
const coin = computed(() => normalizeAmount(tx.value.transaction.coins[0]))
const txDate = computed<string>(() => {
    if (tx.value.transaction.sent_at == "") return ""
    let date = new Date(tx.value.transaction.sent_at)
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
})

watch(() => open.value, () => {
    receivePassword.value = receivePassword.value.map(() => '')
})
const onPaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault()
    let text = e.clipboardData?.getData('Text')
    if (text == undefined) return
    const words = text.split(' ')

    for (let i = 0; i + index < 6 && i < words.length; i++) {
        receivePassword.value[i + index] = words[i]
    }
}

let ableToReceive = computed(() => receivePassword.value.every((v) => v != ""))

async function acceptRemittance() {
    const password = receivePassword.value.join(",")

    const sendMsgReceive = (opts: any) => $s.dispatch("mun.ibank/sendMsgReceive", opts);
    const value = {
        receiver: address.value,
        transactionId: tx.value.transaction.id,
        password
    }

    state.signingTx = true

    try {
        const { code, rawLog, transactionHash } = await sendMsgReceive({ value });
        if (code != 0) {
            throw new Error();
        }

        const [received, refunded] = checkReceiveRawLog(rawLog)

        if (received) {
            toast.success("Successfully received!")
        } else if (refunded) {
            toast.error("password incorrect! funds have been refunded")
        } else {
            toast.error('password incorrect')
        }

        if (received) emits('close')
        state.signingTx = false

        emits('received', tx.value.transaction.id)
    } catch (e) {
        console.error(e)
        state.signingTx = false
    }
}
</script>

<style lang="scss" scoped>
.tx-desc-wrapper {
    div {
        label {
            font-size: 0.758rem;
            font-weight: 600;
        }

        div {

            &:last-child {
                font-size: 0.92rem;
                font-weight: 400;
            }

            margin-bottom: 5px;
        }
    }
}
</style>