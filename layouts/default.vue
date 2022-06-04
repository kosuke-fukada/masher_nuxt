<template>
  <div class="relative">
    <Header />
    <div class="min-h-screen my-16 bg-baselight">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
