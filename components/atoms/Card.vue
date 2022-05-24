<template>
  <div
    class="mx-4 my-4 p-4 rounded-xl border cursor-pointer min-w-xl max-w-xl transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
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
