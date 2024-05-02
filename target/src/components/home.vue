<template>
    <div>
        <el-container>

            <!-- 侧边栏 -->
            <el-asize style="background-color:#001529;height:100hv;  box-shadow: 2px 0 6px rgba(0,21,41,.35) ">
                <div
                    style="height: 60px;color:white; display:flef; align-items:center; justify-content:center;text-align:center;line-height:57px">
                    <img alt="哈尔滨广厦学院" style="width: 50px;border-radius:50% " :src="backgroundImgUrl">
                    <span class="boy" v-if="!isCollapse">BOYBOY!</span>
                </div>
                <!-- default-active为激活当前的index,也就是鼠标移到此处高亮。加入router点击跳转 -->
                <el-menu :collapse-transition="false" :collapse="isCollapse" router background-color="#001529"
                    text-color="rgba(255,255,255,0.65)" active-text-color="#ffd04b" style="border: none"
                    :default-active="$route.path">
                    <!-- 对应上边的解释，只对一级菜单有效 -->
                    <el-menu-item index="/home/HelloWord">
                        <template>
                            <i class="el-icon-house" @click="handleCollapse"></i>
                            <span>系统首页</span>
                        </template>
                    </el-menu-item>


                    <!-- 副目录 -->
                    <el-submenu index="">
                        <template slot="title">
                            <i @click="handleCollapse" class="el-icon-menu"></i>
                            <span>信息管理</span>
                        </template>

                        <el-menu-item index="/home/User" class="el-menu-user">用户信息</el-menu-item>
                        <el-menu-item v-if="authority.auth === '管理员'" class="el-menu-guan"
                            index="/home/Manage">管理员信息</el-menu-item>
                    </el-submenu>
                    <!-- 副目录 -->
                    <el-submenu index="">
                        <template slot="title">
                            <i @click="handleCollapse" class="el-icon-menu"></i>
                            <span>社团管理</span>
                        </template>

                        <el-menu-item index="" class="el-menu-user">社团成员信息</el-menu-item>
                        <el-menu-item index="" class="el-menu-guan">社团管理员信息</el-menu-item>
                    </el-submenu>

                </el-menu>

            </el-asize>
            <!-- 主体 -->
            <el-container>
                <!-- 主体-头 -->
                <el-header>
                    <i style="font-size: 26px;" @click="handleCollapse" :class="iconHeader"><span
                            style="margin-left: 5px; "></span></i>

                    <!-- 面包屑 -->
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path: $route.path}">{{$route.meta.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <!-- 用户logo -->
                    <div class="el-dropdown-div">
                        <!-- 下拉弹出框 -->
                        <el-dropdown placement="bottom">
                            <div curson:default class="el-dropdown-logo">
                                <img style="width: 40px;height: 40px;border-radius:50% " :src="backgroundImgUr2" alt="logo">
                                <span>{{ authority.auth}}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="toPerson">个人信息</el-dropdown-item>
                                <el-dropdown-item @click.native="toPassword">修改密码</el-dropdown-item>
                                <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <!-- 主体-部分 -->
                <el-main>
                    <!-- 接收子组件的数据 -->
                    <router-view @updata:user="updataUser" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            //默认不收缩
            isCollapse: 'false',
            // asideWidth:'202px',
            backgroundImgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            backgroundImgUr2: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            iconHeader:'el-icon-s-unfold',
            user: this.$cookies.get('user') || '{}'
        }
    },
    methods: {
        //person组件传递过来的数据
        updataUser(data){
            this.backgroundImgUr2 = data
            this.backgroundImgUrl = data
            console.log('我接收了数据',data);
        },
        handleCollapse(){
            this.isCollapse = !this.isCollapse;
            this.iconHeader = this.isCollapse ? 'el-icon-s-fold ' :'el-icon-s-unfold'
        },
        //退出登录的方法
        outLogin(){
            let token = this.$cookies.get('token') 
            // console.log(token);
            if(token){
                this.$cookies.remove('token')
                this.$cookies.remove('user')
                this.$router.push('/')
            }else{
                this.$router.push('/home/HelloWord')

            }
        },
        //去到个人信息
        toPerson(){
            this.$router.push('/home/person')
        },
        //去修改页面
        toPassword(){
            this.$router.push('/home/Password')
        }
    },
    mounted(){
        // console.log(this.$cookies.get('user'));
        console.log('sdj',this.$route);

    },
    computed:{
        authority(){
            let authority = this.$cookies.get('user') 
            return authority
        }
    }
}
</script>


//
<style scoped lang="less">
    .el-menu--inline .el-menu-item {
        // background-color: #000c17 !important;
        padding-left: 51px !important;
    }
    .el-submenu__title:hover span, .el-submenu__title:hover i,.el-menu-item:hover i ,
    .el-menu-item:hover span,.el-menu-item:hover  {
        color: #fff !important;
    }
    .el-menu-item is-active {
        // background-color: rgba(0, 21, 41) !important;
        border-radius: 5px !important;
        // margin: 4px !important;
    }
    .el-menu-item{
        height: 40px !important;
        line-height: 40px !important;
        margin:3px !important;
    }
    .el-menu__title{
        height: 40px !important;
        line-height: 40px !important;
    }
    // 修改element的样式加入/deep/
    /deep/.el-submenu__title{
        padding-left: 23px !important;
    }
    /deep/.el-submenu .el-menu-item {
        padding: 0 45px;
        min-width: 196px;
    }
    .boy{
        margin-left: 5px;
        position: relative;
        top: -18px;
        left: 0;
        transition: all .3s;
    }
    .el-header{
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    display: flex;
    align-items: center;
    // justify-content: space-between;
    }
    .el-breadcrumb {
        font-size: 15px;
    }
    .el-dropdown-logo {
        display: flex;
        align-items: center;
        
    }
    .el-dropdown {
        font-size: 16px;
    }
    .el-dropdown-div{
       flex: 1;
       display: flex;
       align-items: center;
       justify-content: flex-end;
    }
    .el-card{
    // width: 690px;
        width:100%;
        margin-top: 10px;
    }
    .el-main-box{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap
    }


</style>
