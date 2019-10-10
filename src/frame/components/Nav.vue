<template>
  <div class="xdh-header__nav">
    <slot>
      <Menu mode="horizontal" :data="data" popper-class="xdh-header__popper" :props="props" :router="router" :default-active="defaultActive" @select="handleSelect"></Menu>
    </slot>
  </div>
</template>

<script>
import Menu from '../Menu'

export default {
  components: {
    Menu
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    props: Object,
    router: Boolean,
    defaultActive: String
  },
  methods: {
    handleSelect (index, indexPath) {
      this.$emit('select', index, indexPath)
    }
  }
}
</script>
