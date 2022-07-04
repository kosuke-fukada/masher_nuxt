<template>
  <div class="w-full h-screen flex justify-center">
    <Loading />
  </div>
</template>

<script>
import Loading from '~/components/atoms/Loading'
import BadRequestError from '~/errors/BadRequestError'
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
      await this.$axios.$get('/signin/twitter/callback', params)
      const userInfo = await this.$axios.$get('/user')
      if (userInfo.user_name) {
        await this.$store.dispatch('user/setUserInfo', userInfo)
      } else {
        await this.$store.dispatch('user/clearUser')
      }
      this.$router.replace('/main')
    } catch (e) {
      if (e instanceof BadRequestError) {
        this.$router.replace({
          path: '/',
          query: {
            reason: 'cancel'
          }
        })
      } else {
        this.$router.replace({
          path: '/',
          query: {
            reason: 'error'
          }
        })
      }
    }
  }
}
</script>
