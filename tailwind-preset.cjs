const colors = require('./src/tokens/colors.json')
const zIndex = require('./src/tokens/zIndex.json')

exports.colors = colors
exports.zIndex = zIndex

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      ...colors,
    },
    extend: {
      zIndex,
    },
  },
}
