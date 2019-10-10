<template>
  <ElFrame class="app-layout" :tabs="tabs" :menu="menu">
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </ElFrame>
</template>

<script>
  import ElFrame from '../frame/ElFrame.vue'
  import data from '../frame/config'

  export default {
    components: {
      ElFrame
    },
    data() {
      return {
        data: data,
        tabs: {
          router: true,
          store: 'docsTabs',
          label: '概况',
          name: '/',
          icon: 'iconfont icon-home',
          closable: false
        },
        menu: {
          data: data.guide.items
        }
      }
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler(val) {
          const categroyArray = ['guide', 'element', 'libs', 'widgets', 'extension']
          const category = val.split('/')[1]
          if (categroyArray.includes(category)) {
            this.menu.data = data[category || 'guide'].items
          } else {
            this.menu.data = data.guide.items
          }
        }
      }
    }

  }
</script>


<style scoped lang="scss">
  .main {
    padding: 20px;
  }
</style>

