<template>
  <div class="h-screen sidemenu fixed right-0 bg-sidemenu backdrop-blur-md z-50">
    <div class="flex items-center justify-start w-auto h-16 border-b-2 bg-base border-gray-400">
      <Icon
        :img="avatar"
        size="sm"
      />
      <div class="mx-4 my-4">
        <p class="text-md text-white font-bold">
          {{ omitDisplayName }}
        </p>
        <p class="text-sm text-white">
          {{ userName }}
        </p>
      </div>
    </div>
    <div class="my-8 flex flex-col px-4">
      <nuxt-link
        class="text-white my-4"
        to="/main"
        @click.native="closeSideMenu"
      >
        Top
      </nuxt-link>
      <nuxt-link
        class="text-white my-4"
        to="/like"
        @click.native="closeSideMenu"
      >
        無限いいね一覧
      </nuxt-link>
    </div>
    <div class="fixed bottom-8">
      <Button
        button-color="bg-red-500"
        @click="logout"
      >
        ログアウト
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Icon from '~/components/atoms/Icon'
export default {
  name: 'SideMenu',
  components: {
    Icon,
    Button
  },
  asyncData({ app }) {
    app.$emit('close')
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
    },
    displayName() {
      return this.isAuthenticated ? this.$store.getters['user/displayName'] : ''
    },
    omitDisplayName() {
      if (this.displayName.length <= 10) {
        return this.displayName
      }
      return this.displayName.substring(0, 10) + '...'
    }
  },
  methods: {
    async logout() {
      await this.$axios.$get('/signout')
      await this.$store.dispatch('user/clearUser')
      location.href = '/'
    },
    closeSideMenu() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.sidemenu {
  width: min(14rem, 300px);
}
</style>
