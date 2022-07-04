export const actions = {
  async nuxtServerInit({ dispatch }, { req, $axios }) {
    const params = {}
    if (process.server) {
      params.headers = req.headers
    }
    try {
      const userInfo = await $axios.$get('/user', params)
      if (userInfo.user_name) {
        await dispatch('user/setUserInfo', userInfo)
      } else {
        await dispatch('user/clearUser')
      }
    } catch (e) {
      await dispatch('user/clearUser')
    }
  }
}
