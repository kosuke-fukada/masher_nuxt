const colors = require('tailwindcss/colors')

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = {
  content: [],
  theme: {
    colors: {
      ...colors,
      twitter: '#1DA1F2',
      base: '#04B4AE',
      baselight: '#02bab4',
      button: '#7acfd6',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      sidemenu: 'rgba(0, 0, 0, 0.8)',
      back: '#29CCC7'
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
