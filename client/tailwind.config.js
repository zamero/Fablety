export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      'text': '#130e01',
      'background': '#fffaeb',
      'primary': '#ff8400',
      'secondary': '#1953E6',
      'accent': '#1953e6',
      // You can define more custom colors here if needed
    },},
  },

  plugins: [
    require('@tailwindcss/forms')
  ],
}