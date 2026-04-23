/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        accent: "#14B8A6",
        success: "#22C55E",
        danger: "#EF4444",
      }
    },
  },
  plugins: [],
}
