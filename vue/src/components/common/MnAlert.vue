<template>
    <div :class="styles" class="flex flex-row p-5">
        <div></div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    type: 'success' | 'warning' | 'info' | 'error'
}>()

const styles = computed(() => {
    let res = ''
    switch (props.type) {
        case "success":
            res += 'bg-green-50 text-green-700'
            break
        case "warning":
            res += 'bg-yellow-50 text-yellow-700'
            break
        case "info":
            res += 'bg-blue-50 text-blue-700'
            break
        case "error":
            res += 'bg-red-50 text-red-700'
            break
    }

    return res
})
</script>