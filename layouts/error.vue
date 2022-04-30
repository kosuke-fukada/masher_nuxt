<template>
  <div>
    <p>{{ errorObject.message }}</p>
    <p v-if="errorObject.statusCode === 404">
      hogehoge
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      errorObject: {
        message: this.error.message,
        statusCode: this.error.statusCode
      }
    }
  },
  watch: {
    error(newValue, oldValue) {
      this.errorObject = {
        message: newValue.response.data.message,
        statusCode: newValue.statusCode
      }
    }
  }
}
</script>
