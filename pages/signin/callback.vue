<template>
  <div class="w-full h-screen flex justify-center">
    <Loading />
  </div>
</template>

<script>
import Loading from '~/components/atoms/Loading'
export default {
  name: 'Callback',
  components: {
    Loading
  },
  layout: 'empty',
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Loading'
    }
  },
  async mounted() {
    const query = this.$route.query
    const params = {
      params: query
    }
    const response = await this.$axios.$get('/api/signin/twitter/callback/', params)
    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      this.$router.replace('/')
    }
    const userInfo = await this.$axios.$get('/api/user/')
    if (userInfo.user_name) {
      await this.$store.dispatch('user/setUserInfo', userInfo)
    } else {
      await this.$store.dispatch('user/clearUser')
    }
    this.$router.replace('/main')
  }
}
</script>
