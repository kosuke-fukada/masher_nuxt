<template>
  <div>
    <Button
      @click="signout"
    >
      signout
    </Button>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
export default {
  name: 'Main',
  components: {
    Button
  },
  methods: {
    async signout() {
      await this.$axios.$get('/api/signout/')
      await this.$store.dispatch('user/clearUser')
      location.href = '/'
    }
  }
}
</script>
