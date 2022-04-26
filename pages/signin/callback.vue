<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',
  async asyncData({ redirect, route, store, $axios }) {
    const query = route.query
    const params = {
      params: query
    }
    const userInfo = await $axios.$get('/api/signin/twitter/callback/', params)
    await store.dispatch('user/setUserInfo', userInfo)
    redirect('/main')
  }
}
</script>
