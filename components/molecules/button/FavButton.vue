<template>
  <Button
    :disabled="disabled"
    @click="favCountUp"
  >
    <div class="flex items-center justify-center font-bold text-gray-500 flex-wrap">
      <span class="mr-1">
        <font-awesome-icon
          icon="heart"
          class="mr-1 text-red-600 text-md"
        />
        {{ favCount }}
      </span>
      <span>いいね</span>
    </div>
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    favCountUp() {
      this.$emit('count')
    }
  }
}
</script>
