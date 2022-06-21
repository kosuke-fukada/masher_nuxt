<template>
  <div
    :id="id"
    class="relative"
  >
    <div
      class="text-white text-sm cursor-pointer"
      @click="toggleList"
    >
      {{ value.label }}
      <font-awesome-icon
        :icon="chevronIcon"
        class="text-white text-xs mx-1"
      />
    </div>
    <ul
      v-show="open"
      class="bg-gray-700 my-2 absolute min-w-max rounded right-0"
    >
      <li
        v-for="(item, index) in list"
        :key="index"
        class="text-white text-sm min-w-fit px-4 py-2 hover:bg-gray-600 cursor-pointer"
        :class="rounded(index)"
        @click="onSelect(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    value: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    chevronIcon() {
      return this.open ? 'chevron-up' : 'chevron-down'
    },
    rounded() {
      return index => {
        if (index === 0) {
          return 'rounded-t'
        } else if (index === this.list.length - 1) {
          return 'rounded-b'
        }
        return ''
      }
    }
  },
  mounted() {
    window.addEventListener('click', this.clickOutside)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.clickOutside)
  },
  methods: {
    toggleList() {
      this.open = !this.open
    },
    onSelect(item) {
      this.$emit('select', item)
    },
    clickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false
      }
    }
  }
}
</script>
