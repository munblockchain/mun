<template>
    <div class="flex gap-3">
        <button v-for="(text, index) in props.data" @click="emits('change', index)"
            class="rounded-sm px-3 py-1.5 text-xs flex items-center gap-1.5"
            :class="[index == props.active ? 'bg-lilac text-white' : 'bg-gray-300/80 hover:bg-gray-200 dark:bg-[#222] hover:dark:bg-[#333] dark:text-[#ddd]']">
            <div v-if="icons">
                <ChevronDoubleDownIcon v-if="icons[index] == 'ChevronDoubleDownIcon'" class="w-4 h-4" />
                <ChevronDoubleUpIcon v-if="icons[index] == 'ChevronDoubleUpIcon'" class="w-4 h-4" />
            </div>{{ text }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { BarsArrowDownIcon, ArrowDownIcon, ArrowUpIcon, ArrowLongDownIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/vue/24/outline';

const emits = defineEmits(['change'])
const props = defineProps<{
    active: number,
    data: string[],
    icons?: string[]
}>()
</script>