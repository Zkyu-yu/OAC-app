<template>
  <div class="search_container">
    <van-nav-bar fixed title="搜索" />
    <van-cell-group inset>
      <van-field v-model="searchInput" placeholder="Search...">
        <template #button>
          <van-icon name="search" size="16" @click="goSearch"></van-icon>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 根据标题查找 -->
    <div class="atTitle" @click="atTitle">
      <div class="button" :style="{ background: onAtTitle ? '#232323' : '' }"></div>
      <div class="word" :style="{ color: onAtTitle ? '#232323' : '' }">title</div>
    </div>
    <!-- 根据用户查找 -->
    <div class="atActor" @click="atActor">
      <div class="button" :style="{ background: onAtActor ? '#232323' : '' }"></div>
      <div class="word" :style="{ color: onAtActor ? '#232323' : '' }">actor</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Toast } from 'vant'
import { ref } from 'vue'
import router from '../router'

export default defineComponent({
  name: 'Search',
  setup() {
    const searchInput = ref('')
    const onAtTitle = ref(false)
    const onAtActor = ref(false)
    const showResult = ref(false)
    // 根据标题查找
    const atTitle = () => {
      if (!onAtTitle.value) {
        onAtTitle.value = true
        onAtActor.value = false
      } else {
        onAtTitle.value = false
      }
    }
    // 根据用户查找
    const atActor = () => {
      if (!onAtActor.value) {
        onAtActor.value = true
        onAtTitle.value = false
      } else {
        onAtActor.value = false
      }
    }
    // 查找
    const goSearch = () => {
      if (searchInput.value === '') {
        Toast.fail('请输入搜索内容')
      } else if (onAtTitle.value) {
        router.push({ name: 'SearchResult', query: { title: searchInput.value } })
        showResult.value = true
      } else if (onAtActor.value) {
        router.push({ name: 'SearchResult', query: { actor: searchInput.value } })
        showResult.value = true
      } else {
        Toast.fail('至少选择一个')
      }
    }
    return { searchInput, onAtTitle, onAtActor, showResult, atTitle, atActor, goSearch }
  },
})
</script>

<style lang="scss" scoped>
.search_container {
  .van-cell-group {
    margin-top: 70px;
    .van-cell-group--inset {
      margin: 10px;
    }
    .van-cell {
      font-size: 7px;
      border: 1px solid #eee;
      padding: 5px;
    }
    .van-icon {
      padding-top: 5px;
    }
  }
  .atTitle,
  .atActor {
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    color: rgba(#121212, 0.5);
    font-size: 13px;
    font-family: 'Coda';
    .button {
      float: left;
      width: 9px;
      height: 9px;
      margin-top: 5px;
      border: 2px solid rgba(#121212, 0.5);
    }
    .word {
      float: left;
      margin-left: 6px;
    }
  }
  .line {
    margin: 5px 10px;
    border-bottom: 1px solid rgba(#e2e8f2, 0.8);
  }
  .searchResult {
    width: 100%;
    margin-top: 40px;
    .searchTitle {
      margin-top: 10px;
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
}
</style>
