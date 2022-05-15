<template>
  <van-row v-if="cardList.length" class="card_container" gutter="1">
    <van-col v-for="(item, index) in cardList" :key="index" :span="8" style="margin-top: 2px">
      <div class="pic" @click="openBlog(item)">
        <img v-if="item.picture[0]" :src="item.picture[0]" alt="" />
        <img v-else src="../assets/img/ld.jpg" alt="" />
      </div>
    </van-col>
  </van-row>
  <div v-else class="empty">Nothing here :)</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@vue/runtime-core'
import blogInfo from '../hook/blogInfo'
import blogByName from '../hook/blogByName'
import blogByTitle from '../hook/blogByTitle'
import likeInfo from '../hook/likeInfo'
import router from '../router'

export interface blogInfoItem {
  _id?: string
  blogId?: string
  title: string
  actor: string
  date: string
  content: string
  picture: string[]
}

export default defineComponent({
  name: 'Card',
  props: {
    // 判断展示card的情况（0：全部，1：当前用户，2：搜索title，3：搜索actor, 4：点赞列表)
    cardState: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const actor = inject('actor')
    // 判断是否是从like界面进入
    const isLike = ref(false)
    // reactive无法获取proxy中数据
    const cardList = ref<blogInfoItem[]>([])
    // 展示全部blog
    if (props.cardState === 0) {
      const { blogInfoList } = blogInfo()
      cardList.value = blogInfoList
      // 展示当前用户blog
    } else if (props.cardState === 1) {
      const { actorBlogList } = blogByName(actor as string)
      cardList.value = actorBlogList
      // 展示搜索title blog
    } else if (props.cardState === 2) {
      const searchTitle = inject('searchTitle')
      const { titleBlogList } = blogByTitle(searchTitle as string)
      cardList.value = titleBlogList
      // 展示搜索actor title
    } else if (props.cardState === 3) {
      const searchActor = inject('searchActor')
      const { actorBlogList } = blogByName(searchActor as string)
      cardList.value = actorBlogList
      // 展示用户点赞列表
    } else if (props.cardState === 4) {
      const { userLikeList } = likeInfo(window.localStorage.getItem('userName') as string)
      cardList.value = userLikeList
      isLike.value = true
    }
    // 展示blog内容
    const openBlog = (item: blogInfoItem) => {
      if (!isLike.value) {
        router.push({ name: 'BlogDetails', query: { _id: item._id } })
      } else {
        router.push({ name: 'BlogDetails', query: { _id: item.blogId } })
      }
    }
    return { actor, isLike, cardList, openBlog }
  },
})
</script>

<style lang="scss" scoped>
.card_container {
  background-color: #fcfcfc;
  margin: 5px;
  cursor: pointer;
  .pic {
    width: 120px;
    height: 120px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.empty {
  display: flex;
  background-color: #fcfcfc;
  color: #505153;
  width: 100%;
  height: 380px;
  align-items: center;
  justify-content: center;
}
</style>
