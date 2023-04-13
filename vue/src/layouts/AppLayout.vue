<template>
    <div class="min-h-full">
        <MnNavBar :navigation="props.links" />

        <!-- <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
        </header> -->
        <main>
            <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>
    </div>
</template>
  
<script setup lang="ts">
import MnNavBar from '../components/nav/MnNavBar.vue';

const props = defineProps(['links'])
</script>