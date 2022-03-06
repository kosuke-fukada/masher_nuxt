<template>
  <Button @click="favCountUp">
    <span class="flex items-center">
      <font-awesome-icon
        icon="heart"
        class="mr-2 text-red-600"
      />
      {{ favCount }}
    </span>
  </Button>
</template>

<script>
import Button from '@/components/atoms/Button'
export default {
  name: 'FavButton',
  components: {
    Button
  },
  props: {
    favCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    favCountUp() {
      this.$emit('count')
    }
  }
}
</script>
