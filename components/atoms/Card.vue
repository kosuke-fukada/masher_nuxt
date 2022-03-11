<template>
  <div
    class="mx-4 my-4 p-4 rounded-xl border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg"
    :class="cardStyle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {},
  computed: {
    cardStyle() {
      return this.$isDarkMode.isDarkMode ? 'bg-dark-background text-white border-white shadow-white' : 'bg-white text-gray-600 border-gray-300 shadow-current'
    }
  }
}
</script>
