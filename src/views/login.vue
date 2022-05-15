<template>
  <div class="container">
    <van-nav-bar fixed :title="isLogin ? '登录' : '注册'">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <div class="title">{{ isLogin ? 'Login' : 'Create Account' }}</div>
    <van-form v-if="isLogin" @submit="login">
      <van-cell-group inset>
        <van-field
          v-model="loginUser.userName"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginUser.userPwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit"> Login </van-button>
        <div class="create" @click="isLogin = false">没有账号？</div>
      </div>
    </van-form>

    <van-form v-else @submit="register">
      <van-cell-group inset>
        <van-field
          v-model="loginUser.userName"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginUser.userPwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="loginUser.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="loginUser.phone"
          name="联系方式"
          label="联系方式"
          placeholder="联系方式"
          :rules="[{ required: true, message: '请填写联系方式' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit"> Create Account </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ref } from 'vue'
import router from '../router'
import loginRegister from '../hook/loginRegister'

export default defineComponent({
  name: 'Login',
  setup() {
    const { userLogin, userRegister } = loginRegister()
    const isLogin = ref(true)
    const loginUser = ref({ userName: '', userPwd: '' })
    const registerUser = ref({ userName: '', userPwd: '', email: '', phone: '' })
    const login = () => {
      userLogin(loginUser.value)
    }
    const register = () => {
      userRegister(registerUser.value)
    }
    // 返回
    const onClickLeft = () => {
      if (isLogin.value) {
        router.push({ name: 'Blog' })
      } else {
        isLogin.value = true
      }
    }
    return { isLogin, loginUser, registerUser, onClickLeft, login, register }
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f2f2f2;
  .van-nav-bar {
    .van-icon {
      color: #505153;
    }
  }
  .title {
    padding-top: 150px;
    font-size: 36px;
    font-family: 'Coda';
    line-height: 1.5;
    text-align: center;
    margin-bottom: 30px;
    color: #505153;
  }
  .van-form {
    margin-top: 40px;
  }
  .van-button {
    font-family: 'Coda';
    border-radius: 5px;
  }
  .create {
    float: right;
    color: #505153;
    margin-top: 10px;
  }
}
</style>
