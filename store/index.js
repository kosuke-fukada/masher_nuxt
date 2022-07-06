export const actions = {
  async nuxtServerInit({ dispatch }, { req, $axios }) {
    const params = {
      headers: req.headers
    }
    try {
      const userInfo = await $axios.$get('/signin/remember_token', params)
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
