<template>
  <div class="flex flex-col items-center">
    <Tweetcard
      :tweet-id="tweetId"
      :author-id="authorId"
      :author-name="authorName"
    >
      <FavButton
        v-if="isAuthenticated"
        :fav-count="likeCount"
        @count="handleCount"
      />
      <div
        v-else
        class="flex flex-col items-center"
      >
        <span>ログインしていいねボタンを押しまくろう</span>
        <TwitterLoginButton />
      </div>
    </Tweetcard>
  </div>
</template>

<script>
import FavButton from '~/components/molecules/button/FavButton'
import TwitterLoginButton from '~/components/molecules/button/TwitterLoginButton'
import Tweetcard from '~/components/molecules/card/Tweetcard'
export default {
  name: 'Tweet',
  components: {
    Tweetcard,
    FavButton,
    TwitterLoginButton
  },
  validate({ params }) {
    return /^[A-Za-z0-9_]{1,15}$/.test(params.user) && /^\d+$/.test(Number(params.tweet_id))
  },
  async asyncData({ store, route, $axios }) {
    if (!store.getters['tweet/isSetTweet']) {
      const params = {
        user_name: route.params.user
      }
      const authorInfo = await $axios.$get('/api/user/twitter/', {
        params
      })
      const tweet = {
        tweet_id: route.params.tweet_id,
        author_id: authorInfo.data.id,
        author_name: route.params.user
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
    const like = await $axios.$get('/api/like_count/', {
      params
    })
    await store.dispatch('like/setLike', like)
  },
  data() {
    return {
      timerId: 0
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
    }
  },
  methods: {
    handleCount() {
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = 0
      }
      this.likeCount++
      this.timerId = setTimeout(async () => {
        if (this.likeId) {
          const params = {
            id: this.likeId,
            user_id: this.userId,
            tweet_id: this.tweetId,
            author_id: this.authorId,
            like_count: this.likeCount
          }
          await this.$axios.$put('/api/like_count', params)
        } else {
          const params = {
            user_id: this.userId,
            tweet_id: this.tweetId,
            author_id: this.authorId,
            like_count: this.likeCount
          }
          const createdLike = await this.$axios.$post('/api/like_count', params)
          await this.$store.dispatch('like/setLike', createdLike)
        }
      }, 1000)
    }
  }
}
</script>
