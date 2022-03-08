<template>
  <Toggle
    :checked="isDarkMode"
    @change="darkModeToggle"
  />
</template>

<script>
import Toggle from '@/components/atoms/Toggle'

export default {
  name: 'DarkModeToggle',
  components: {
    Toggle
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  mounted() {
    const isDarkMode = Boolean(parseInt(localStorage.getItem('isDarkMode')))
    if (isDarkMode) {
      this.isDarkMode = isDarkMode
      this.$isDarkMode.isDarkMode = isDarkMode
    }
  },
  methods: {
    darkModeToggle() {
      this.isDarkMode = !this.isDarkMode
      this.$isDarkMode.isDarkMode = this.isDarkMode
      localStorage.setItem('isDarkMode', Number(this.isDarkMode))
    }
  }
}
</script>
