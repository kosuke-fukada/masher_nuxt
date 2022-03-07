<template>
  <div class="w-12 h-12 mx-4 my-4">
    <img
      :src="img"
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
  }
}
</script>
