/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // 蓝色作为主色调
        secondary: '#E5E7EB', // 灰色作为默认背景
      }
    },
  },
  plugins: [],
}

