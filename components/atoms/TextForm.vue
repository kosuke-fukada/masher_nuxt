<template>
  <div class="mx-4 my-12 pb-6">
    <input
      class="border-2 rounded-md"
      :class="[width, borderColor]"
      :value="value"
      type="text"
      :placeholder="placeholder"
      @blur="onBlur"
    >
    <p
      class="text-xs text-red-600 my-1 h-4"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextForm',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'w-72'
    },
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    borderColor() {
      return this.error ? 'border-red-600' : 'border-gray-300'
    }
  },
  methods: {
    onBlur() {
      this.$emit('blur', this.value)
    }
  }
}
</script>
