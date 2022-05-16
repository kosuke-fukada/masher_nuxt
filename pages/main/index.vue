<template>
  <div class="flex flex-col items-center">
    <Button
      @click="signout"
    >
      signout
    </Button>
    <Button
      @click="refresh"
    >
      refresh
    </Button>
    <template v-for="tweet in tweetList">
      <Tweetcard
        :key="tweet.tweet_id"
        :tweet-id="tweet.tweet_id"
        :account-id="tweet.account_id"
        :user-name="tweet.user_name"
      />
    </template>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Tweetcard from '~/components/molecules/card/Tweetcard'
export default {
  name: 'Main',
  components: {
    Button,
    Tweetcard
  },
  async asyncData({ $axios, store }) {
    const list = await $axios.$get('/api/likes/')
    store.commit('likeTweetList/setTweetList', list)
  },
  computed: {
    tweetList: {
      get() {
        return this.$store.getters['likeTweetList/tweetList']
      },
      set(tweetList) {
        this.$store.commit('likeTweetList/setTweetList', tweetList)
      }
    }
  },
  mounted() {
    window.twttr.widgets.load()
  },
  methods: {
    async signout() {
      await this.$axios.$get('/api/signout/')
      await this.$store.dispatch('user/clearUser')
      location.href = '/'
    },
    async refresh() {
      await this.$axios.$get('/api/refresh/twitter/')
    }
  }
}
</script>
