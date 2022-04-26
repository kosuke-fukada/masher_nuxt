export const actions = {
  async nuxtServerInit({ dispatch }, { $axios }) {
    const userInfo = await $axios.$get('/api/user/')
    if (userInfo.user_name) {
      await dispatch('user/setUserInfo', userInfo)
    } else {
      await dispatch('user/clearUser')
    }
  }
}
