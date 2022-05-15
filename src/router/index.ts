import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    meta: { index: 0 },
    component: () => import(/* webpackChunkName: "About" */ '../views/about.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: { index: 0 },
    component: () => import(/* webpackChunkName: "Blog" */ '../views/blog.vue'),
  },
  {
    path: '/mySpace',
    name: 'MySpace',
    meta: { index: 0 },
    component: () => import(/* webpackChunkName: "MySpace" */ '../views/mySpace.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    meta: { index: 0 },
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue'),
  },
  {
    path: '/blogDetails',
    name: 'BlogDetails',
    meta: { index: 1 },
    component: () => import(/* webpackChunkName: "BlogDetails" */ '../views/blogDetails.vue'),
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    meta: { index: 1 },
    component: () => import(/* webpackChunkName: "SearchResult" */ '../views/searchResult.vue'),
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
