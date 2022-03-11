<template>
  <div
    class="w-48 h-12 rounded-md flex justify-center items-center mx-4 my-4 cursor-pointer active:scale-95 select-none"
    :class="[buttonColor, borderColor]"
    @click="onClick"
  >
    <span :class="textColor">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonColor: {
      type: String,
      default: 'bg-white'
    }
  },
  computed: {
    borderColor() {
      return this.buttonColor === 'bg-white' ? 'border border-gray-300' : ''
    },
    textColor() {
      return this.buttonColor === 'bg-white' ? 'text-gray-600' : 'text-white'
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
