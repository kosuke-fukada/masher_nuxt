<template>
  <div
    class="mx-4 my-4 p-4 rounded-xl border cursor-pointer min-w-xl max-w-xl transition-all ease-in-out flex flex-col items-center"
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
      return 'bg-white text-gray-600 border-gray-300 shadow-current'
    }
  }
}
</script>
