<template>
  <div class="xdh-menu-toggle" :class="{'is-collapse': collapse}">
    <!--el-scrollbar组件设置高度100%包裹住需要滚动的dom结构即可。-->
    <el-scrollbar class="xdh-menu-toggle--expand"> <!--width/height:100%-->
      <Menu :data="data"
                :props="props"
                :collapse="false"
                :backgroundColor="backgroundColor"
                :textColor="textColor"
                :activeTextColor="activeTextColor"
                :defaultActive="currentIndex"
                :defaultOpeneds="defaultOpeneds"
                :uniqueOpened="uniqueOpened"
                :menuTrigger="menuTrigger"
                :router="router"
                :popperClass="popperClass"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"></Menu>
    </el-scrollbar>
    <Menu :data="data"
              class="xdh-menu-toggle--collapse"
              :props="props"
              :collapse="true"
              :backgroundColor="backgroundColor"
              :textColor="textColor"
              :activeTextColor="activeTextColor"
              :defaultActive="currentIndex"
              :defaultOpeneds="defaultOpeneds"
              :uniqueOpened="uniqueOpened"
              :menuTrigger="menuTrigger"
              :router="router"
              :popperClass="popperClass"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"></Menu>
  </div>
</template>

<script>
/**
 * 折叠菜单组件
 */
import Menu from './Menu'
export default {
  name: 'MenuToggle',
  components: {
    Menu
  },
  /**
   * 属性参数
   * @property {Array} [data = []] data 构成菜单内容的数组
   * @property {Object} [props = { id: 'id', text: 'text', icon: 'icon', children: 'children', group: 'group', route: 'route' }] props 指引菜单组件根据data数组中元素的键名作为菜单中对应的显示内容。例如：数组内元素为 {g_id:1, str:'第一组'}, 可以通过设置"props={id: 'g_id', text: 'str'}"来将数组的g_id对应为id，str对应为text
   * @property {String} [mode = 'verticle'] mode 默认为垂直模式，横向 ‘horizontal’
   * @property {Boolean} [collapse = false] 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
   * @property {String} [backgroundColor] backgroundColor='#FFFFFF' 菜单的背景色（仅支持 hex 格式）
   * @property {String} [textColor] 菜单的文字颜色（仅支持 hex 格式）
   * @property {String} [activeTextColor] 当前激活菜单的文字颜色（仅支持 hex 格式）
   * @property {String} [defaultActive] 当前激活菜单的 index。 defaultActive = '1'
   * @property {Array} [defaultOpeneds] 当前打开的sub-menu的 key 数组。 defaultOpeneds = ['2', '4']
   * @property {Boolean} [uniqueOpened = false] 是否只保持一个子菜单的展开
   * @property {String} [menuTrigger = 'click'] 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
   * @property {Boolean} [router = false] 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
   */
  props: {
    // 菜单数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 数据字段名称映射
    props: {
      type: Object,
      default () {
        return {
          id: 'id',
          text: 'text',
          icon: 'icon',
          children: 'children',
          group: 'group'
        }
      }
    },
    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: Boolean,

    // 菜单的背景色（仅支持 hex 格式）
    backgroundColor: String,

    // 菜单的文字颜色（仅支持 hex 格式）
    textColor: String,

    // 当前激活菜单的文字颜色（仅支持 hex 格式）
    activeTextColor: String,

    // 当前激活菜单的 index
    defaultActive: String,

    // 当前打开的sub-menu的 key 数组
    defaultOpeneds: Array,

    // 是否只保持一个子菜单的展开
    uniqueOpened: Boolean,

    // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
    menuTrigger: String,

    // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    router: Boolean,

    // 弹出菜单的自定义类名
    popperClass: String
  },
  data () {
    return {
      currentIndex: this.defaultActive
    }
  },
  watch: {
    /**
     * toggle 切换时派发的事件
     * @event change
     * @param val {boolean} 切换时的collapse值
     */
    collapse (val) {
      this.$emit('change', val)
    },
    defaultActive (val) {
      this.currentIndex = val
    }
  },
  methods: {
    /**
     * 触发选中事件
     * @event select
     * @param index {String} 选中列表id
     * @param indexPath {Array} 选中列表对应的路径 如：['item1', 'item1-1']
     */
    handleSelect (index, indexPath) {
      this.currentIndex = index
      this.$emit('select', index, indexPath)
    },
    /**
     * 触发列表组（子菜单）展开事件
     * @event open
     * @param index {String} 选中列表id
     * @param indexPath {Array} 选中列表对应的路径 如：['item1', 'item1-1']
     */
    handleOpen (index, indexPath) {
      this.$emit('open', index, indexPath)
    },
    /**
     * 触发列表组（子菜单）收起事件
     * @event close
     * @param index {String} 选中列表id
     * @param indexPath {Array} 选中列表对应的路径 如：['item1', 'item1-1']
     */
    handleClose (index, indexPath) {
      this.$emit('close', index, indexPath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style/vars";

$menu-toggle-index: $--index-top;

@mixin toggle-common {
  position: absolute;
  top: 0;
  transition: transform 0.3s;
}

.xdh-menu-toggle {
  position: relative;
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  @at-root {
    &--expand {
      width: 100%;
      height: 100%;
    }

    &--collapse {
      @include toggle-common;
      transform: translate3d(-100%, 0, 0);
      z-index: $menu-toggle-index;
      height: 100%;
      .el-scrollbar__wrap {
        overflow: visible;
      }
      .el-menu-item-group .el-submenu__title > span {
        display: none;
      }
    }

    &--expand {
      @include toggle-common;
    }
  }

  &.is-collapse {
    .xdh-menu-toggle--collapse {
      transform: translate3d(0, 0, 0);
    }

    .xdh-menu-toggle--expand {
      transform: translate3d(-200%, 0, 0);
    }
  }
}
</style>
