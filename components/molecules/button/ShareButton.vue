<template>
  <Button
    button-color="bg-twitter"
    @click="onClick"
  >
    <font-awesome-icon
      icon="share-nodes"
      class="mr-2 text-white"
    />
    Share
  </Button>
</template>

<script>
import Button from '~/components/atoms/Button'
export default {
  name: 'ShareButton',
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
