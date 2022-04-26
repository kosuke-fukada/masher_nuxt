<template>
  <div>
    <vue-loading
      type="spiningDubbles"
    />
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Index',
  components: {
    VueLoading
  },
  async asyncData({ redirect, $axios }) {
    const url = await $axios.$get('/api/signin/twitter/')
    redirect(302, url)
  }
}
</script>
