<template>
  <div class="flex flex-col items-center pb-8">
    <Heading
      size="text-2xl"
      bold
    >
      無限いいね一覧
    </Heading>
    <template v-if="firstLoading">
      <div class="loading-screen">
        <Loading />
      </div>
    </template>
    <template v-else-if="likeList.length">
      <div class="flex justify-end order-change">
        <div class="mr-2">
          <Dropdown
            id="order-key"
            v-model="orderKey"
            :list="orderKeyList"
            @select="changeOrderKey"
          />
        </div>
        <div>
          <Dropdown
            id="order-value"
            v-model="orderValue"
            :list="orderValueList"
            @select="changeOrderValue"
          />
        </div>
      </div>
      <div
        v-for="like in likeList"
        :key="like.tweet_id"
      >
        <Tweetcard
          :tweet-id="like.tweet_id"
          :author-id="like.author_id"
          :author-name="like.author_name"
        >
          <Button
            button-color="bg-button"
            @click="toTweetDetailPage(like)"
          >
            このツイートを見る
          </Button>
        </Tweetcard>
      </div>
      <LoadingButton
        v-if="nextPageExists"
        :loading="loading"
        @click="handleLoading"
      >
        もっと見る
      </LoadingButton>
    </template>
    <template v-else>
      <div class="my-8">
        <p class="text-white">
          まだ無限いいねしていません。
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
import Tweetcard from '~/components/molecules/card/Tweetcard'
import LoadingButton from '~/components/molecules/button/LoadingButton'
import Heading from '~/components/atoms/Heading'
import Dropdown from '~/components/molecules/Dropdown'
import Loading from '~/components/atoms/Loading'
export default {
  name: 'Like',
  components: {
    Button,
    Tweetcard,
    LoadingButton,
    Heading,
    Dropdown,
    Loading
  },
  middleware: 'authenticatedUserOnly',
  async asyncData({ $axios, store, req, app }) {
    const params = {
      params: {
        page: 1,
        user_id: store.getters['user/userId'],
        order_key: 'id',
        order_value: 'desc'
      }
    }
    if (process.server) {
      params.headers = req.headers
    }
    try {
      const response = await $axios.$get('/api/likes/', params)
      store.commit('likeList/setLikeList', response.like_list)
      return {
        total: response.total
      }
    } catch (e) {
      app.$toast.global.serverError()
    }
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      orderKey: {
        label: '作成日',
        value: 'id'
      },
      orderValue: {
        label: '降順',
        value: 'desc'
      },
      total: 0,
      firstLoading: false
    }
  },
  head() {
    return {
      title: '無限いいね一覧'
    }
  },
  computed: {
    likeList: {
      get() {
        return this.$store.getters['likeList/likeList']
      },
      set(likeList) {
        this.$store.commit('likeList/setLikeList', likeList)
      }
    },
    userId() {
      return this.$store.getters['user/userId']
    },
    PAGINATE_LENGTH() {
      return 10
    },
    nextPageExists() {
      return this.currentPage * this.PAGINATE_LENGTH < this.total
    },
    orderKeyList() {
      return [
        {
          label: '作成日',
          value: 'id'
        },
        {
          label: '更新日',
          value: 'updated_at'
        },
        {
          label: 'いいね数',
          value: 'like_count'
        }
      ]
    },
    orderValueList() {
      return [
        {
          label: '昇順',
          value: 'asc'
        },
        {
          label: '降順',
          value: 'desc'
        }
      ]
    }
  },
  methods: {
    async fetchLikeList() {
      try {
        this.loading = true
        const response = await this.$axios.$get('/api/likes/', {
          params: {
            page: this.currentPage,
            user_id: this.userId,
            order_key: this.orderKey.value,
            order_value: this.orderValue.value
          }
        })
        const updatedLikeList = this.likeList.concat(response.like_list)
        this.likeList = updatedLikeList
        this.total = response.total
      } catch (e) {
        this.$toast.global.serverError()
      } finally {
        this.loading = false
      }
    },
    async handleLoading() {
      this.currentPage += 1
      await this.fetchLikeList()
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
    },
    async changeOrderKey(orderKey) {
      this.firstLoading = true
      this.likeList = []
      this.orderKey = orderKey
      await this.fetchLikeList()
      this.firstLoading = false
    },
    async changeOrderValue(orderValue) {
      this.firstLoading = true
      this.likeList = []
      this.orderValue = orderValue
      await this.fetchLikeList()
      this.firstLoading = false
    }
  }
}
</script>

<style scoped>
.order-change {
  width: min(80vw, 542px) !important;
}

.loading-screen {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
