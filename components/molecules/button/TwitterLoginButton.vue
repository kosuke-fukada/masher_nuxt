<template>
  <div class="flex flex-col items-center mt-4 mb-12">
    <Button
      button-color="bg-twitter"
      @click="signinWithTwitter"
    >
      <span>
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          class="mr-2 text-white text-md"
        />
        Twitterでログイン
      </span>
    </Button>
    <span
      class="text-xs"
      :class="privacyPolicyLinkColor"
    >
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
  props: {
    privacyPolicyLinkColor: {
      type: String,
      default: 'text-white'
    }
  },
  methods: {
    signinWithTwitter() {
      this.$router.push('/signin')
    }
  }
}
</script>
