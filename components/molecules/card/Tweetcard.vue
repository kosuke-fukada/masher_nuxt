<template>
  <Card>
    <div v-html="tweet.html" />
    <slot />
  </Card>
</template>

<script>
import Card from '../../atoms/Card'
export default {
  name: 'Tweetcard',
  components: {
    Card
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
      tweet: {}
    }
  },
  async mounted() {
    const params = {
      tweet_id: this.tweetId,
      author_id: this.authorId,
      author_name: this.authorName
    }
    this.tweet = await this.$axios.$get('/api/tweet/', {
      params
    })
    window.twttr.widgets.load()
  }
}
</script>

<style>
  .twitter-tweet > iframe {
    width: 542px !important;
  }
</style>
