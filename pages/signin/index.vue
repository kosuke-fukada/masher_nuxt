<template>
  <div />
</template>

<script>
export default {
  name: 'Index',
  middleware: 'isAuthenticated',
  async asyncData({ redirect, $axios }) {
    const url = await $axios.$get('/api/signin/twitter/')
    redirect(302, url)
  }
}
</script>
