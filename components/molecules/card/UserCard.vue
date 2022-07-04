<template>
  <div class="fixed top-16 right-4 sm:right-0 sm:left-0">
    <Card
      border-color="border-base"
      border-width="border-2"
    >
      <div class="flex items-center justify-start w-auto border-b-2">
        <Icon
          :img="avatar"
          size="md"
        />
        <div class="mx-4 my-4">
          <p class="text-md text-base font-bold">
            {{ omitDisplayName }}
          </p>
          <p class="text-sm text-base">
            {{ userName }}
          </p>
        </div>
      </div>
      <Button
        button-color="bg-red-500"
        @click="logout"
      >
        ログアウト
      </Button>
    </Card>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Card from '~/components/atoms/Card'
import Icon from '~/components/atoms/Icon'
export default {
  name: 'UserCard',
  components: {
    Card,
    Icon,
    Button
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
      await this.$axios.$get('/api/signout')
      await this.$store.dispatch('user/clearUser')
      location.href = '/'
    }
  }
}
</script>
