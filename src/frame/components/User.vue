<template>
  <div class="xdh-header__user" @click="exit">
    <slot>
      <div class="header-user__info"><i :class="icon"></i>{{text}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String
  },
  methods: {
    exit () {
      
    }
  }
}
</script>
