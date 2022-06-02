<template>
  <div class="w-full h-16 bottom-0 absolute bg-base flex justify-center items-center">
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
