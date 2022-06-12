<template>
  <div class="mx-4 my-2">
    <textarea
      class="border-2 rounded-md input-width"
      :class="[borderColor]"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      @blur="onBlur"
      @input="onInput"
    />
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
    maxLength: {
      type: Number,
      default: 500
    },
    rows: {
      type: Number,
      default: 5
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

<style scoped>
.input-width {
  width: min(100%, 600px);
}
</style>
