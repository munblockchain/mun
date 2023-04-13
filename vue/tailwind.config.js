/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'lilac': '#ac61d7',
        'lilac-hover': '#ad65e7',
        'lilac-disabled': '#bc71e7',
        'solitude': '#e9ecef',
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
