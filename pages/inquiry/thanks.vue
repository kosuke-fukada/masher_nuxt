<template>
  <div class="flex flex-col items-center py-12 px-4">
    <Heading
      size="text-4xl"
      bold
    >
      Thank you for inquiry.
    </Heading>
    <div class="my-4">
      <p class="text-white text-sm">
        お問い合わせいただき誠にありがとうございます。<br>
        内容を確認の上、1週間程度で返信いたしますので<br>今しばらくお待ちください。
      </p>
    </div>
    <Button
      @click="toTop"
    >
      Topに戻る
    </Button>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Heading from '~/components/atoms/Heading'
export default {
  name: 'Thanks',
  components: {
    Button,
    Heading
  },
  asyncData({ store, redirect }) {
    if (!store.getters['inquiry/complete']) {
      redirect('/inquiry')
    }

    store.commit('inquiry/setComplete', false)
  },
  head() {
    return {
      title: 'お問い合わせ完了'
    }
  },
  methods: {
    toTop() {
      const path = this.$store.getters['user/isAuthenticated'] ? '/main' : '/'
      this.$router.push(path)
    }
  }
}
</script>
