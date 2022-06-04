<template>
  <button
    class="min-w-48 h-12 rounded-md flex justify-center items-center mx-4 my-4 px-4 active:scale-95 select-none"
    :class="[buttonColor, borderColor, cursor]"
    :disabled="disabled"
    @click="onClick"
  >
    <span :class="textColor">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonColor: {
      type: String,
      default: 'bg-white'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    borderColor() {
      return this.buttonColor === 'bg-white' ? 'border border-gray-300' : ''
    },
    textColor() {
      return this.buttonColor === 'bg-white' ? 'text-gray-600' : 'text-white'
    },
    cursor() {
      return this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
  .min-w-48 {
    min-width: 12rem;
  }
</style>
