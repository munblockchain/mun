<template>
    <div class="rounded bg-white dark:bg-neutral-800 p-4">
        <h3 v-if="props.title" class="mb-3">{{ props.title }}</h3>
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String
})
</script>