<template>
  <div
    ref="firstView"
    class="flex flex-col items-center mb-8 first-view"
  >
    <Heading
      size="text-7xl"
      :bold="true"
    >
      もっと<br>いいね<br>したい
    </Heading>
    <TwitterLoginButton />
    <div class="my-4">
      <p class="text-white text-center">
        気に入ったツイートにいいねする時、<br>
        こんな風に感じることはないでしょうか。
      </p>
      <p class="text-white text-center font-bold text-2xl mt-12">
        なぜいいねボタンは<br>1回しか押せないのか
      </p>
      <p class="text-white text-center mt-8">
        めちゃくちゃ刺さったツイートも、<br>
        「いいじゃん」ぐらいのツイートも、<br>
        Twitter上では同じ「1いいね」。
      </p>
      <p class="text-white text-center mt-8">
        でも実際にはツイートごとに<br>
        「いいね」と感じる度合いは違うはず。<br>
        もっといいねボタン押したい。
      </p>
      <p class="text-white text-center mt-8">
        Masherはそんな思いに応えるサービスです。<br>
        尊い絵に心が揺さぶられた時、<br>
        馬鹿馬鹿しいネタに爆笑した時、<br>
        優しい言葉に励まされた時、<br>
        Twitterでいいねしておけば、<br>
        Masherで好きなだけいいねボタンが押せます。
      </p>
      <p class="text-white text-center mt-8">
        お持ちのTwitterアカウントで<br>
        ログインするだけで簡単に始められます。<br>
        ぜひお気軽にどうぞ。
      </p>
    </div>
    <TwitterLoginButton />
  </div>
</template>

<script>
import Heading from '@/components/atoms/Heading'
import TwitterLoginButton from '~/components/molecules/button/TwitterLoginButton'

export default {
  name: 'Index',
  components: {
    Heading,
    TwitterLoginButton
  },
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Masher - Twitter無限いいねボタン',
      titleTemplate: null
    }
  },
  watch: {
    $route(to) {
      if (to.query.cancelled) {
        this.$toast.global.signinCancelled()
      } else if (to.query.error) {
        this.$toast.global.serverError()
      }
    }
  },
  mounted() {
    this.$refs.firstView.classList.add('show')
    if (this.$route.query) {
      if (this.$route.query.cancelled) {
        this.$toast.global.signinCancelled()
      } else if (this.$route.query.error) {
        this.$toast.global.serverError()
      }
    }
  }
}
</script>

<style scoped>
.first-view {
  opacity: 0;
  transform: translateY(20px);
}

.first-view.show {
  opacity: 1;
  transform: none;
  transition: all .5s linear;
}
</style>
