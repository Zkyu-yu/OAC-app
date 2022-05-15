<template>
  <div class="blog_container">
    <div class="header">
      <van-nav-bar left-arrow fixed :border="false" @click-left="onClickLeft">
        <template #right>
          <van-icon v-if="showSetting" name="delete-o" size="18" style="margin-right: 160px" @click="showDelete = true" />
          <van-icon v-if="showSetting" name="edit" size="18" />
        </template>
      </van-nav-bar>
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
      <div class="right">
        <div class="like">
          <van-icon name="like" />
          <div class="rightWords">like：{{ likeList.length }}</div>
        </div>
        <div class="comment">
          <van-icon name="comment" />
          <div class="rightWords">comment：{{ commentList.length }}</div>
        </div>
      </div>
    </div>
    <div :class="BlogDetail.content ? 'article' : ''">{{ BlogDetail.content }}</div>
    <div v-for="(item, index) of BlogDetail.picture" :key="index" class="picture">
      <img :src="item" alt="" />
    </div>
    <!-- 点赞按钮 -->
    <div class="getLike">
      <div @click="letStar">
        <van-icon v-if="!isLiked" name="like-o" size="48" color="rgb(215, 121, 137)" />
        <van-icon v-else name="like" size="48" color="rgb(215, 121, 137)" />
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="commentShow">
      <div v-for="(item, index) in commentList" :key="index" class="commentContainer">
        <div class="commentName">{{ item.commentName }}</div>
        <div class="commentTime">{{ item.commentTime }}</div>
        <div v-if="showSetting" class="commentDelete">
          <van-icon name="delete-o" size="12" @click="deleteCommentIndex(index)" />
        </div>
        <div class="commentContent">{{ item.commentContent }}</div>
      </div>
    </div>
    <!-- 发布评论 -->
    <div class="commentPost">
      <div class="postTitle">评论:</div>
      <van-cell-group inset>
        <van-field v-model="commentPost" rows="1" autosize type="textarea" placeholder="请输入评论" />
      </van-cell-group>
      <van-button class="cancel" plain type="default" size="small" @click="onClear">清空</van-button>
      <van-button plain color="rgb(215, 121, 137)" size="small" @click="onSubmit">发布</van-button>
    </div>
  </div>

  <!-- 删除Popup -->
  <van-popup v-model:show="showDelete" class="deletePopup" round position="bottom">
    <div class="tip">
      <van-icon name="warning" size="16" color="#A52A2A" />
      确定删除《{{ BlogDetail.title }}》吗？此操作不可逆！
    </div>
    <van-button plain type="default" size="small" @click="showDelete = false">取消</van-button>
    <van-button plain type="danger" size="small" @click="deleteThisBlog">删除</van-button>
  </van-popup>
  <!-- 删除评论Popup -->
  <van-popup v-model:show="showDeleteComment" class="deletePopup" round position="bottom">
    <div class="tip">
      <van-icon name="warning" size="16" color="#A52A2A" />
      确定删除这条评论吗？此操作不可逆！
    </div>
    <van-button plain type="default" size="small" @click="showDeleteComment = false">取消</van-button>
    <van-button plain type="danger" size="small" @click="onDelete">删除</van-button>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { onMounted, ref } from 'vue'
import { formatDateTime } from '../hook/util'
import blogInfo from '../hook/blogInfo'
import commentInfo from '../hook/commentInfo'
import likeInfo from '../hook/likeInfo'
import router from '../router'
import { Toast } from 'vant'

