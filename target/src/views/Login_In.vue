<template>
  <div class="login">
    <div class="login-box">
      <div style="flex: 1;display: flex">
        <img src="../assets/green.jpg" style="width: 100%">
      </div>
      <div style="flex:1">
        <el-form :rules="rules" :model="user" >
          <div style="font-size: 20px; font-weight: bold; text-align: center;margin-bottom:18px">登录BOYBOY!后台系统吧</div>

          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" v-model="user.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" show-password size="medium" v-model="user.password"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display:flex">
              <el-input v-model="user.code" prefix-icon="el-icon-monitor" size="medium" style="flex: 1;"></el-input>
              <div class="validCode">
                <validCode ref="getValidcode"></validCode>
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button @click="login()"  style="margin-top:16px;width: 100%">登录</el-button>
          </el-form-item>
          <div style="display: flex;">
            <div style="flex: 1">还没有账号？请<span @click="toRegister" style="color:#0f9876;cursor: pointer">注册</span></div>
            <div style="flex: 1;text-align: right"><span style="color: #0f9876">忘记密码</span></div>
            
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import validCode from '@/components/validCode.vue'
import axios from 'axios';
export default {
  name: 'Login_In',
  components: {
    validCode
  },
  computed:{
    CodeData(){
      return this.$refs.getValidcode._data.codes.join("")
    }
  },
  data(){
    //定义验证码的校验格式
    var validatecode = (rule,value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (this.user.code != this.CodeData) {
        callback(new Error('输入的验证码不正确'))
      }else{
      callback();
      }
      }
    return {
      user:{
        username: '',
        password: '',
        code:''
      },
      rules: {
        username: [
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' },

        ],
        code: [
          { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' },
          { validator: validatecode, trigger: 'blur' }
        ],
        password: [
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        
      },
      
      
    }
  },
  methods: {
    login(){
      axios.post('api/login/news', {
        username: this.user.username,
        password: this.user.password,
        code: this.user.code
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 200 && this.user.code === this.CodeData) {
          this.$cookies.set('token', { token:res.data.token } )
          this.$cookies.set('user', res.data.data)
          this.$router.push('/home/HelloWord')
          this.$message({
            message: '登录成功',
            type: 'success'
          });
        }
      })
    },
    //接收子组件的值
    // getValidcode(data){
    //     console.log('收到了子组件的值了',data);
    // },
    toRegister(){
      this.$router.push('/register')
    }
  },
  mounted(){
    // console.log(this.user.code);
    // console.log(this.$refs.getValidcode._data.codes.join());
    console.log(this.CodeData);
    
  }
}
</script>
<style scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(8, 208, 159,1)
}
.login-box{
  display: flex;
  background-color: #fff;
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
}
.el-form{
  margin: 85px 15px;
  
}
.s-canvas {
  display: flex;
  justify-content: center;
}
.validCode{
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 1px;
  
}
  .el-button--default{
  background-color: #46eac2 !important;
  border-color: #46eac2 !important;
}
</style>
