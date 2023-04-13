<template>
    <Listbox as="div" v-model="selected">
        <ListboxLabel class="block text-sm font-medium leading-6">{{ props.label }}</ListboxLabel>
        <div class="relative mt-2">
            <ListboxButton
                class="relative w-full cursor-default rounded bg-white dark:bg-stone-900 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-stone-700 focus:outline-none focus:ring-2 focus:ring-lilac dark:focus:ring-lilac sm:text-sm sm:leading-6">
                <span class="flex items-center">
                    <img v-if="selected" :src="selected.image" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate">{{ selected ? selected.text : '---' }}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="person in props.options" :key="person.value" :value="person"
                        v-slot="{ active, selected }">
                        <li
                            :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <div class="flex items-center">
                                <img :src="person.image" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                                    person.text }}</span>
                            </div>

                            <span v-if="selected"
                                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
    label?: string,
    options: OptionType[]
}>()
const emits = defineEmits(['change'])

interface OptionType {
    value: string;
    image: string;
    text: string;
}

const selected: Ref<OptionType | undefined> = ref(props.options[0])

watch(() => props.options, (newValue, oldValue) => {
    console.log(JSON.stringify(newValue) == JSON.stringify(oldValue))
    console.log('changed')
    // if (newValue.length > 0 && newValue.length == oldValue.length) {
    //     if (!newValue.every((_, i) => JSON.stringify(newValue[i]) == JSON.stringify(oldValue[i])))
    //         selected.value = newValue[0]
    // } else {
    //     selected.value = undefined
    // }
})
watch(() => selected.value, () => {
    if (selected.value) {
        emits('change', selected.value.value)
    }
})
</script>