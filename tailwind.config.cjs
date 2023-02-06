/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  presets: [require('./tailwind-preset.cjs')],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
