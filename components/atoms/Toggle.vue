<template>
  <div class="w-14 mx-4 my-4">
    <label class="cursor-pointer">
      <div class="relative">
        <input
          class="sr-only"
          :checked="checked"
          type="checkbox"
          @change="onChange"
        >
        <div
          class="block w-14 h-8 rounded-full transition"
          :class="checked ? 'bg-green-400' : 'bg-slate-300'"
        />
        <div class="dot absolute w-6 h-6 bg-white rounded-full transition left-1 top-1" />
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange() {
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
}
</style>
