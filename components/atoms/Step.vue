<template>
  <div class="flex justify-center my-12">
    <div class="grid w-3/4 grid-cols-3 bg-slate-200 rounded-xl overflow-hidden">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="p-4"
        :class="{
          'bg-green-400': index <= active,
          'rounded-r-xl': index === active
        }"
      >
        <div class="flex justify-start text-white font-bold">
          <span class="mr-1">{{ index + 1 }}.</span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: Number,
      default: 0
    }
  }
}
</script>
