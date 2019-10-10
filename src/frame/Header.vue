<script>
/**
 * XdhHeader 页面头部组件
 * @module widgets/xdh-header
 */

import HeaderLogo from './components/Logo'
import HeaderNav from './components/Nav'
import HeaderSearch from './components/Search'
import HeaderTitle from './components/Title'
import HeaderTool from './components/Tool'
import HeaderUser from './components/User'
import HeaderSlot from './components/Slot'

/**
 * slots
 * @member slots
 * @property {String} logo 定义logo内容
 * @property {String} title 定义标题内容
 * @property {String} search 定义搜索输入框内容
 * @property {String} nav 定义导航菜单内容
 * @property {String} user 定义用户信息内容
 * @property {String} tool 定义工具按钮内容
 */

export default {
  name: 'Header',
  components: {
    HeaderLogo,
    HeaderNav,
    HeaderSearch,
    HeaderTitle,
    HeaderTool,
    HeaderUser,
    HeaderSlot
  },
  /**
   * props
   * @member props
   * @property {String} [size] 高度尺寸，支持 large、default、small
   * @property {String} [layout] 设置子组件布局，支持 logo, title, search, nav, -> ,user, tool
   * @property {String} title 标题名称，也可以用插槽title定义
   * @property {String} logo logo图片，也可以用插槽logo定义
   * @property {Array} [searchTypes] 搜索框前的分类下拉框数据
   * @property {Array} [searchType] 搜索框前的默认分类
   * @property {String} [searchKeyword] 搜索框默认关键字
   * @property {String} [searchWidth] 搜索框宽度
   * @property {String} [searchPlaceholder] 搜索输入框提示文字
   * @property {Array} [nav] 导航菜单数据数组
   * @property {Object} [navProp] 导航菜单属性映射
   * @property {Boolean } [navRouter] 导航菜单是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
   * @property {String} [navDefaultActive] 导航菜单默认激活项
   * @property {String} [userIcon] 用户Icon
   * @property {String} [userText] 用户显示文字
   * @property {Array} tools 工具数据数组
   * @property {Object} [toolProp] 工具对象属性映射
   * @property {Boolean} [toolInline]  工具按钮是否单行显示
   */
  props: {
    // 高度尺寸
    size: {
      type: String,
      default: 'default',
      validator (val) {
        return ['large', 'default', 'small'].includes(val)
      }
    },
    // 排版布局
    layout: {
      type: String,
      default: 'title'
    },
    // 标题名称，也可以用插槽title定义
    title: {
      type: String
    },
    // logo 图片
    logo: {
      type: String
    },
    // 搜索类型数组
    searchTypes: {
      type: Array
    },
    // 搜索类型
    searchType: {
      type: [String, Number]
    },
    searchKeyword: {
      type: String
    },
    // 搜索框宽度
    searchWidth: {
      type: String
    },
    // 搜索输入框提示文字
    searchPlaceholder: {
      type: String
    },
    // 导航菜单数据
    nav: {
      type: Array
    },
    // 导航菜单属性映射
    navProp: {
      type: Object
    },
    // 导航菜单是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    navRouter: Boolean,
    // 导航菜单默认激活项
    navDefaultActive: String,
    // 用户Icon
    userIcon: String,
    // 用户显示文字
    userText: String,

    // 工具数据数组
    tools: Array,
    // 工具对象属性映射
    toolProp: Object,
    // 工具按钮是否单行显示
    toolInline: Boolean
  },
  methods: {
    renderLogo (h) {
      return h('header-logo', {
        props: {
          src: this.logo
        }
      }, this.$slots.logo)
    },
    renderTitle (h) {
      return h('header-title', this.$slots.title || this.title)
    },
    renderSearch (h) {
      return h('header-search', {
        props: {
          width: this.searchWidth,
          size: this.size,
          placeholder: this.searchPlaceholder,
          types: this.searchTypes,
          keyword: this.searchKeyword,
          type: this.searchType
        },
        on: {
          search: (keyword, type) => {
            /**
             * 搜索框点击搜索按钮时触发
             * @event on-search
             * @param {string} keyword 搜索关键字
             * @param {string} type  搜索类型
             */
            this.$emit('on-search', keyword, type)
          }
        }
      }, this.$slots.search)
    },
    renderNav (h) {
      return h('header-nav', {
        props: {
          data: this.nav,
          props: this.navProp,
          router: this.navRouter,
          defaultActive: this.navDefaultActive
        },
        on: {
          select: (index, indexPath) => {
            /**
             * 点击导航菜单项时触发
             * @event on-nav-select
             * @param {string} index 菜单
             * @param {string} indexPath  菜单路径
             */
            this.$emit('on-nav-select', index, indexPath)
          }
        }
      }, this.$slots.nav)
    },
    renderUser (h) {
      return h('header-user', {
        props: {
          icon: this.userIcon,
          text: this.userText
        }
      }, this.$slots.user)
    },
    renderTool (h) {
      return h('header-tool', {
        props: {
          data: this.tools,
          props: this.toolProp,
          inline: this.toolInline
        },
        on: {
          click: (item) => {
            /**
             * 点击工具按钮时触发
             * @event on-tool-click
             * @param {Object} item 工具对象
             */
            this.$emit('on-tool-click', item)
          }
        }
      }, this.$slots.tool)
    }
  },
  render (h) {
    let template = <div class={['xdh-header', `is-${this.size}`]}></div>
    const layout = this.layout || ''
    if (!layout) return
    const TEMPLATE_MAP = {
      logo: this.renderLogo(h),
      title: this.renderTitle(h),
      search: this.renderSearch(h),
      nav: this.renderNav(h),
      user: this.renderUser(h),
      tool: this.renderTool(h),
      slot: <header-slot></header-slot>
    }
    const components = layout.split(',').map((item) => item.trim())
    const rightWrapper = <div class="xdh-header__rightwrapper"></div>
    let haveRightWrapper = false
    template.children = template.children || []
    rightWrapper.children = rightWrapper.children || []
    components.forEach(compo => {
      if (compo === '->') {
        haveRightWrapper = true
        return
      }

      if (!haveRightWrapper) {
        template.children.push(TEMPLATE_MAP[compo])
      } else {
        rightWrapper.children.push(TEMPLATE_MAP[compo])
      }
    })

    if (haveRightWrapper) {
      template.children.unshift(rightWrapper)
    }

    return template
  },
  created () {
  }
}
</script>