export default defineComponent({
  name: 'BlogDetails',
  setup() {
    // 展示删除Popup
    const showDelete = ref(false)
    // 展示删除评论Popup
    const showDeleteComment = ref(false)
    // 发布评论内容
    const commentPost = ref('')
    // 删除评论id
    const deleteCommentId = ref(0)
    const blogId = router.currentRoute.value.query._id
    const { BlogDetail, showSetting, getBlogDetail, deleteBlog } = blogInfo(blogId as unknown as string)
    const { commentList, postComment, deleteComment } = commentInfo(blogId as unknown as string)
    const { likeList, isLiked, postLike, deleteLike } = likeInfo(blogId as unknown as string)
    console.log(likeList)

    // 返回
    const onClickLeft = () => history.back()

    // 去作者主页
    const goSpace = (actor: string) => {
      router.push({ name: 'MySpace', query: { actor: actor } })
    }
    // 删除blog
    const deleteThisBlog = () => {
      deleteBlog(blogId as unknown as string)
      router.push({ name: 'Blog' })
    }
    // 点赞和取消
    const letStar = () => {
      if (!isLiked.value) {
        postLike({
          blogId: blogId as unknown as string,
          title: BlogDetail.title,
          actor: BlogDetail.actor,
          date: BlogDetail.date,
          content: BlogDetail.content,
          picture: BlogDetail.picture,
          likeName: localStorage.getItem('userName') as unknown as string,
          likeTime: formatDateTime(new Date()),
        })
        isLiked.value = !isLiked.value
      } else {
        deleteLike({
          blogId: blogId as unknown as string,
          likeName: localStorage.getItem('userName') as unknown as string,
        })
        isLiked.value = !isLiked.value
      }
    }
    // 清空评论
    const onClear = () => {
      commentPost.value = ''
    }
    // 发布评论
    const onSubmit = () => {
      if (!commentPost.value) {
        Toast.fail('评论不能为空！')
      } else {
        postComment({
          blogId: blogId as unknown as string,
          commentName: localStorage.getItem('userName') as unknown as string,
          commentTime: formatDateTime(new Date()),
          commentContent: commentPost.value,
        })
      }
    }
    // 记录删除评论id
    const deleteCommentIndex = (index: number) => {
      deleteCommentId.value = index
      showDeleteComment.value = true
    }
    // 删除评论
    const onDelete = () => {
      deleteComment(commentList[deleteCommentId.value]._id as unknown as string)
      showDeleteComment.value = false
    }
    onMounted(() => {
      getBlogDetail()
    })

    return {
      showDelete,
      showDeleteComment,
      commentPost,
      deleteCommentId,
      commentList,
      likeList,
      isLiked,
      blogId,
      showSetting,
      BlogDetail,
      onClickLeft,
      goSpace,
      deleteThisBlog,
      letStar,
      onClear,
      onSubmit,
      deleteCommentIndex,
      onDelete,
    }
  },
})
</script>

<style lang="scss">
.blog_container {
  background-color: #fcfcfc;
  .header {
    position: relative;
    overflow: hidden; // 去除白边
    .van-nav-bar {
      background: rgba(0, 0, 0, 0);
      margin-bottom: -40px;
      .van-icon {
        color: #fcfcfc;
      }
    }
    .img_blur {
      width: 100%;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.8); // 去除白边
        filter: blur(10px) brightness(45%); // 变暗模糊
      }
    }
  }
  .top {
    position: absolute;
    top: 17%;
    left: 5%;
    width: 90%;
    color: #eee;
    font-family: 'Coda';
    .mainSetting {
      float: left;
      width: 100%;
      .title {
        float: left;
        font-size: 20px;
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
    }
    .postdate {
      float: left;
      font-size: 10px;
      color: rgba(#eee, 0.8);
      margin: 12px 0 0 20px;
    }
    .right {
      float: right;
      margin-top: -10px;
      font-size: 10px;
      color: rgba(#eee, 0.8);
      line-height: 20px;
      .like,
      .comment {
        display: flex;
        align-items: center;
        .van-icon {
          margin-right: 5px;
        }
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
  .getLike {
    display: flex;
    justify-content: center;
    margin: 35px;
    .van-icon {
      padding: 4px;
      border-radius: 50%;
      border: 3px double rgb(215, 121, 137, 0.5);
    }
  }
  .commentShow {
    height: 65%;
    overflow: auto;
    .commentContainer {
      padding: 10px;
      border: 1px dashed rgba(#dcdfe6, 0.6);
      border-top: none;
      font-family: 'Coda';
      color: rgba(#505153, 0.8);
      &:first-child {
        border-top: 1px dashed rgba(#dcdfe6, 0.6);
      }
      .commentName {
        float: left;
        font-size: 12px;
        color: #505153;
      }
      .commentTime {
        float: left;
        margin-top: 2px;
        padding-left: 5px;
        font-size: 7px;
        color: rgba(#505153, 0.6);
      }
      .commentDelete {
        float: right;
      }
      .commentContent {
        margin-top: 25px;
        font-size: 10px;
        word-break: break-word;
      }
    }
  }
  .commentPost {
    font-family: 'Coda';
    color: rgba(#505153, 0.9);
    .postTitle {
      margin: 10px;
      font-size: 12px;
    }
    .van-cell-group--inset {
      margin: 10px;
    }
    .van-cell {
      font-size: 7px;
      border: 1px solid #eee;
      padding: 5px;
    }
    .van-button {
      padding: 0 20px;
      font-size: 10px;
    }
    .cancel {
      margin: 0 20px 10px 200px;
    }
  }
}
.deletePopup {
  .tip {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #121212;
    margin: 40px 35px;
    .van-icon {
      margin-right: 4px;
    }
  }
  .van-button {
    padding: 0 20px;
  }
  .van-button--default {
    margin: 0 20px 20px 180px;
  }
}
</style>
