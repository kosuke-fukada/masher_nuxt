<template>
  <div class="mx-4 my-4 w-3/4">
    <input
      class="border-2 rounded-md"
      :class="[width, borderColor]"
      :value="value"
      type="text"
      :placeholder="placeholder"
      @blur="onBlur"
      @input="onInput"
    >
    <p
      class="text-xs text-red-600 my-1 h-4"
    >
      {{ errorMessage }}
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
    errorMessage: {
      type: String,
      default: ''
    }
  },
  computed: {
    borderColor() {
      return this.errorMessage ? 'border-red-600' : 'border-gray-300'
    }
  },
  methods: {
    onBlur() {
      this.$emit('blur', this.value)
    },
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
