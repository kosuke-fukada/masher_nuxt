<template>
  <div class="w-12 h-12 mx-4 my-4">
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
    }
  },
  computed: {
    src() {
      if (this.img) {
        return this.img
      }
      return require('~/assets/images/twittericon13.jpeg')
    }
  }
}
</script>
