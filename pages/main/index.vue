<template>
  <div class="flex flex-col items-center pb-8">
    <Heading
      size="text-2xl"
      bold
    >
      Twitterのいいね一覧
    </Heading>
    <div
      v-for="tweet in tweetList"
      :key="tweet.tweet_id"
    >
      <Tweetcard
        :tweet-id="tweet.tweet_id"
        :author-id="tweet.author_id"
        :author-name="tweet.author_name"
      >
        <Button
          button-color="bg-button"
          @click="toTweetDetailPage(tweet)"
        >
          このツイートを見る
        </Button>
      </Tweetcard>
    </div>
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
import Heading from '~/components/atoms/Heading'
export default {
  name: 'Main',
  components: {
    Button,
    Tweetcard,
    LoadingButton,
    Heading
  },
  middleware: 'authenticatedUserOnly',
  async asyncData({ $axios, store, req }) {
    const params = {}
    if (process.server) {
      params.headers = req.headers
    }
    const response = await $axios.$get('/api/likes/', params)
    store.commit('likeTweetList/setTweetList', response.tweetList)
    store.commit('likeTweetList/setNextToken', response.nextToken)
  },
  data() {
    return {
      loading: false
    }
  },
  head() {
    return {
      title: 'TOP'
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
    },
    async toTweetDetailPage(tweet) {
      await this.$store.dispatch('tweet/setTweet', tweet)
      this.$router.push({
        name: 'tweet-user-tweet_id',
        params: {
          user: tweet.author_name,
          tweet_id: tweet.tweet_id
        }
      })
    }
  }
}
</script>
