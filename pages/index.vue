<template>
  <div class="flex flex-col items-center">
    <Heading
      size="text-4xl"
      :bold="true"
    >
      思う存分、<br>いいねしよう。
    </Heading>
    <div v-if="user">
      <p>{{ user.uid }}</p>
      <p>{{ user.twitterAccountId }}</p>
      <p>{{ user.displayName }}</p>
    </div>
    <twitter-url-form
      :error="error"
      @error="twitterUrlFormError"
    />
    <Button
      button-color="bg-base"
    >
      ボタン
    </Button>
    <fav-button
      :fav-count="favCount"
      @count="favCountUp"
    />
    <twitter-login-button />
    <div class="flex">
      <Card>hogehoge</Card>
      <Card>fugafuga</Card>
    </div>
    <Icon />
    <span class="text-white">{{ 'light' }}</span>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Heading from '@/components/atoms/Heading'
import Icon from '@/components/atoms/Icon'
import FavButton from '@/components/molecules/button/FavButton'
import TwitterUrlForm from '@/components/molecules/form/TwitterUrlForm'
import TwitterLoginButton from '~/components/molecules/button/TwitterLoginButton'

export default {
  name: 'Index',
  components: {
    Button,
    Card,
    Heading,
    Icon,
    FavButton,
    TwitterUrlForm,
    TwitterLoginButton
  },
  middleware: 'isAuthenticated',
  data() {
    return {
      error: false,
      favCount: 100000
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    twitterUrlFormError(value) {
      this.error = value
    },
    favCountUp() {
      this.favCount++
    }
  }
}
</script>
