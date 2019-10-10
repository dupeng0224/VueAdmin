<template>
  <Layout class="xdh-admin app-layout" :north="northOptions" :west="westOptions" :fixed="fixed" :footer-in-main="footerInMain">
    <!-- 头部组件-->
    <slot name="header" slot="north">
      <Header class="xdh-admin__header" :class="{'is-fixed-width':this.fixedWidth}" v-bind="headerOptions" @on-nav-select="onNavSelect" @on-search="onSearch" @on-tool-click="onToolClick">
        <slot name="header-logo" slot="logo"></slot>
        <slot name="header-title" slot="title"></slot>
        <slot name="header-search" slot="search"></slot>
        <slot name="header-nav" slot="nav"></slot>
        <slot name="header-user" slot="user"></slot>
        <slot name="header-tool" slot="tool">
          <span class="sys-theme" slot="header-tool">
            <el-color-picker size="small" v-model="color"></el-color-picker>            
          </span>          
        </slot>
        <slot name="header-slot"></slot>
      </Header>
    </slot>
    <!-- 侧边栏 -->
    <slot v-if="sidebar" name="sidebar" slot="west">
      <div class="xdh-admin__sidebar">
        <div v-if="collapsible" class="xdh-admin__switch" @click="handleSidebarSwitch">
          <i class="iconfont icon-collapsed" :class="{'is-collapsed': menuCollapsed}"></i>
        </div>
        <!-- 前置插槽 -->
        <slot name="menu-prepend"></slot>
        <MenuToggle class="xdh-admin__menu" :class="{'collapsible':collapsible}" popper-class="xdh-admin__popper" :collapse="menuCollapsed" v-bind="menuOptions" @select="handleMenuSelect">
        </MenuToggle>
        <!-- 后置插槽 -->
        <slot name="menu-append"></slot>
      </div>
    </slot>

    <!-- 主体内容 -->
    <div ref="main" class="xdh-admin__main">
      <!-- 导航tabs -->
      <NavTabs v-if="navType==='tab'" class="xdh-admin__tabs" @on-remove="onTabRemove" @on-click="onTabClick" v-bind="tabsOptions"></NavTabs>
      <!--面包屑-->
      <Breadcrumb v-if="navType==='breadcrumb'" class="xdh-admin__breadcrumb" v-bind="breadcrumb">
        <slot name="breadcrumb-tool" slot="tool"></slot>
      </Breadcrumb>

      <div ref="body" class="xdh-admin__body" :class="bodyClasses">
        <div class="main">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>

    <!-- 底部-->
    <slot v-if="footer" name="footer" slot="south">
      <div class="xdh-admin__footer" :class="{'is-fixed-width':this.fixedWidth}">
        {{info.copyright}}
      </div>
    </slot>
  </Layout>
</template>

<script>
import Breadcrumb from './BreadCrumb'
import Header from './Header'
import Layout from './Layout'
import MenuToggle from './MenuToggle'
import NavTabs from './NavTabs'
import data from './config'
import themeMixin from './utils/theme'
import { traverse } from './utils/util'

// 菜单数据项默认映射
const menuDefaultProp = {
  id: 'id',
  text: 'text',
  icon: 'icon',
  children: 'children',
  group: 'group',
  route: 'route'
}

// NavTabs组件默认参数
const defaultTabOptions = {
  store: 'XdhAdminTabs',
  router: false
}

/**
 * 根据菜单项目路径查找到数据项
 * @param {Array} data 菜单数据
 * @param {Array} path 菜单项目路径, el-menu select事件回调参数 indexPath
 * @param {Object} prop 数据项字段映射
 * @return {*}
 */
const findItem = function (data, path, prop) {
  if (data && data.length > 0 && path && path.length > 0) {
    let array = data
    let item = null
    path.forEach(id => {
      item = array.find(n => n[prop.id].toString() === id.toString())
      if (item) {
        array = item[prop.children] || []
      }
    })
    return item
  }
  return null
}

