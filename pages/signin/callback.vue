<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',
  middleware: 'isAuthenticated',
  async mounted() {
    const query = this.$route.query
    const params = {
      params: query
    }
    const response = await this.$axios.$get('/api/signin/twitter/callback/', params)
    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      this.$router.replace('/')
    }
    this.$router.replace('/main')
  }
}
</script>
