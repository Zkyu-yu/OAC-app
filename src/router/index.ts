import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/about.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "Blog" */ '../views/blog.vue'),
  },
  {
    path: '/mySpace',
    name: 'MySpace',
    component: () => import(/* webpackChunkName: "MySpace" */ '../views/mySpace.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0) // 跳转定位到页面顶部
})

export default router
