<template>
  <div class="relative">
    <Header />
    <div class="min-h-screen py-20 bg-baselight">
      <Nuxt />
    </div>
    <Footer />
    <CookieAgreementCard
      v-if="!cookieAgreement"
      @click="agree"
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CookieAgreementCard from '~/components/molecules/card/CookieAgreementCard.vue'

export default {
  components: {
    Header,
    Footer,
    CookieAgreementCard
  },
  data() {
    return {
      cookieAgreement: true
    }
  },
  mounted() {
    this.cookieAgreement = window.localStorage.getItem('cookieAgreement') !== null
  },
  methods: {
    agree() {
      this.cookieAgreement = true
      window.localStorage.setItem('cookieAgreement', true)
    }
  }
}
</script>
