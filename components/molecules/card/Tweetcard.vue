<template>
  <Card>
    <div
      v-if="!loading"
      class="flex flex-col items-center"
    >
      <div v-html="tweet.html" />
      <slot />
    </div>
    <Loading
      v-else
      color="#b8d6f9"
    />
  </Card>
</template>

<script>
import Card from '../../atoms/Card'
import Loading from '~/components/atoms/Loading'
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
    }
  },
  data() {
    return {
      tweet: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    const params = {
      tweet_id: this.tweetId,
      author_id: this.authorId,
      author_name: this.authorName
    }
    this.tweet = await this.$axios.$get('/api/tweet/', {
      params
    })
    window.twttr.widgets.load()
    this.loading = false
  }
}
</script>

<style>
  .twitter-tweet > iframe {
    width: min(80vw, 542px) !important;
  }
</style>
