/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      zIndex: {
        overlays: '1800',
        modal: '1700',
        header: '1600',
        drawer: '1500',
        backdrop: '1400',
        fixed: '1300',
        sticky: '1200',
        dropdown: '1100',
        tooltip: '1000',
        max: '9999',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
