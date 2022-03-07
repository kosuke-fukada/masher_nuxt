<template>
  <div class="mx-4 my-4 p-4 rounded-xl border cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {}
}
</script>
