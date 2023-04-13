<template>
    <button
        class="rounded px-3 py-1.5 text-xs flex items-center gap-1.5"
        :class="[props.active ? 'bg-lilac text-white' : 'bg-gray-300/80 hover:bg-gray-200 dark:bg-[#222] hover:dark:bg-[#333] dark:text-[#ddd]']">
        <slot />
        {{ props.text }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    active: boolean,
    text: string,
    badge?: number
}>()
</script>