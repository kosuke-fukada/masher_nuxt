const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  theme: {
    colors: {
      ...colors,
      twitter: '#1DA1F2'
    },
    screens: {
      sm: {
        max: '599px'
      },
      md: {
        min: '600px',
        max: '895px'
      },
      lg: {
        min: '896px'
      }
    },
    extend: {}
  },
  plugins: [],
  mode: 'jit',
  variants: {
    scale: ['responsive', 'hover', 'focus', 'active']
  }
}
