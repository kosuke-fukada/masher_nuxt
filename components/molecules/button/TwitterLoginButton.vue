<template>
  <div class="flex flex-col items-center mt-4 mb-12">
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
    <span class="text-xs text-white">
      <nuxt-link
        class="border-b-2"
        to="/privacy"
      >
        プライバシーポリシー
      </nuxt-link>
      に同意の上ご利用ください
    </span>
  </div>
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
