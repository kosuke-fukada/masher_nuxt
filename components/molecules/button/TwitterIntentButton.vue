<template>
  <Button
    button-color="bg-twitter"
    @click="onClick"
  >
    <span>
      <font-awesome-icon
        :icon="['fab', 'twitter']"
        class="mr-2 text-white"
      />
      Twitterでシェア
    </span>
  </Button>
</template>

<script>
import Button from '~/components/atoms/Button'
export default {
  name: 'TwitterIntentButton',
  components: {
    Button
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
