<template>
  <div class="login-container">
    <div class="login-bg">
      <img src="../../assets/login_title.png" alt="">
    </div>
    <!-- <img class="login-bg" src="../../assets/login_bg.png" alt=""> -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item class="input-container" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item class="input-container" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="login-btn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { sha1 } from '@/libs/sha1'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
      // callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
      // callback()
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginForms: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForms.username = this.loginForm.username
          this.loginForms.password = sha1(this.loginForm.password)
          this.$store.dispatch('user/login', this.loginForms).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch((error) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>



<style lang="less" scoped>
// $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  // background-color: $bg;
  overflow: hidden;
  .login-bg{
    min-width: 1080px;
    max-height: 100%;
    background-image: url('../../assets/login_bg.png');
    display: flex;
    align-items: center;
    justify-content: center;
    // height: 1080px;
    img{
      width: 641px;
      height: 350px;
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 200px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin-right: 10px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #304156;
      margin: 0px auto 0px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
.input-container{
  display: flex;
  // align-items: center;
}
/deep/ .el-form-item__content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  max-width: 500px;
  border-bottom: 1px solid #304156;
  margin-top: 46px;
}
/deep/ .el-input__inner{
  background: #ffffff !important;
  border: none;
  border-radius: 0;
}
/deep/ input:-internal-autofill-selected{
  background-color: #FFFFFF!important;
}
.login-btn{
  width: 300px!important;
  max-width: 460px !important;
  height: 60px;
  margin: 0 auto;
  background: #304156;
  border-radius: 40px;
  margin-top: 74px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 35px;
  letter-spacing: 2px;
  }
</style>
