<template>
  <div class="space_container">
    <Introduction></Introduction>
    <div v-if="showTab" class="tabs">
      <ul>
        <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">Blog</li>
        <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">Like</li>
      </ul>
    </div>
    <div class="mainContent">
      <Card v-if="activeTab === 1" :card-state="1"></Card>
      <Card v-if="activeTab === 2" :card-state="4"></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Introduction from '../components/introduction.vue'
import Card from '../components/card.vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'MySpace',
  components: {
    Introduction,
    Card,
  },
  setup() {
    const activeTab = ref(1)
    const actor = window.localStorage.getItem('userName')
    console.log(actor)

    provide('actor', actor)
    // 不是当前用户不显示tab
    const showTab = ref(false)
    showTab.value = actor === window.localStorage.getItem('userName') ? true : false

    return { activeTab, actor, showTab }
  },
})
</script>

<style lang="scss" scoped>
.space_container {
  width: 100%;
  .tabs {
    position: absolute;
    top: 190px;
    left: 50%;
    transform: translate(-36%);
    color: #fcfcfc;
    ul li {
      float: left;
      list-style: none;
      height: 30px;
      line-height: 30px;
      margin-right: 30px;
      margin-bottom: 5px;
      font-size: 12px;
      font-family: 'Coda';
      &:hover {
        color: #fff;
        font-weight: 600;
      }
    }
    ul .active {
      text-decoration: underline;
    }
  }
}
</style>
