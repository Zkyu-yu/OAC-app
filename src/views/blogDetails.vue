<template>
  <div class="blog_container">
    <div class="header">
      <div class="img_blur">
        <img :src="BlogDetail.picture[0]" alt="" />
      </div>
    </div>
    <div class="top">
      <div class="mainSetting">
        <div class="title">{{ BlogDetail.title }}</div>
      </div>
      <div class="actor">actor：</div>
      <div class="actor_name" @click="goSpace(BlogDetail.actor)">{{ BlogDetail.actor }}</div>
      <div class="postdate">{{ BlogDetail.date }}</div>
    </div>
    <div :class="BlogDetail.content ? 'article' : ''">{{ BlogDetail.content }}</div>
    <div v-for="(item, index) of BlogDetail.picture" :key="index" class="picture">
      <img :src="item" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { onMounted } from 'vue'
import blogInfo from '../hook/blogInfo'
import commentInfo from '../hook/commentInfo'
import likeInfo from '../hook/likeInfo'
import router from '../router'

export default defineComponent({
  name: 'BlogDetails',
  setup() {
    const blogId = router.currentRoute.value.query._id
    const { BlogDetail, showSetting, getBlogDetail } = blogInfo(blogId as unknown as string)
    const { commentList } = commentInfo(blogId as unknown as string)
    const { likeList, isLiked } = likeInfo(blogId as unknown as string)

    // 去作者主页
    const goSpace = (actor: string) => {
      router.push({ name: 'MySpace', query: { actor: actor } })
    }
    onMounted(() => {
      getBlogDetail()
    })

    return {
      commentList,
      likeList,
      isLiked,
      blogId,
      showSetting,
      BlogDetail,
      goSpace,
    }
  },
})
</script>

<style lang="scss">
.blog_container {
  background-color: #fcfcfc;
  padding-bottom: 30px;
  .header {
    position: relative;
    overflow: hidden; // 去除白边
    .img_blur {
      width: 100%;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.2); // 去除白边
        filter: blur(10px) brightness(45%); // 变暗模糊
      }
    }
  }
  .top {
    position: absolute;
    top: 17%;
    left: 5%;
    width: 60%;
    color: #eee;
    font-family: 'Coda';
    .mainSetting {
      float: left;
      width: 100%;
      .title {
        float: left;
        font-size: 20px;
      }
      .setting {
        float: left;
        margin-top: 20px;
        margin-left: 25px;
        .inIcon {
          font-size: 20px;
          cursor: pointer;
          margin-right: 20px;
        }
      }
    }

    .actor {
      float: left;
      font-size: 12px;
      margin-top: 10px;
    }
    .actor_name {
      float: left;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
    .postdate {
      float: left;
      font-size: 10px;
      color: rgba(#eee, 0.8);
      margin: 12px 0 0 20px;
    }
    .right {
      float: right;
      margin-top: 35px;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      .like,
      .comment {
        float: left;
        cursor: pointer;
        .rightWords {
          float: left;
          margin-left: 8px;
        }
        .inIcon {
          float: left;
          font-size: 17px;
          margin-top: 2px;
          margin-left: 25px;
        }
        &:hover {
          color: #eee;
        }
      }
      .like {
        margin-top: 1px;
      }
    }
  }
  .article {
    width: 40%;
    color: #aaa;
    margin: 15px auto;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    white-space: pre;
  }
  .picture {
    margin: 0 auto;
    width: 100%;
    > img {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
