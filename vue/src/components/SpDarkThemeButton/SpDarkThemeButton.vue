<template>
  <div class="switch-wrapper">
    <input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
    <label for="checkbox" class="switch-label">
      <span>🌙</span>
      <span>☀️</span>
      <div class="switch-toggle" :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"></div>
    </label>
  </div>
</template>
  
<script>
export default {
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: "light-theme",
    };
  },

  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },

    getTheme() {
      return localStorage.getItem("user-theme");
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.switch-wrapper {
  /* --element-size: 4rem; */
  --text-primary-color: #ddd;
  --accent-color: #CACACA;
  --background-color-primary: #000;
}
.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  background: var(--text-primary-color);
  border: calc(calc(4rem * 0.1) * 0.025) solid var(--accent-color);
  border-radius: 4rem;
  cursor: pointer;
  display: flex;
  font-size: calc(4rem * 0.3);
  height: 34px;
  position: relative;
  padding: calc(4rem * 0.1);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: 79px;
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: 6px;
  left: 4px;
  height: 20px;
  width: 20px;
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(49px) !important;
}
</style>
  