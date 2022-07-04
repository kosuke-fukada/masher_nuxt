<template>
  <div class="select-none">
    <div
      class="fixed top-0 left-0 w-screen h-16 bg-base flex justify-between items-center z-40"
    >
      <img
        src="/masher_logo_white.png"
        class="cursor-pointer h-8 ml-8"
        @click="toTop"
      >
      <div
        v-if="isAuthenticated"
        class="mr-4 flex items-center cursor-pointer"
        @click="toggleHeaderMenu"
      >
        <Icon
          :img="avatar"
        />
        <font-awesome-icon
          icon="bars"
          class="text-white text-2xl mr-4"
        />
      </div>
    </div>
    <transition name="sidemenu-backdrop">
      <div
        v-show="headerMenuDisplay"
        class="fixed w-screen h-screen bg-backdrop z-50"
        @click.self="toggleHeaderMenu"
      />
    </transition>
    <transition name="sidemenu">
      <SideMenu
        v-show="headerMenuDisplay"
        @close="closeSideMenu"
      />
    </transition>
  </div>
</template>

<script>
import Icon from './atoms/Icon'
import SideMenu from './SideMenu'
export default {
  name: 'Header',
  components: {
    Icon,
    SideMenu
  },
  data() {
    return {
      headerMenuDisplay: false
    }
  },
  computed: {
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
    },
    closeSideMenu() {
      this.headerMenuDisplay = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.sidemenu-enter-active, .sidemenu-leave-active {
  transform: translate(0px, 0px);
  transition: transform .3s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.sidemenu-enter, .sidemenu-leave-to {
  transform: translateX(100vw) translateX(0px);
}

.sidemenu-backdrop-enter-active, .sidemenu-backdrop-leave-active {
  opacity: 1;
  transition: opacity .1s linear;
}

.sidemenu-backdrop-enter, .sidemenu-backdrop-leave-to {
  opacity: 0;
}
</style>
