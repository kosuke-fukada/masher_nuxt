<template>
  <div class="flex flex-col items-center mb-8">
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
      <p class="text-white text-center font-bold text-2xl mt-8">
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
        ネタツイートに爆笑した時、<br>
        ツイートに励まされた時に<br>
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
  mounted() {
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
