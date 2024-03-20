/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./resources/vue/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#fcf3f9",
        "primary-100": "#f4c8e3",
        "primary-200": "#ec9cce",
        "primary-300": "#e371b8",
        "primary-400": "#db46a3",
        "primary-500": "#d31b8e",
        "primary-800": "#540a38",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
