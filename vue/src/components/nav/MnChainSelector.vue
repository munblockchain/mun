<template>
    <Menu as="div" class="relative ml-3">
        <div>
            <MenuButton
                class="rounded-full p-1 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white outline-none">
                <GlobeAltIcon class="h-8 w-8" aria-hidden="true" />
            </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="chain in chains" :key="chain.name" v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    class="flex items-center">
                    <GlobeAltIcon class="h-5 w-5 mr-2" aria-hidden="true" /> {{ chain.name }}
                </a>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { GlobeEuropeAfricaIcon, GlobeAltIcon } from '@heroicons/vue/24/outline';

const chains = [
    {
        name: 'Mainnet',
        // active: true
    }, {
        name: 'Testnet',
        // active: false
    }, {
        name: 'Devnet',
        // active: false
    }]

</script>