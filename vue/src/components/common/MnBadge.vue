<template>
    <span :class="style" class="rounded-lg uppercase text-xs">
        <slot />
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    size: 'lg' | 'md' | 'sm',
    type: 'success' | 'warning' | 'danger' | 'info' | 'brand' | 'primary'
}>()

const style = computed(() => {
    let s = ''

    switch (props.size) {
        case 'lg':
            s += 'px-2.5 py-2'
            break
        case 'md':
            s += 'px-2 py-1.5'
            break
        case 'sm':
            s += 'px-1.5 py-1'
            break
    }

    s += ' '
    switch (props.type) {
        case 'success':
            s += 'bg-green-100 text-green-800'
            break
        case 'warning':
            s += 'bg-yellow-100 text-yellow-800'
            break
        case 'danger':
            s += 'bg-red-100 text-red-800'
            break
        case 'info':
            s += 'bg-sky-100 text-sky-800'
            break
    }
    return s
})
</script>