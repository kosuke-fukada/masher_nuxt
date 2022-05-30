<template>
  <div class="h-screen">
    <Header />
    <div
      class="py-16"
      :class="backgroundColor"
    >
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
  },
  computed: {
    backgroundColor() {
      return 'bg-light-background'
    }
  }
}
</script>
