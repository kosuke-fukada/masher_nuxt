<template>
  <client-only>
    <div
      class="inset-1/2"
      :class="position"
    >
      <Spinner
        :name="name"
        :color="color"
        :width="width"
        :height="height"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    name: {
      type: String,
      default: 'circle-fade'
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    fixed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    position() {
      return this.fixed ? 'fixed' : ''
    }
  }
}
</script>

<style>
  .sk-spinner>div {
    width: 10px !important;
    height: 10px !important;
  }
</style>
