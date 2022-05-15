<template>
  <div class="container">
    <van-tabbar v-if="isShow" v-model="active" route>
      <van-tabbar-item replace to="/about" icon="eye-o"></van-tabbar-item>
      <van-tabbar-item replace to="/blog" icon="home-o"></van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search"></van-tabbar-item>
      <van-tabbar-item replace to="/mySpace" icon="user-o"></van-tabbar-item>
    </van-tabbar>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/runtime-core'
import { ref } from 'vue'
import router from './router'

export default defineComponent({
  setup() {
    const active = ref(0)
    const isShow = ref(true)
    // 路由初始化
    if (router.currentRoute.value.path === '/') {
      router.push('/blog')
    }

    watch(
      () => router.currentRoute.value.path,
      (oldVal, newVal) => {
        if (oldVal !== newVal) {
          if (
            router.currentRoute.value.path === '/about' ||
            router.currentRoute.value.path === '/blog' ||
            router.currentRoute.value.path === '/search' ||
            router.currentRoute.value.path === '/mySpace'
          ) {
            isShow.value = true
          } else {
            isShow.value = false
          }
        }
      }
    )

    return { active, isShow }
  },
})
</script>

<style lang="scss" scoped>
.container {
  .van-tabbar {
    background: #121212;
  }
  .van-tabbar-item--active {
    color: #fff;
    background-color: #121212;
  }
}
</style>
