const colors = require('./src/tokens/colors.json')
const zIndex = require('./src/tokens/zIndex.json')
const boxShadow = require('./src/tokens/boxShadow.json')

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
    boxShadow: {
      ...boxShadow,
      none: 'none',
    },
    extend: {
      zIndex,
    },
  },
}
