<template>
  <p :class="headingStyle">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    size: {
      type: String,
      default: 'text-sm'
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headingStyle() {
      const color = 'text-white'
      const size = this.size
      const bold = this.bold ? 'font-bold' : ''
      return [
        color,
        size,
        bold
      ]
    }
  }
}
</script>
