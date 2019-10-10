import Vue from 'vue'
import Router from 'vue-router'
import Frame from './frame/ElFrame.vue'
import { traverse } from './frame/utils/util'
import data from './frame/config'
Vue.use(Router)

function getComponent (item) {
  let component
  if (item.children && item.children.length > 0) {
    component = () => import('./views/404.vue')
  } else {
    component = () => import(`./views${item.path}.vue`)
  }
  return component
}

function createRoutes () {
  let routes = []
  for (let i = 0, len = data.nav.length; i < len; i++) {
    traverse(data.nav[i].items, false, function (item) {
      routes.push({ path: item.path, component: getComponent(item) })
    })
  }
  return routes
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Frame,
      children: [
        {
          path: '',
          component: () => import('./views/index.vue')
        },
        ...createRoutes()
      ]
    }
  ]
})
