<template>
  <div class="fixed bottom-4 w-full">
    <Card
      text-color="text-slate-800"
    >
      <p class="text-xs">
        当サイトではCookieを使用します。<br>Cookieに関する詳細はプライバシーポリシーをご覧ください。
      </p>
      <Button
        button-color="bg-button"
        @click="agree"
      >
        OK
      </Button>
    </Card>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Card from '~/components/atoms/Card'
export default {
  name: 'CookieAgreementCard',
  components: {
    Button,
    Card
  },
  methods: {
    agree() {
      this.$emit('click')
    }
  }
}
</script>
