<template>
  <div class="container">
    <van-nav-bar fixed title="搜索结果">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <div class="searchTitle">
      Search Results for:
      <strong v-if="searchTitle">{{ searchTitle }}</strong>
      <strong v-else>{{ searchActor }}</strong>
    </div>
    <Card v-if="searchTitle" :card-state="2"></Card>
    <Card v-else :card-state="3"></Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Card from '../components/card.vue'
import router from '../router'

export default defineComponent({
  name: 'SearchResult',
  components: {
    Card,
  },
  setup() {
    const searchTitle = router.currentRoute.value.query.title
    const searchActor = router.currentRoute.value.query.actor
    provide('searchTitle', searchTitle)
    provide('searchActor', searchActor)

    // 返回
    const onClickLeft = () => history.back()

    return { searchTitle, searchActor, onClickLeft }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 40px;
  .van-nav-bar {
    .van-icon {
      color: #505153;
    }
  }
  .searchTitle {
    margin-top: 60px;
    padding-left: 20px;
    font-size: 13px;
    font-family: 'Coda';
    color: #505153;
    background-color: #fcfcfc;
    strong {
      padding-left: 10px;
      text-decoration: underline;
    }
  }
}
</style>
