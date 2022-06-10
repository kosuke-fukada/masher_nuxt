<template>
  <client-only>
    <div class="top-80 m-auto">
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
      default: 'ball-pulse'
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
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
