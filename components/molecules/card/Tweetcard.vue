<template>
  <div class="flex flex-col items-center">
    <Card class="tweet-card">
      <div
        v-if="loading"
        class="flex flex-col items-center"
      >
        <Loading
          color="#b8d6f9"
        />
      </div>
      <div
        v-else-if="!error"
        class="flex flex-col items-center"
      >
        <div class="tweet-wrapper mb-2">
          <div class="flex">
            <Icon
              :img="tweet.avatar"
              size="md"
            />
            <a
              class="mx-4 my-4"
              :href="authorUrl"
              target="_blank"
            >
              <p class="text-md font-bold">
                {{ tweet.display_name }}
              </p>
              <p class="text-sm">
                @{{ authorName }}
              </p>
            </a>
          </div>
          <div class="px-4 my-2">
            <p
              v-html="autoLinkTweet"
            />
          </div>
          <div class="flex justify-between items-baseline px-4 my-2 h-8">
            <div class="flex">
              <a
                :href="replyUrl"
                target="_blank"
              >
                <font-awesome-icon
                  icon="reply"
                  class="text-gray-400 text-xs mr-4"
                />
              </a>
              <a
                :href="retweetUrl"
                target="_blank"
              >
                <font-awesome-icon
                  icon="retweet"
                  class="text-gray-400 text-xs mr-4"
                />
              </a>
              <a
                :href="likeUrl"
                target="_blank"
              >
                <font-awesome-icon
                  icon="heart"
                  class="text-gray-400 text-xs mr-4"
                />
              </a>
            </div>
            <a
              class="text-xs text-gray-400"
              :href="tweetUrl"
              target="_blank"
            >
              {{ createdAtJst }}
            </a>
          </div>
          <div
            v-if="tweet.media.length"
            class="px-4 my-2"
          >
            <template v-for="media in tweet.media">
              <img
                v-if="media.type === 'photo'"
                :key="media.media_key"
                :src="media.url"
              >
              <video
                v-else-if="media.type === 'video'"
                :key="media.media_key"
                :src="media.variants[0].url"
                muted
                controls
              />
            </template>
          </div>
        </div>
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
import Icon from '~/components/atoms/Icon'
export default {
  name: 'Tweetcard',
  components: {
    Card,
    Loading,
    Icon
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
  computed: {
    tweetUrl() {
      return 'https://twitter.com/' + this.authorName + '/status/' + this.tweetId
    },
    authorUrl() {
      return 'https://twitter.com/' + this.authorName
    },
    replyUrl() {
      return 'https://twitter.com/intent/tweet?in_reply_to=' + this.tweetId
    },
    retweetUrl() {
      return 'https://twitter.com/intent/retweet?tweet_id=' + this.tweetId
    },
    likeUrl() {
      return 'https://twitter.com/intent/like?tweet_id=' + this.tweetId
    },
    autoLinkTweet() {
      return this.tweet.text.replace(/(https?:\/\/[^\s]*)/g, "<a class='text-blue-700' href='$1' target='_blank'>$1</a>")
    },
    createdAtJst() {
      return new Date(this.tweet.created_at).toLocaleString({ timeZone: 'Asia/Tokyo' })
    }
  },
  async mounted() {
    const params = {
      tweet_id: this.tweetId,
      author_id: this.authorId,
      author_name: this.authorName
    }
    await this.$axios.$get('/tweet', {
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
.tweet-wrapper {
  width: min(80vw, 542px) !important;
}

.twitter-tweet > iframe {
  width: min(80vw, 542px) !important;
}

.tweet-card > div {
  width: min(80vw, 542px) !important;
}
</style>
