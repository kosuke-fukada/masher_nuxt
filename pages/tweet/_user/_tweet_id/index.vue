<template>
  <div class="flex flex-col items-center mb-8">
    <Tweetcard
      :tweet-id="tweetId"
      :author-id="authorId"
      :author-name="authorName"
    >
      <div
        v-if="isAuthenticated && authorId"
        class="flex flex-col items-center justify-center"
      >
        <FavButton
          :fav-count="likeCount"
          :disabled="loading"
          @count="handleCount"
        />
        <template v-if="likeCount">
          <ShareButton
            v-if="isSupportedWebShareApi"
            @click="share"
          />
          <TwitterIntentButton
            v-else
            @click="twitterIntent"
          />
        </template>
      </div>
      <div
        v-else
        class="flex flex-col items-center"
      >
        <span class="font-bold text-sm my-2">＼ログインしていいねボタンを押しまくろう／</span>
        <TwitterLoginButton
          privacy-policy-link-color="text-gray-600"
        />
      </div>
    </Tweetcard>
    <Button
      class="flex align-bottom"
      button-color="bg-back"
      @click="backToMain"
    >
      <div class="flex items-center">
        <font-awesome-icon
          icon="chevron-left"
          class="text-white text-xs m-1"
        />
        トップページに戻る
      </div>
    </Button>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import FavButton from '~/components/molecules/button/FavButton'
import ShareButton from '~/components/molecules/button/ShareButton'
import TwitterIntentButton from '~/components/molecules/button/TwitterIntentButton'
import TwitterLoginButton from '~/components/molecules/button/TwitterLoginButton'
import Tweetcard from '~/components/molecules/card/Tweetcard'
export default {
  name: 'Tweet',
  components: {
    Button,
    Tweetcard,
    FavButton,
    TwitterLoginButton,
    ShareButton,
    TwitterIntentButton
  },
  validate({ params }) {
    return /^[A-Za-z0-9_]{1,15}$/.test(params.user) && /^\d+$/.test(Number(params.tweet_id))
  },
  async asyncData({ store, route, $axios, app }) {
    if (!store.getters['tweet/isSetTweet']) {
      const tweet = {
        tweet_id: route.params.tweet_id,
        author_id: '',
        author_name: route.params.user
      }
      if (store.getters['user/isAuthenticated']) {
        const params = {
          user_name: route.params.user
        }
        try {
          const authorInfo = await $axios.$get('/user/twitter', {
            params
          })
          tweet.author_id = authorInfo.data.id
        } catch (e) {
          app.$toast.global.serverError()
        }
      }
      await store.dispatch('tweet/setTweet', tweet)
    }

    if (!store.getters['user/isAuthenticated']) {
      return
    }

    const userId = store.getters['user/userId']
    const tweetId = store.getters['tweet/tweetId']
    const authorId = store.getters['tweet/authorId']
    const params = {
      user_id: userId,
      tweet_id: tweetId,
      author_id: authorId
    }
    const like = await $axios.$get('/like_count', {
      params
    })
    await store.dispatch('like/setLike', like)
  },
  data() {
    return {
      timerId: 0,
      loading: false
    }
  },
  head() {
    return {
      title: '@' + this.$route.params.user + 'さんのツイート'
    }
  },
  computed: {
    tweetId() {
      return this.$store.getters['tweet/tweetId']
    },
    authorId() {
      return this.$store.getters['tweet/authorId']
    },
    authorName() {
      return this.$store.getters['tweet/authorName']
    },
    likeId() {
      return this.$store.getters['like/id']
    },
    likeCount: {
      get() {
        return this.$store.getters['like/likeCount']
      },
      set(likeCount) {
        this.$store.commit('like/setLikeCount', likeCount)
      }
    },
    userId() {
      return this.$store.getters['user/userId']
    },
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    },
    isSupportedWebShareApi() {
      if (process.client) {
        return !!navigator.share
      } else {
        return false
      }
    }
  },
  methods: {
    handleCount() {
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = 0
      }
      this.likeCount++
      if (this.likeId) {
        this.timerId = setTimeout(async () => {
          await this.updateLike()
        }, 1000)
      } else {
        this.timerId = setTimeout(async () => {
          await this.createLike()
        }, 1000)
      }
    },
    async updateLike() {
      try {
        this.loading = true
        const params = {
          id: this.likeId,
          user_id: this.userId,
          tweet_id: this.tweetId,
          author_id: this.authorId,
          like_count: this.likeCount
        }
        await this.$axios.$put('/like_count', params)
        this.$toast.global.addLikeSuccess()
      } catch (e) {
        this.$toast.global.addLikeError()
      } finally {
        this.loading = false
      }
    },
    async createLike() {
      try {
        this.loading = true
        const params = {
          user_id: this.userId,
          tweet_id: this.tweetId,
          author_id: this.authorId,
          like_count: this.likeCount
        }
        const createdLike = await this.$axios.$post('/like_count', params)
        await this.$store.dispatch('like/setLike', createdLike)
        this.$toast.global.addLikeSuccess()
      } catch (e) {
        this.$toast.global.addLikeError()
      } finally {
        this.loading = false
      }
    },
    async share() {
      const contents = {
        title: '',
        text: '#Masher でこのツイートに' + this.likeCount + '回いいねしました！ @masher_app #無限いいね',
        url: 'https://twitter.com/' + this.authorName + '/status/' + this.tweetId
      }
      try {
        await navigator.share(contents)
      } catch (e) {
        //
      }
    },
    twitterIntent() {
      const params = {
        text: '#Masher でこのツイートに' + this.likeCount + '回いいねしました！ @masher_app #無限いいね',
        url: 'https://twitter.com/' + this.authorName + '/status/' + this.tweetId
      }
      const urlSearchParams = new URLSearchParams(params).toString()
      window.open('https://twitter.com/intent/tweet?' + urlSearchParams, null, 'top=100,left=100,width=550,height=420')
    },
    backToMain() {
      this.$router.push('/main')
    }
  }
}
</script>
