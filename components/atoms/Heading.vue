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
    },
    textColor: {
      type: String,
      default: 'text-white'
    }
  },
  computed: {
    headingStyle() {
      const color = this.textColor
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
