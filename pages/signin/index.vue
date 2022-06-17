<template>
  <div />
</template>

<script>
export default {
  name: 'Index',
  middleware: 'isAuthenticated',
  async asyncData({ redirect, router, $axios }) {
    try {
      const url = await $axios.$get('/api/signin/twitter/')
      redirect(302, url)
    } catch (e) {
      router.replace({
        path: '/',
        query: {
          error: 'true'
        }
      })
    }
  }
}
</script>
