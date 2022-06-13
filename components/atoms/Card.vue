<template>
  <div
    class="mx-4 my-4 p-4 rounded-xl flex flex-col items-center"
    :class="[backgroundColor, textColor, borderColor, borderWidth]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    backgroundColor: {
      type: String,
      default: 'bg-white'
    },
    textColor: {
      type: String,
      default: 'text-gray-600'
    },
    borderColor: {
      type: String,
      default: 'border-gray-300'
    },
    borderWidth: {
      type: String,
      default: 'border'
    }
  }
}
</script>
