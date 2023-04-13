<template>
    <div v-show="address" class="border-b-[1px] pb-4 border-neutral-300 dark:border-neutral-700">
        <div class="flex justify-between md:items-center flex-col md:flex-row gap-4">
            <div>
                <h3>My Address</h3>
                <div class="flex space-x-3 flex-wrap">
                    <h4 class="mr-4">{{ address }}</h4>
                    <a href="#"
                        class="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-neutral-800"
                        @click="copyAddressToClipboard">
                        <ClipboardDocumentIcon class="w-4 h-4" />
                    </a>

                    <a href="#"
                        class="rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-neutral-800"
                        @click="state.showQRCode = true">
                        <QrCodeIcon class="w-4 h-4" />
                    </a>
                </div>
            </div>
            <MnButton class="shadow-sm shadow-lilac/30 rounded text-sm" @click="emits('send')">
                {{ props.buttonText }}
                <ArrowRightIcon class="w-4 h-4 ml-2" />
            </MnButton>
        </div>

        <QRCodeModal :open="state.showQRCode" @close="state.showQRCode = false" :address="address" />
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ClipboardDocumentIcon, QrCodeIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import MnButton from '../../components/common/buttons/MnButton.vue';
import { useAddress } from '../../composables';
import { reactive } from 'vue';
import { copyToClipboard } from '../../utils/helpers';
import QRCodeModal from './QRCodeModal.vue';


let $s = useStore()
let { address } = useAddress({ $s })
const emits = defineEmits(['send'])

interface Props {
    buttonText?: string
}
const props = withDefaults(defineProps<Props>(), {
    buttonText: 'Send'
})

const state = reactive({
    showQRCode: false
})

function copyAddressToClipboard() {
    copyToClipboard(address.value)
}
</script>