<template>
  <div class="select-none">
    <div
      class="fixed top-0 left-0 w-full h-16 border-b border-gray-600 bg-base flex justify-between items-center"
    >
      <img
        :src="require('~/assets/images/mash_logo_white.png')"
        class="cursor-pointer h-8 ml-8"
        @click="toTop"
      >
      <div
        class="mr-8 flex items-center cursor-pointer"
        @click="toggleHeaderMenu"
      >
        <Icon />
        <span class="text-white text-xs">@hogehoge</span>
        <font-awesome-icon
          :icon="headerChevronIcon"
          class="text-white text-xs m-1"
        />
      </div>
    </div>
    <div
      v-show="headerMenuDisplay"
      class="fixed top-16 left-0 w-full h-full sm:bg-backdrop md:bg-backdrop lg:bg-transparent lg:flex lg:justify-end"
      @click.self="toggleHeaderMenu"
    >
      <div
        class="lg:w-1/4 lg:h-auto"
        @click.self="toggleHeaderMenu"
      >
        <div class="bg-base border-b lg:border-l border-gray-600 p-1 flex justify-between items-center">
          <span class="text-white ml-8">ダークモード</span>
          <dark-mode-toggle class="mr-8" />
        </div>
        <div class="bg-base border-b lg:border-l border-gray-600 p-1 flex justify-center items-center">
          <Button
            button-color="bg-red-500"
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './atoms/Button.vue'
import Icon from './atoms/Icon.vue'
import DarkModeToggle from './organisms/DarkModeToggle'
export default {
  name: 'Header',
  components: {
    Button,
    Icon,
    DarkModeToggle
  },
  data() {
    return {
      headerMenuDisplay: false
    }
  },
  computed: {
    headerChevronIcon() {
      return this.headerMenuDisplay ? 'chevron-up' : 'chevron-down'
    }
  },
  methods: {
    toTop() {
      this.$router.push('/')
    },
    toggleHeaderMenu() {
      this.headerMenuDisplay = !this.headerMenuDisplay
    }
  }
}
</script>
