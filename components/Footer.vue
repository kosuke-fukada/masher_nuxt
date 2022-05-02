<template>
  <div class="fixed bottom-0 left-0 w-full h-16 bg-base flex justify-center items-center">
    <span
      class="text-white cursor-pointer"
    >{{ hoge }}</span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      hoge: 'fuga'
    }
  }
}
</script>
