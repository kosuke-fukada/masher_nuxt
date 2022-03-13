<template>
  <div
    class="mx-4 my-4"
    :class="sizeClass"
  >
    <img
      :src="src"
      class="rounded-full"
    >
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    img: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'sm'
    }
  },
  computed: {
    src() {
      if (this.img) {
        return this.img
      }
      return require('~/assets/images/twittericon13.jpeg')
    },
    sizeClass() {
      const list = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
      }
      return list[this.size]
    }
  }
}
</script>
