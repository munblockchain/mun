<template>
    <button type="button"
        class="rounded-full p-1 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white outline-none"
        @click="toggleTheme">
        <SunIcon class="h-6 w-6" aria-hidden="true" v-if="!isDark" />
        <MoonIcon class="h-6 w-6" aria-hidden="true" v-if="isDark" />
    </button>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref, computed } from 'vue';

let userTheme = ref('')
let isDark = computed(() => userTheme.value == 'dark')

onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference();
    setTheme(initUserTheme);
})

function toggleTheme() {
    const activeTheme = localStorage.getItem("user-theme");
    if (activeTheme === "light") {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}

function getTheme() {
    return localStorage.getItem("user-theme");
}

function setTheme(theme: string) {
    localStorage.setItem("user-theme", theme);
    userTheme.value = theme;
    if (theme == 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function getMediaPreference() {
    const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (hasDarkPreference) {
        return "dark-theme";
    } else {
        return "light-theme";
    }
}
</script>