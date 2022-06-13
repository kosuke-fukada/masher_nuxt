<template>
  <div class="w-full h-screen flex justify-center">
    <Loading />
  </div>
</template>

<script>
import Loading from '~/components/atoms/Loading'
import ForbiddenError from '~/errors/ForbiddenError'
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
    try {
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
    } catch (e) {
      if (e instanceof ForbiddenError) {
        this.$router.replace({
          path: '/',
          query: {
            cancelled: 'true'
          }
        })
      } else {
        this.$router.replace({
          path: '/',
          query: {
            error: 'true'
          }
        })
      }
    }
  }
}
</script>
