<template>
  <div />
</template>

<script>
export default {
  name: 'Callback',
  middleware: 'isAuthenticated',
  async asyncData({ redirect, route, store, $axios }) {
    const query = route.query
    const params = {
      params: query
    }
    const response = await $axios.$get('/api/signin/twitter/callback/', params)
    if (Object.prototype.hasOwnProperty.call(response, 'message')) {
      redirect('/')
    }
    redirect('/main')
  }
}
</script>
