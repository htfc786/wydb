import type { RouteRecordRaw } from 'vue-router'
import IndexView from '../pages/HompPage.vue'
import Page404 from '../pages/404Page.vue'

/**
 * 路由列表
 */
export default [
  {
    // 首页
    path: '/',
    name: 'index',
    component: IndexView,
    props: true,
    meta: {
      title: '首页',
    },
  },
  {
    // abuot
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: {
      title: '关于',
      showInMenu: true,
    },
  },
  {
    // 404页面
    path: '/404',
    name: '404',
    component: Page404,
    meta: {
      title: '错误，您访问的页面不存在',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
] as RouteRecordRaw[]
