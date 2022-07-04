<template>
  <div class="flex flex-col items-center">
    <Card class="inquiry-card">
      <div class="flex flex-col items-center w-full">
        <Heading
          size="text-2xl"
          text-color="text-gray-600"
          bold
        >
          お問い合わせ
        </Heading>
        <div class="mb-2 w-full">
          <p class="mx-4 font-bold">
            お名前
          </p>
          <TextForm
            v-model="name"
            :error-message="nameError"
            required
            @input="nameValidate"
          />
        </div>
        <div class="mb-2 w-full">
          <p class="mx-4 font-bold">
            メールアドレス
          </p>
          <TextForm
            v-model="email"
            :error-message="emailError"
            required
            @input="emailValidate"
          />
        </div>
        <div class="mb-2 w-full">
          <p class="mx-4 font-bold">
            お問い合わせ内容
          </p>
          <TextArea
            v-model="body"
            :error-message="bodyError"
            @input="bodyValidate"
          />
        </div>
        <Button
          button-color="bg-button"
          @click="toConfirm"
        >
          入力内容を確認する
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Card from '~/components/atoms/Card'
import Heading from '~/components/atoms/Heading'
import TextArea from '~/components/atoms/TextArea'
import TextForm from '~/components/atoms/TextForm'
export default {
  name: 'Inquiry',
  components: {
    Card,
    TextForm,
    TextArea,
    Heading,
    Button
  },
  head() {
    return {
      title: 'お問い合わせ'
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.getters['inquiry/name']
      },
      set(name) {
        this.$store.commit('inquiry/setName', name)
      }
    },
    email: {
      get() {
        return this.$store.getters['inquiry/email']
      },
      set(email) {
        this.$store.commit('inquiry/setEmail', email)
      }
    },
    body: {
      get() {
        return this.$store.getters['inquiry/body']
      },
      set(body) {
        this.$store.commit('inquiry/setBody', body)
      }
    },
    nameError: {
      get() {
        return this.$store.getters['inquiry/nameError']
      },
      set(nameError) {
        this.$store.commit('inquiry/setNameError', nameError)
      }
    },
    emailError: {
      get() {
        return this.$store.getters['inquiry/emailError']
      },
      set(emailError) {
        this.$store.commit('inquiry/setEmailError', emailError)
      }
    },
    bodyError: {
      get() {
        return this.$store.getters['inquiry/bodyError']
      },
      set(bodyError) {
        this.$store.commit('inquiry/setBodyError', bodyError)
      }
    }
  },
  async mounted() {
    const userInfo = await this.$axios.$get('/user')
    if (userInfo.user_name) {
      await this.$store.dispatch('user/setUserInfo', userInfo)
    } else {
      await this.$store.dispatch('user/clearUser')
    }
  },
  methods: {
    nameValidate() {
      if (!this.name) {
        this.nameError = 'お名前を入力してください。'
      } else {
        this.nameError = ''
      }
    },
    emailValidate() {
      if (!this.email) {
        this.emailError = 'メールアドレスを入力してください。'
      } else {
        this.emailError = ''
      }
    },
    bodyValidate() {
      if (!this.body) {
        this.bodyError = 'お問い合わせ内容を入力してください。'
      } else {
        this.bodyError = ''
      }
    },
    toConfirm() {
      this.nameValidate()
      this.emailValidate()
      this.bodyValidate()
      if (this.$store.getters['inquiry/errorExists']) {
        return
      }
      this.$router.push('/inquiry/confirm')
    }
  }
}
</script>

<style scoped>
.inquiry-card {
  width: min(95vw, 600px);
}
</style>