export default {
  mixins: [themeMixin()],
  components: {
    Breadcrumb,
    Header,
    Layout,
    MenuToggle,
    NavTabs
  },
  props: {
    // 小导航类型，支持 navTab / breadcrumb
    navType: {
      type: String,
      default: 'tab',
      validator () {
        return ['tab', 'breadcrumb', 'none']
      }
    },
    // 左侧菜单栏宽度
    menuWidth: {
      type: String,
      default: '250px'
    }
  },
  data () {
    return {
      info: data.info,
      footer: true, // 是否显示底部
      fixed: true, // 高度固定100%适应
      footerInMain: true, // 底部放入main里面
      fixedWidth: false, // 内容区域宽度固定
      sidebar: true, // 是否显示侧边栏
      collapsible: true, // 左侧菜单栏能否折叠
      menuCollapsed: false,
      menuActive: null,
      data: data,
      tabs: {
        router: true,
        store: 'docsTabs',
        label: '首页',
        name: '/',
        icon: 'iconfont icon-home',
        closable: false
      },
      menu: {
        data: data.nav[0].items
      },
      header: {
        navRouter: true,
        navDefaultActive: '',
        layout: 'logo,title,nav,->,user,tool',
        nav: data.nav,
        userIcon: 'iconfont icon-exit',
        userText: '系统退出',
        ...data.info
      }
    }
  },
  computed: {
    color: {
      get () {
        return this.$store.state.uiTheme.color
      },
      set (val) {
        this.$store.commit('uiTheme/change', val)
      }
    },
    menuOptions () {
      return {
        collapsed: this.menuCollapsed,
        defaultActive: this.menuActive,
        router: true,
        uniqueOpened: true,
        props: { id: 'path', text: 'text', icon: 'icon', children: 'children', group: 'group' },
        ...this.menu
      }
    },
    headerOptions () {
      return {
        navDefaultActive: this.headerNavActive,
        ...this.header
      }
    },
    westOptions () {
      return {
        width: this.menuCollapsed ? '64px' : this.menuWidth
      }
    },
    northOptions () {
      const map = {
        'default': '60px',
        'large': '80px',
        'small': '50px'
      }
      return {
        height: map[this.headerOptions.size || 'default']
      }
    },
    tabsOptions () {
      return {
        ...defaultTabOptions,
        ...this.tabs

      }
    },
    bodyClasses () {
      return {
        'is-fixed-width': this.fixedWidth,
        'has-tab': this.navType !== 'none'
      }
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (val) {
        const category = val.split('/')[1]
        var itemData = data.nav[0].items
        for (let i = 0, len = data.nav.length; i < len; i++) {
          if (data.nav[i].code === category) {
            itemData = data.nav[i].items
            break
          }
        }
        this.menu.data = itemData

        // 路由切换，router-view内容滚动到顶部
        this.$refs.body && (this.$refs.body.scrollTop = 0)

        // NavTabs是路由模式
        const tab = this.tabsOptions
        if (tab.router) {
          const prop = { ...menuDefaultProp, ...this.menuOptions.props }
          const item = traverse(this.menuOptions.data, true, n => n[prop.id] === val)
          if (item) {
            this.$nextTick(() => {
              this.pushTab(item, tab.store, prop)
            })
          }
        }
        if (this.menuOptions.router) this.menuActive = val
        if (this.headerOptions.navRouter) this.headerNavActive = val
      }
    }
  },
  methods: {
    pushTab (item, store = defaultTabOptions.store, prop = menuDefaultProp) {
      this.$store.commit(`${store}/push`, {
        tab: {
          label: item[prop.text],
          icon: item[prop.icon],
          name: item[prop.id].toString(),
          closable: true
        }
      })
    },
    handleSidebarSwitch () {
      this.menuCollapsed = !this.menuCollapsed
      /**
       * 侧边栏折叠切换时触发
       * @event sidebar-switch
       * @param {boolean} collapsed 是否折叠
       */
      this.$emit('sidebar-switch', this.menuCollapsed)
    },
    handleMenuSelect (index, path) {
      // 菜单数据属性字段映射
      const prop = { ...menuDefaultProp, ...this.menuOptions.props }
      // 根据点击的当前菜单项目，获取菜单节点的数据
      const item = findItem(this.menuOptions.data || [], path, prop)
      // NavTabs实例化参数
      const tab = this.tabsOptions
      // 非路由模式时，把点击的菜单项目加入到navTabs
      if (this.tabs && !tab.router) {
        this.pushTab(item, tab.store, prop)
      }
      /**
       * 左侧菜单点击时触发
       * @event menu-select
       * @param {string} index 菜单的key
       * @param {String[]} path 菜单路径
       * @param {object} item 菜单项数据
       */
      this.$emit('menu-select', index, path, item)
    },
    onNavSelect (index, path) {
      /**
       * 头部菜单点击时触发
       * @event header-nav-select
       * @param {string} index 菜单的key
       * @param {String[]} path 菜单路径
       */
      this.$emit('header-nav-select', index, path)
    },
    onSearch (keyword, type) {
      /**
       * 头部点击搜索时触发
       * @event header-search
       * @param {string} keyword 关键字
       * @param {String} type 搜索类型
       */
      this.$emit('header-search', keyword, type)
    },
    onToolClick (item) {
      /**
       * 头部工具按钮点击时触发
       * @event header-tool-click
       * @param {object} item 项数据
       */
      this.$emit('header-tool-click', item)
    },
    onTabRemove (name, selected) {
      /**
       * navtabs 删除时触发
       * @event tab-remove
       * @param {string} name tab名称
       * @param {string} selected 将要切换到的tab名称
       */
      this.$emit('tab-remove', name, selected)
    },
    onTabClick (item) {
      /**
       * navtabs 点击时触发
       * @event tab-click
       * @param {object} item tab实例
       */
      this.$emit('tab-click', item)
    }
  }
}
</script>

