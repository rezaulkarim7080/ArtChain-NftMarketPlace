/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // add any other themes you want

    // themes: [
    //   {
    //     light: { "primary": "#82b440" }, // Light mode primary color
    //     dark: { "primary": "#82b440" },  // Dark mode primary color
    //   }
    // ],
  },
}
