<template>
    <Disclosure as="nav" class="bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-8" :src="'./logo.png'" alt="MUN Logo" />
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                                :class="[item.current ? 'bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white' : 'text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-neutral-700 dark:hover:text-white', 'px-3 py-2 text-sm font-medium rounded']"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6 gap-2">
                        <MnThemeButton />
                        <MnAcc />
                        <!-- <MnChainSelector /> -->
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton
                        class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <DisclosurePanel class="md:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <router-link v-for="item in navigation" :key="item.name" as="a" :to="item.href"
                    :class="[item.current ? 'bg-gray-900 text-white dark:bg-neutral-800' : 'text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
            </div>
            <div class="border-t border-gray-700 pt-4 pb-3">
                <div class="flex items-center px-5">
                    <button class="flex-shrink-0" @click="switchWallet">{{ wallet ? 'Disconnect' : 'Connect Wallet' }}</button>
                    <!-- <div class="flex-shrink-0">    </div> -->
                    <!-- <button type="button"
                        class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button> -->
                    <MnThemeButton class="ml-auto" />
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, WalletIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useKeplr } from '../../composables';
import { Wallet } from '../../utils/interfaces';
import MnAcc from './MnAcc.vue';
import MnChainSelector from './MnChainSelector.vue';
import MnThemeButton from './MnThemeButton.vue';

let $s = useStore()
let wallet = computed<Wallet>(() => $s.getters['common/wallet/wallet'])
let chainId = computed<string>(() => $s.getters['common/env/chainId'])

interface NavbarLink {
    name: string
    url: string
}

const props = defineProps<{
    navigation: NavbarLink[]
}>()
let router = useRouter()

const navigation = computed(() => props.navigation.map(item => ({
    name: item.name,
    href: item.url,
    current: item.url == router.currentRoute.value.path
})))

function switchWallet() {
    if (!wallet.value) tryToConnectToKeplr()
    else disconnect()
}

// Keplr functions
let {
    connectToKeplr,
    isKeplrAvailable,
    getOfflineSigner,
    getKeplrAccParams,
    listenToAccChange
} = useKeplr({ $s })

let signInWithKeplr = async (offlineSigner: any) => $s.dispatch('common/wallet/connectWithKeplr', offlineSigner)
let signOut = async () => $s.dispatch('common/wallet/signOut')

function tryToConnectToKeplr() {
    // state.modalPage = 'connecting'

    let onKeplrConnect = async () => {
        let { name, bech32Address } = await getKeplrAccParams(chainId.value)

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