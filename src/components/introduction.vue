<template>
  <div class="in_container">
    <div class="header">
      <van-nav-bar :title="isMaster ? userInfoList.userName : actorInfoList.userName">
        <template #right>
          <van-icon v-if="showSetting" name="revoke" size="18" />
        </template>
      </van-nav-bar>
      <div class="img_blur"></div>
    </div>
    <div class="human">
      <div class="headImg">
        <img v-if="userInfoList.headImg" :src="userInfoList.headImg" alt="" />
        <img v-else src="../../assets/img/emptyImg.jpg" alt="" />
      </div>

      <div class="followList">
        <div class="follows">
          Follows: <strong @click="openFollowList(0)">{{ followsList.length }}</strong>
        </div>
        <div class="fans">
          Fans: <strong @click="openFollowList(1)">{{ fansList.length }}</strong>
        </div>
      </div>
      <!-- 个人设置 -->
      <div v-if="showSetting" class="setting">
        <van-button type="primary" plain block>个人设置 </van-button>
      </div>
      <!-- 关注按钮 -->
      <div v-else class="setting" @click="letFollow">
        <van-button v-if="!isFollowed" type="primary" plain block>关注 </van-button>
        <van-button v-else type="primary" plain block>取消关注 </van-button>
      </div>
      <div class="profile">{{ isMaster ? userInfoList.profile : actorInfoList.profile }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject } from '@vue/runtime-core'
import userInfo from '../hook/userInfo'
import followInfo from '../hook/followInfo'
import router from '../router'
import { formatDateTime } from '../hook/util'
import { Toast } from 'vant'

export interface userInfoItem {
  userName: string
  userPwd: string
  sex: string
  phone: string
  email: string
  profile: string
  headImg: string
}

export default defineComponent({
  name: 'Introduction',
  setup() {
    const actor = inject('actor')
    // 是否是当前用户
    const isMaster = actor === window.localStorage.getItem('userName') ? 1 : 0
    // 是否显示设置按钮
    const showSetting = ref(false)
    showSetting.value = isMaster ? true : false
    const { userInfoList, actorInfoList, editUserInfo } = userInfo(actor as string)
    const { followsList, fansList, isFollowed, postFollow, deleteFollow } = followInfo(actor as string)
    // 设置弹框
    const drawer = ref(false)
    // 关注粉丝弹框
    const followDrawer = ref(false)
    // 展示关注列表(true，false则展示粉丝列表)
    const isFollowList = ref(true)
    const form = reactive({
      name: '',
      sex: '',
      phone: '',
      email: '',
      profile: '',
      headImg: '',
    })
    const imageUrl = ref('')
    // 上传凭证
    const uploadToken = ref('')
    // 退登
    const logout = () => {
      window.localStorage.clear()
      router.push({ name: 'Home' })
    }
    // 关注/取关用户
    const letFollow = () => {
      if (!isFollowed.value) {
        postFollow({
          followName: actor as string,
          fansName: localStorage.getItem('userName') as unknown as string,
          followTime: formatDateTime(new Date()),
        })
        isFollowed.value = !isFollowed.value
      } else {
        deleteFollow({
          followName: actor as string,
          fansName: localStorage.getItem('userName') as unknown as string,
        })
        isFollowed.value = !isFollowed.value
      }
    }
    // 打开关注列表
    const openFollowList = (type: number) => {
      followDrawer.value = true
      if (type) {
        isFollowList.value = false
      } else {
        isFollowList.value = true
      }
    }
    // 在关注列表取关
    const onUnfollow = (index: number) => {
      deleteFollow({
        followName: followsList[index].followName as string,
        fansName: localStorage.getItem('userName') as unknown as string,
      })
    }
    // 在关注列表打开用户主页
    const goSpace = (actor: string) => {
      router.push({ name: 'MySpace', query: { actor: actor } })
    }

    const handleAvatarSuccess = (file: { url: string }) => {
      imageUrl.value = file.url
    }
    const beforeAvatarUpload = (file: { type: string; size: number }) => {
      const fileType = file.type
      // const current = new Date().getTime()
      // const key = `image_${current}`
      const isJPG = fileType === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        Toast.fail('Avatar picture must be JPG format!')
        return isJPG
      }
      if (!isLt2M) {
        Toast.fail('Avatar picture size can not exceed 2MB!')
        return isLt2M
      }
    }
    const onCancel = () => {
      drawer.value = false
    }
    const onSubmit = () => {
      editUserInfo({
        userName: userInfoList.userName,
        userPwd: userInfoList.userPwd,
        sex: userInfoList.sex,
        phone: userInfoList.phone,
        email: userInfoList.email,
        profile: userInfoList.profile,
        headImg: imageUrl.value,
      })
      drawer.value = false
      Toast.success('Your information has been changed :)')
    }

    return {
      actor,
      isMaster,
      showSetting,
      isFollowed,
      isFollowList,
      userInfoList,
      actorInfoList,
      drawer,
      followDrawer,
      followsList,
      fansList,
      form,
      imageUrl,
      uploadToken,
      logout,
      letFollow,
      openFollowList,
      onUnfollow,
      goSpace,
      handleAvatarSuccess,
      beforeAvatarUpload,
      onCancel,
      onSubmit,
    }
  },
})
</script>

<style lang="scss">
.in_container {
  .header {
    position: relative;
    overflow: hidden;
    .img_blur {
      width: 100%;
      height: 170px;
      background-image: url(../assets/img/ld.jpg);
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.2);
      -webkit-filter: blur(5px) brightness(55%);
      filter: blur(5px) brightness(55%);
    }
  }
  .human {
    position: absolute;
    top: 13%;
    left: 5%;
    color: #eee;
    .headImg {
      float: left;
      margin-right: 20px;
      > img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
    }
    .name {
      float: left;
      font-size: 20px;
      margin-top: 10px;
    }
    .followButton {
      float: left;
      margin-left: 20px;
      margin-top: 10px;
      .nofollow {
        color: rgba(#fcfcfc, 0.8);
        background-color: rgba(#000, 0.5);
        border-color: rgba(#fcfcfc, 0.8);
      }
      .isfollow {
        color: rgba(#fcfcfc, 0.8);
        background-color: rgba(pink, 0.5);
        border-color: rgba(#fcfcfc, 0.8);
      }
    }
    .followList {
      margin-left: 90px;
      font-size: 10px;
      color: rgba(#eee, 0.9);
      .follows {
        float: left;
      }
      .fans {
        overflow: hidden;
        padding-left: 30px;
      }
      strong {
        padding: 0 5px;
        text-decoration: underline;
        font-weight: normal;
      }
    }
    .setting {
      margin-top: 15px;
      margin-left: 80px;
      .van-button {
        width: 220px;
        height: 25px;
        font-size: 10px;
        color: rgba(#fcfcfc, 0.8);
        background-color: rgba(#000, 0.5);
        border-color: rgba(#fcfcfc, 0.6);
      }
    }
    .profile {
      margin-top: 15px;
      margin-left: 90px;
      font-size: 10px;
    }
  }
}
</style>
