<template>
  <div class="container">
    <van-nav-bar title="发现" />
    <van-swipe :autoplay="3000" lazy-render :show-indicators="false">
      <van-swipe-item v-for="(img, index) in imgList" :key="index">
        <img class="img" :src="getImageUrl(img.img_name)" />
      </van-swipe-item>
    </van-swipe>
    <div class="title">Welcome to Online Art Community.</div>
    <div class="line"></div>
  </div>
  <Card :card-state="0"></Card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { reactive } from 'vue'
import Card from '../components/card.vue'

export default defineComponent({
  name: 'Blog',
  components: {
    Card,
  },
  setup() {
    const imgList = reactive([{ img_name: '1' }, { img_name: '2' }, { img_name: '3' }, { img_name: '4' }])
    // vite静态资源处理方法（不可用require）
    const getImageUrl = (name: string) => {
      return new URL(`../assets/img/${name}.jpg`, import.meta.url).href
    }
    return {
      imgList,
      getImageUrl,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  color: #e2e8f2;
  .img {
    width: 100%;
    height: inherit;
  }
  .title {
    position: absolute;
    top: 90%;
    left: 25%;
    transform: translate(-15%, -90%);
    font-size: 15px;
    font-family: 'Aldrich';
  }
  .line {
    margin: 5px 10px;
    border-bottom: 1px solid rgba(#e2e8f2, 0.8);
  }
}
</style>
