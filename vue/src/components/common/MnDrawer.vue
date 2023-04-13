<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="emits('close')">
            <TransitionChild as="template" enter="ease-in-out duration-400" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in-out duration-400" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-400 sm:duration-500"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-400 sm:duration-500" leave-from="translate-x-0"
                            leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                                <TransitionChild as="template" enter="ease-in-out duration-400" enter-from="opacity-0"
                                    enter-to="opacity-100" leave="ease-in-out duration-400" leave-from="opacity-100"
                                    leave-to="opacity-0">
                                    <div class="absolute top-0 right-2 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                        <button type="button"
                                            class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            @click="emits('close')">
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div class="flex h-full flex-col overflow-y-auto bg-white dark:bg-stone-900 py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{ props.title }}</DialogTitle>
                                    </div>
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <slot />
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
    open: boolean,
    title?: string
}>()
const emits = defineEmits(['close'])
</script>