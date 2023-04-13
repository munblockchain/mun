<template>
    <div>
        <label for="price" class="block text-sm font-medium leading-6">{{ props.label }}</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <div v-if="hasPrefix" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-gray-500 text-xs">{{ props.prefix }}</span>
            </div>
            <input type="text" name="price" id="price" :class="{ 'pl-16': hasPrefix }"
                class="block w-full rounded bg-white dark:bg-stone-900 py-1.5 px-3 ring-1 ring-inset ring-gray-300 dark:ring-stone-700 placeholder:text-gray-400 focus:ring-2 focus:ring-lilac sm:text-sm sm:leading-6"
                :placeholder="props.placeholder" v-model="model"
                @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" @paste="e => emits('paste', e)" />
            <!-- <div class="absolute inset-y-0 right-0 flex items-center">
                <label for="currency" class="sr-only">Currency</label>
                <select id="currency" name="currency"
                    class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                </select>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    prefix: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['update:modelValue', 'paste'])

let model = computed({
    get: () => (props.modelValue || '').toString(),
    set: (value) => {
        emits('update:modelValue', value)
    }
})

const hasPrefix = computed(() => props.prefix.length > 0)

</script>