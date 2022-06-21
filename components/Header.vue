<template>
  <div class="select-none">
    <div
      class="fixed top-0 left-0 w-full h-16 bg-base flex justify-between items-center z-40"
    >
      <img
        src="/masher_logo_white.png"
        class="cursor-pointer h-8 ml-8"
        @click="toTop"
      >
      <div
        v-if="isAuthenticated"
        class="mr-8 flex items-center cursor-pointer"
        @click="toggleHeaderMenu"
      >
        <Icon
          :img="avatar"
        />
        <span class="text-white text-xs">{{ userName }}</span>
        <font-awesome-icon
          :icon="headerChevronIcon"
          class="text-white text-xs m-1"
        />
      </div>
    </div>
    <div
      v-show="headerMenuDisplay"
      class="fixed w-full h-full bg-backdrop z-50"
      @click.self="toggleHeaderMenu"
    >
      <UserCard />
    </div>
  </div>
</template>

<script>
import Icon from './atoms/Icon'
import UserCard from '~/components/molecules/card/UserCard'
export default {
  name: 'Header',
  components: {
    Icon,
    UserCard
  },
  data() {
    return {
      headerMenuDisplay: false
    }
  },
  computed: {
    headerChevronIcon() {
      return this.headerMenuDisplay ? 'chevron-up' : 'chevron-down'
    },
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    },
    userName() {
      return this.isAuthenticated ? '@' + this.$store.getters['user/userName'] : ''
    },
    avatar() {
      return this.isAuthenticated ? this.$store.getters['user/avatar'] : ''
    }
  },
  methods: {
    toTop() {
      const path = this.isAuthenticated ? '/main' : '/'
      this.$router.push(path)
    },
    toggleHeaderMenu() {
      this.headerMenuDisplay = !this.headerMenuDisplay
      document.body.style.overflow = this.headerMenuDisplay ? 'hidden' : ''
    }
  }
}
</script>
