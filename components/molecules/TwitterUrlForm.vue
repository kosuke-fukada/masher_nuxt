<template>
  <text-form
    v-model="value"
    width="w-full"
    :error-message="errorMessage"
    @blur="validate"
  />
</template>

<script>
import TextForm from '@/components/atoms/TextForm'
export default {
  name: 'TwitterUrlForm',
  components: {
    TextForm
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    errorMessage() {
      return this.error ? 'TweetのURLを入力してください' : ''
    }
  },
  methods: {
    validate() {
      const regExp = /https:\/\/twitter.com\/[a-zA-Z0-9_]{1,50}\/status\/\d+/
      this.$emit('error', !regExp.test(this.value))
    }
  }
}
</script>
