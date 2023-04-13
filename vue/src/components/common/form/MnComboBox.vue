<template>
    <div class="relative">
        <Combobox :modelValue="modelValue" @update:modelValue="value => emit('update:modelValue', value)" by="id">
            <ComboboxLabel as="label" class="block text-sm font-medium leading-6 mb-2">{{ props.label }}</ComboboxLabel>
            <div
                class="relative w-full cursor-default rounded bg-white dark:bg-stone-900 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-stone-700 focus:outline-none focus:ring-2 focus:ring-lilac dark:focus:ring-lilac sm:text-sm sm:leading-6">
                <ComboboxInput class="bg-transparent w-full focus:outline-none" @change="query = $event.target.value"
                    :displayValue="(opt: any) => opt?.text" />

                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
            </div>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ComboboxOptions
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-x-hidden overflow-y-auto rounded-md bg-white dark:bg-stone-800 dark:shadow-none py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ComboboxOption as="template" v-for="opt in filteredOptions" :key="opt.value" :value="opt"
                        v-slot="{ active, selected }">
                        <li class="py-2 pl-3" :class="[active ? 'bg-lilac text-white cursor-pointer' : '']">
                            {{ opt.text }}
                        </li>
                    </ComboboxOption>
                </ComboboxOptions>
            </transition>
        </Combobox>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton,
    ComboboxLabel,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    modelValue: Object,
    label: string,
    options: Array<OptionType>
}>()
const emit = defineEmits(['update:modelValue'])

interface OptionType {
    value: string;
    image: string;
    text: string;
}

const query = ref('')

const filteredOptions = computed(() =>
    query.value === ''
        ? props.options
        : props.options?.filter((opt) => {
            return opt.value.toLowerCase().includes(query.value.toLowerCase()) || opt.text.toLowerCase().includes(query.value.toLowerCase())
        })
)
</script>