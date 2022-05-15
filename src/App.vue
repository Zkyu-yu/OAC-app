<template>
  <div class="container">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/about" icon="eye-o">About Us</van-tabbar-item>
      <van-tabbar-item replace to="/blog" icon="home-o">Blog</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">Search</van-tabbar-item>
      <van-tabbar-item replace to="/mySpace" icon="user-o">My Space</van-tabbar-item>
    </van-tabbar>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ref } from 'vue';
import router from './router';

export default defineComponent({
  setup() {
    const active = ref(0)
    // 路由初始化
    if (router.currentRoute.value.path === '/') {
      router.push('/blog');
    }
    
    return { active }
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