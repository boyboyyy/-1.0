<template>
  <div class="login">
    <div class="login-box">
      <div style="flex: 1;display: flex">
        <img src="../assets/blue.jpg" style="width: 100%">
      </div>
      <div style="flex:1">
        <el-form :model="user" :rules="rules">
          <div style="font-size: 20px; font-weight: bold; text-align: center;margin-bottom:18px">欢迎注册BOYBOY!后台系统账号</div>

          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" v-model="user.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input prefix-icon="el-icon-lock" show-password size="medium" v-model="user.password1"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input prefix-icon="el-icon-lock" show-password size="medium" v-model="user.password2"
              placeholder="再次输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="register" type="success" >注册</el-button>
          </el-form-item>
          <div style="display: flex;">
            <div style="flex: 1">前往<span @click="toLogin" style="color:#0f9876;cursor: pointer">登录</span>页面</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Login_In',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      user: {
        username: '',
        password1: '',
        password2: ''
      },
      rules: {
        username: [
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' },
        ],
        password2: [
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur'}
        ],
        password1: [
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
      },

    }
  },
  methods: {
    register() {
      axios.post('api/register/news', {
        username: this.user.username,
        password1: this.user.password1,
        password2: this.user.password2,
      }).then(res => {
        if (res.data.status == 200){
          this.$message({
            message:'注册成功',
            type: 'success'
          })
        }
        this.$router.push('/home')
        console.log(res);
       
      })
    },
    toLogin(){
      this.$router.push('/')
    }
  },
  mounted() {
    // console.log(this.user.username);

  }
}
</script>
<style>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(15, 152, 220)
}

.login-box {
  display: flex;
  background-color: #fff;
  width: 55%;
  border-radius: 5px;
  overflow: hidden;
}

.el-form {
  margin: 85px 15px;

}

.s-canvas {
  display: flex;
  justify-content: center;
}
.el-button--success {
  color: #FFF;
  background-color: rgba(15, 152, 220) !important;
  border-color: rgba(15, 152, 220) !important;
  cursor: pointer;
  margin-top: 16px;
  width: 100%
}
</style>