<style lang="scss">
@import "./style/vars";

.xdh-layout--fixed {
  .xdh-admin__main {
    position: absolute;
    left: 0;
    top: 0;
  }
}

.xdh-admin {
  > .xdh-layout__north {
    background: $--color-primary;
  }
  > .xdh-layout__south {
    background: $--background-color-base
  }
  min-height: 100%;
  min-width: 1200px !important;
  overflow: hidden;
  &__header.is-fixed-width {
    max-width: 1200px;
    margin: auto;
  }
  &__main {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  &__body {
    height: 100%;
    &.has-tab {
      height: calc(100% - 31px);
      overflow: auto;
    }
    &.is-fixed-width {
      max-width: 1200px;
      margin: auto;
    }
  }

  &__tabs {
    transform: translateX(-1px);
    border-right: 1px solid $--color-primary-light-9;
  }

  &__footer {
    background: $--background-color-base;
    height: 100%;
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    color: $--color-info;
    &.is-fixed-width {
      max-width: 1200px;
      margin: auto;
    }
  }
  &__sidebar {
    height: 100%;
    background: $--color-primary-light-9;
    position: absolute;
    width: 100%;
  }

  &__switch {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    padding: 5px 0;
    background: $--color-primary-light-7;
    cursor: pointer;
    color: $--color-primary-light-2;
    border-bottom: 1px solid $--color-primary-light-6;
    &:hover {
      background: $--color-primary-light-6;
    }
    .iconfont {
      transition: transform 0.3s;
      display: inline-block;
      &.is-collapsed {
        transform: rotate(90deg);
      }
    }
  }

  &__menu {
    &.collapsible {
      height: calc(100% - 31px);
    }
    .el-menu {
      background: transparent;
    }
    .el-menu-item:hover, .el-submenu .el-submenu__title:hover {
      background: $--color-primary-light-8;
    }
    .el-submenu.is-active .el-submenu__title, .el-submenu.is-active .el-submenu__title i {
      color: $--color-primary;
    }
    .el-menu-item.is-active {
      background: $--color-primary-light-8;
    }
    .el-menu-item-group__title {
      color: $--color-info;
    }
    .el-submenu__title {
      height: 50px;
      line-height: 50px;
    }
    .el-menu-item {
      height: 50px;
      line-height: 50px;
    }
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
    }

  }

  &__breadcrumb {
    border-bottom: 1px solid $--border-color-base;
  }

  &__popper {
    .el-menu {
      background: $--color-primary-light-9;
    }
    .el-menu-item:hover, .el-submenu .el-submenu__title:hover {
      background: $--color-primary-light-8;
    }
    .el-submenu.is-active .el-submenu__title, .el-submenu.is-active .el-submenu__title i {
      color: $--color-primary;
    }
    .el-menu-item.is-active {
      background: $--color-primary-light-8;
    }
    .el-menu-item-group__title {
      color: $--color-info;
    }
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }

}

.main {
  padding: 20px;
}
.sys-theme {
    margin-top: 13px;
    margin-left: 10px;
    display: inline-block;
    .el-color-picker__trigger {
      background: #fff;
    }
  }
</style>
