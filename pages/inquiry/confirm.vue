<template>
  <div class="flex flex-col items-center">
    <Card class="inquiry-card">
      <div class="flex flex-col items-center w-full">
        <Heading
          size="text-2xl"
          text-color="text-gray-600"
          bold
        >
          入力内容の確認
        </Heading>
        <div class="mb-2 lg:px-4 w-full">
          <p class="mx-4 font-bold">
            お名前
          </p>
          <p class="mx-4 input-value-width">
            {{ name }}
          </p>
        </div>
        <div class="mb-2 lg:px-4 w-full">
          <p class="mx-4 font-bold">
            メールアドレス
          </p>
          <p class="mx-4 input-value-width">
            {{ email }}
          </p>
        </div>
        <div class="mb-2 lg:px-4 w-full">
          <p class="mx-4 font-bold">
            お問い合わせ内容
          </p>
          <p
            class="mx-4 input-value-width break-all whitespace-pre-wrap"
            v-text="body"
          />
        </div>
        <Button
          button-color="bg-button"
          @click="submit"
        >
          この内容で送信する
        </Button>
        <Button
          @click="back"
        >
          戻る
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Card from '~/components/atoms/Card'
import Heading from '~/components/atoms/Heading'
import BadRequestError from '~/errors/BadRequestError'
import InternalServerError from '~/errors/InternalServerError'
import ValidationError from '~/errors/ValidationError'
export default {
  name: 'Confirm',
  components: {
    Button,
    Card,
    Heading
  },
  asyncData({ store, redirect }) {
    const name = store.getters['inquiry/name']
    const email = store.getters['inquiry/email']
    const body = store.getters['inquiry/body']
    if (!name || !email || !body) {
      redirect('/inquiry')
    }
  },
  head() {
    return {
      title: 'お問い合わせ内容確認'
    }
  },
  computed: {
    name() {
      return this.$store.getters['inquiry/name']
    },
    email() {
      return this.$store.getters['inquiry/email']
    },
    body() {
      return this.$store.getters['inquiry/body']
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    async submit() {
      try {
        const params = {
          name: this.name,
          email: this.email,
          body: this.body
        }
        await this.$axios.$post('/inquiry', params)
        this.$store.dispatch('inquiry/inquiryCompleted')
        this.$router.push('/inquiry/thanks')
      } catch (e) {
        if (e instanceof ValidationError) {
          Object.keys(e.errors).forEach(key => {
            if (key === 'name') {
              this.$store.commit('inquiry/setNameError', e.errors.name[0])
            } else if (key === 'email') {
              this.$store.commit('inquiry/setEmailError', e.errors.email[0])
            } else if (key === 'body') {
              this.$store.commit('inquiry/setBodyError', e.errors.body[0])
            }
          })
          this.$router.replace('/inquiry')
        } else if (e instanceof BadRequestError) {
          //
        } else if (e instanceof InternalServerError) {
          //
        }
      }
    }
  }
}
</script>

<style scoped>
.inquiry-card {
  width: min(95vw, 600px);
}
.input-value-width {
  min-width: 90%;
}
</style>
