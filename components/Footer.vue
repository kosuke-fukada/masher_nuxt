<template>
  <div class="w-full h-20 bottom-0 absolute bg-base flex flex-col justify-center items-center">
    <ul class="flex text-white text-sm">
      <li class="mx-2">
        <nuxt-link
          to="/inquiry"
        >
          お問い合わせ
        </nuxt-link>
      </li>
      <li class="mx-2">
        <nuxt-link
          to="/privacy"
        >
          プライバシーポリシー
        </nuxt-link>
      </li>
    </ul>
    <p class="text-white text-xs mt-4">
      &copy;{{ year }} Masher all rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: 0
    }
  },
  created() {
    this.year = (new Date()).getFullYear()
  }
}
</script>
