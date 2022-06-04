<template>
  <div>
    <Button
      v-show="!loading"
      @click="onClick"
    >
      もっと見る
    </Button>
    <client-only>
      <div
        v-show="loading"
        class="py-6"
      >
        <Spinner
          name="ball-pulse"
          color="#b8d6f9"
          no-fade-in
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button'
export default {
  name: 'LoadingButton',
  components: {
    Button
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
