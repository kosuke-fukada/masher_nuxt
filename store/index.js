export const actions = {
  async nuxtServerInit({ dispatch }, { req, $axios }) {
    const params = {}
    if (process.server) {
      params.headers = req.headers
    }
    const userInfo = await $axios.$get('/api/user/', params)
    if (userInfo.user_name) {
      await dispatch('user/setUserInfo', userInfo)
    } else {
      await dispatch('user/clearUser')
    }
  }
}