<style lang="scss">
@import "./style/vars";

.xdh-header {
  height: 60px;
  background-color: $--color-primary;
  color: $--color-white;
  clear: both;
  padding: 0 10px;
  &__rightwrapper {
    float: right;
    height: 100%;
    > div {
      display: inline-block;
      vertical-align: top;
      height: 100%;
    }
  }
  &.is-large {
    height: 80px;
    .xdh-header__title {
      font-size: 30px;
      line-height: 80px;
    }
    .xdh-header__search {
      padding-top: 20px;
    }
    .el-menu-item, .el-menu .el-submenu__title {
      height: 80px !important;
      line-height: 80px !important;
      font-size: 16px;
    }
    .header-user__info {
      height: 80px;
      line-height: 80px;
      font-size: 16px;
    }
    .header-tool-item.is-inline {
      margin-top: 0;
      line-height: 80px;
      font-size: 16px;
      > i {
        margin-top: 18px;
        font-size: 16px;
      }
    }
    .header-tool-item > i {
      margin-top: 18px;
      font-size: 25px;
    }
  }
  &.is-small {
    height: 50px;
    .xdh-header__title {
      font-size: 20px;
      line-height: 50px;
    }
    .xdh-header__search {
      padding-top: 10px;
    }
    .el-menu-item, .el-menu .el-submenu__title {
      height: 50px !important;
      line-height: 50px !important;
    }
    .header-user__info {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
    .header-tool-item.is-inline {
      margin-top: 0;
      line-height: 50px;

    }
    .header-tool-item > i {
      margin-top: 3px;
    }
  }
  > div {
    display: inline-block;
    vertical-align: top;
    height: 100%;
  }
  &__logo {
    padding-left: 10px;
    img {
      height: 60%;
      display: inline-block;
      margin-top: 30%;
    }
  }
  &__title {
    font-size: 26px;
    line-height: 60px;
    padding-left: 5px;
  }
  &__search {
    margin-left: 30px;
    padding-top: 10px;
    .el-select > .el-input {
      min-width: 105px;
    }

    .el-input__inner {
      background: $--color-primary-light-8;
      color: $--color-primary;
      border-color: $--color-primary-light-4;
      &:focus {
        border-color: $--color-primary-light-5;
        outline: none;
      }
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: $--color-primary-light-2;
    }

    .el-input-group__append, .el-input-group__prepend {
      background: $--color-primary-light-5;
      color: $--color-primary;
      border-color: $--color-primary-light-4;
    }

  }

  &__nav {
    margin-left: 30px;
    .xdh-menu {
      background-color: transparent;
      > .el-menu-item, > .el-menu-item i, > .el-submenu > .el-submenu__title, > .el-submenu i {
        color: $--color-primary-light-8;
      }
      > .el-menu-item.is-active, .el-submenu.is-active > .el-submenu__title {
        color: $--color-primary-light-8;
        background-color: $--color-primary-light-3 !important;
        border-bottom-width: 0;
      }
      > .el-menu-item:hover, > .el-menu-item:focus,
      > .el-submenu > .el-submenu__title:hover,
      > .el-submenu:focus > .el-submenu__title {
        background-color: $--color-primary-light-3 !important;
        color: $--color-white !important;
      }

    }
  }
  &__popper {
    .el-menu {
      background-color: $--color-primary !important;
    }
    .el-menu-item, .el-menu .el-submenu__title {
      background-color: $--color-primary !important;
      color: $--color-primary-light-6 !important;
      i {
        color: $--color-primary-light-6 !important;
      }
      &:hover {
        background-color: $--color-primary-light-3 !important;
      }
    }
    .el-menu-item.is-active, .el-submenu.is-active > .el-submenu__title {
      color: $--color-white !important;
    }

  }
  &__user {
    font-size: 14px;
    .header-user__info {
      height: 60px;
      line-height: 60px;
      padding: 0 15px;
      i {
        margin-right: 5px;
      }
    }
  }

  &__tool {
    margin-left: 30px;
  }

  .header-tool-item {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    padding: 0 15px;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
    i {
      font-size: 25px;
      display: block;
      margin-top: 8px;
    }
    &:hover {
      background-color: $--color-primary-light-3;
    }
    &.is-inline {
      line-height: 60px;
      font-size: 14px;
      i {
        font-size: 14px;
        display: inline;
      }
    }
  }

}
</style>
