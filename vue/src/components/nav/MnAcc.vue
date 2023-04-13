<template>
    <button v-if="!wallet" type="button" @click="tryToConnectToKeplr"
        class="rounded-full p-1 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white outline-none">
        <WalletIcon class="h-6 w-6" aria-hidden="true" />
    </button>

    <button v-else type="button" @click="disconnect"
        class="rounded-full p-1 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white outline-none">
        <ArrowRightOnRectangleIcon class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- <MnModal :open="state.show" @close="state.show = false" /> -->
</template>

<script setup lang="ts">
import { WalletIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useKeplr } from '../../composables';
import { Wallet } from '../../utils/interfaces'
import MnModal from '../common/MnModal.vue';

let state = reactive({
    show: false,
    keplrParams: { name: '', bech32Address: '' }
})

let $s = useStore()
let {
    connectToKeplr,
    isKeplrAvailable,
    getOfflineSigner,
    getKeplrAccParams,
    listenToAccChange
} = useKeplr({ $s })

let wallet = computed<Wallet>(() => $s.getters['common/wallet/wallet'])
let chainId = computed<string>(() => $s.getters['common/env/chainId'])

// actions
let signInWithKeplr = async (offlineSigner: any) => $s.dispatch('common/wallet/connectWithKeplr', offlineSigner)
let signOut = async () => $s.dispatch('common/wallet/signOut')

function tryToConnectToKeplr() {
    // state.modalPage = 'connecting'

    let onKeplrConnect = async () => {
        let { name, bech32Address } = await getKeplrAccParams(chainId.value)
        state.keplrParams.name = name
        state.keplrParams.bech32Address = bech32Address

        let offlineSigner = getOfflineSigner(chainId.value)
        signInWithKeplr(offlineSigner)

        listenToAccChange(onKeplrConnect)

        // state.connectWalletModal = false
        // state.modalPage = 'connect'
    }

    let onKeplrError = (): void => {
        // state.modalPage = 'error'
    }

    connectToKeplr(onKeplrConnect, onKeplrError)
}

function disconnect() {
    signOut()
}

</script>