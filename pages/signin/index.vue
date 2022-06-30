<template>
  <div />
</template>

<script>
export default {
  name: 'Index',
  middleware: 'isAuthenticated',
  async asyncData({ redirect, app, $axios }) {
    try {
      const url = await $axios.$get('/api/signin/twitter/')
      redirect(302, url)
    } catch (e) {
      app.router.push({
        path: '/',
        query: {
          error: 'true'
        }
      })
    }
  }
}
</script>
