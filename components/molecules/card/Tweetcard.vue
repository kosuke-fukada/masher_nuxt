<template>
  <Card>
    <div v-html="tweet.html" />
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
    accountId: {
      type: String,
      require: true,
      default: ''
    },
    userName: {
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
      account_id: this.accountId,
      user_name: this.userName
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
