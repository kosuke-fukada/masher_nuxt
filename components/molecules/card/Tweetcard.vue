<template>
  <div class="flex flex-col items-center">
    <Card>
      <Loading
        v-if="loading"
        color="#b8d6f9"
      />
      <div
        v-else-if="!error"
        class="flex flex-col items-center"
      >
        <div v-html="tweet.html" />
        <slot />
      </div>
      <div
        v-else
        class="flex flex-col items-center"
      >
        <p>
          {{ errorMessage }}
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../atoms/Card'
import Loading from '~/components/atoms/Loading'
import NotFoundError from '~/errors/NotFoundError'
import InternalServerError from '~/errors/InternalServerError'
export default {
  name: 'Tweetcard',
  components: {
    Card,
    Loading
  },
  props: {
    tweetId: {
      type: String,
      require: true,
      default: ''
    },
    authorId: {
      type: String,
      require: true,
      default: ''
    },
    authorName: {
      type: String,
      require: true,
      default: ''
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tweet: {},
      loading: true,
      error: false,
      errorMessage: ''
    }
  },
  async mounted() {
    const params = {
      tweet_id: this.tweetId,
      author_id: this.authorId,
      author_name: this.authorName
    }
    await this.$axios.$get('/api/tweet/', {
      params
    }).then(response => {
      this.tweet = response
    }).catch(e => {
      if (e instanceof NotFoundError) {
        this.error = true
        this.errorMessage = 'このツイートは存在しません。'
      } else if (e instanceof InternalServerError) {
        this.error = true
        this.errorMessage = 'サーバーエラーが発生しました。'
      }
    }).finally(() => {
      this.loading = false
      window.twttr.widgets.load()
    })
  }
}
</script>

<style>
  .twitter-tweet > iframe {
    width: min(80vw, 542px) !important;
  }
</style>
