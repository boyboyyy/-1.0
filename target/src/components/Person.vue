<template>
    <div>
        <el-card style="width: 50%;margin:auto">
            <el-form ref="form" :model="user" label-width="80px">
                <div style="text-align: center;">
                    <el-upload class="avatar-uploader" action="api/file/news" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :headers="{token:token}">
                        <img v-if="user.imgage" :src="user.imgage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div>
                    <el-form-item label="用户名:" prop="username">
                        <el-input disabled v-model="user.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:" prop="name">
                        <el-input v-model="user.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="电话:" prop="phone">
                        <el-input v-model="user.phone" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="user.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="地址:" prop="address">
                        <el-input type="textarea" v-model="user.address" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button size="medium" type="success" @click="upData">保存</el-button>
                    </el-form-item>

                </div>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Person',
    data(){
        return {
            token: this.$cookies.get('token') || '{}',
            user: this.$cookies.get('user') || '{}'
        }
    },
    mounted(){
        console.log(this.user);
    },
    methods:{
        handleAvatarSuccess(response){
            console.log(response);
            this.user.imgage = response.data
        },
        upData(){
            //保存用户修改的信息到数据库
            axios.post('api/news/person',this.user).then(res=>{
                console.log(res);
                if(res.data.status === 200){
                    //后端更新成功，更新前端。
                    this.$cookies.set('user',res.data.data)
                    this.$message.success('更新成功')
                    //传头像过去
                    this.$emit('updata:user',res.data.data.imgage)
                }else{
                    this.$message.error('更新失败')
                }
            })
        }
    }
}
</script>

<style scoped>
 .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
 }

 .avatar-uploader .el-upload:hover {
     border-color: #409EFF;
 }

 .avatar-uploader-icon {
     font-size: 28px;
     color: #8c939d;
     width: 178px;
     height: 178px;
     line-height: 178px;
     text-align: center;
 }

 .avatar {
     width: 178px;
     height: 178px;
     display: block;
    border-radius: 50%;
 }
 
 /deep/ .el-form-item__label {
    font-weight: bold;
 }
 /deep/.el-upload {
    border-radius: 50%;
 }
 .el-button--success  {
     color: #FFF;
     background-color: #67C23A !important;
     border-color: #67C23A !important;
     width: 67px;
 }
</style>

