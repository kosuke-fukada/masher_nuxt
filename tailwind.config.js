const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  theme: {
    colors: {
      ...colors,
      twitter: '#1DA1F2'
    },
    extend: {}
  },
  plugins: [],
  mode: 'jit',
  variants: {
    scale: ['responsive', 'hover', 'focus', 'active']
  }
}
