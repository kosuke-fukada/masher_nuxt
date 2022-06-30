<template>
  <div class="w-full h-screen flex justify-center">
    <Loading />
  </div>
</template>

<script>
import Loading from '~/components/atoms/Loading'
export default {
  name: 'Index',
  components: {
    Loading
  },
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Signin'
    }
  },
  async mounted() {
    try {
      const url = await this.$axios.$get('/api/signin/twitter/')
      location.href = url
    } catch (e) {
      this.$router.push({
        path: '/',
        query: {
          reason: 'error'
        }
      })
    }
  }
}
</script>
