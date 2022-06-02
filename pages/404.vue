<template>
  <div class="error flex flex-col justify-center items-center">
    <Heading
      size="text-9xl"
      bold
    >
      404
    </Heading>
    <p class="text-white text-xl">
      Not Found
    </p>
  </div>
</template>

<script>
import Heading from '~/components/atoms/Heading'
export default {
  components: {
    Heading
  }
}
</script>

<style scoped>
  .error {
    min-height: calc(100vh - 8rem);
  }
</style>
