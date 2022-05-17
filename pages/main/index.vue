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
    <LoadingButton
      v-if="nextToken"
      :loading="loading"
      @click="handleLoading"
    >
      もっと見る
    </LoadingButton>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Tweetcard from '~/components/molecules/card/Tweetcard'
import LoadingButton from '~/components/molecules/button/LoadingButton'
export default {
  name: 'Main',
  components: {
    Button,
    Tweetcard,
    LoadingButton
  },
  async asyncData({ $axios, store }) {
    const response = await $axios.$get('/api/likes/')
    store.commit('likeTweetList/setTweetList', response.tweetList)
    store.commit('likeTweetList/setNextToken', response.nextToken)
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    tweetList: {
      get() {
        return this.$store.getters['likeTweetList/tweetList']
      },
      set(tweetList) {
        this.$store.commit('likeTweetList/setTweetList', tweetList)
      }
    },
    nextToken: {
      get() {
        return this.$store.getters['likeTweetList/nextToken']
      },
      set(nextToken) {
        this.$store.commit('likeTweetList/setNextToken', nextToken)
      }
    }
  },
  methods: {
    async signout() {
      await this.$axios.$get('/api/signout/')
      await this.$store.dispatch('user/clearUser')
      location.href = '/'
    },
    async refresh() {
      await this.$axios.$get('/api/refresh/twitter/')
    },
    async handleLoading() {
      this.loading = true
      const response = await this.$axios.$get('/api/likes/', {
        params: {
          next_token: this.nextToken
        }
      })
      const updatedTweetList = this.tweetList.concat(response.tweetList)
      this.tweetList = updatedTweetList
      this.nextToken = response.nextToken
      this.loading = false
    }
  }
}
</script>
