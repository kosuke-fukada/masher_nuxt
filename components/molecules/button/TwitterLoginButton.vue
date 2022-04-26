<template>
  <Button
    button-color="bg-twitter"
    @click="signinWithTwitter"
  >
    <span>
      <font-awesome-icon
        :icon="['fab', 'twitter']"
        class="mr-2 text-white"
      />
      Twitterでログイン
    </span>
  </Button>
</template>

<script>
import Button from '@/components/atoms/Button'

export default {
  name: 'TwitterLoginButton',
  components: {
    Button
  },
  methods: {
    signinWithTwitter() {
      this.$router.push('/signin')
    }
  }
}
</script>
