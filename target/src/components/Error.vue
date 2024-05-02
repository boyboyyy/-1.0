<template>
    <div style="">
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding:10px 20px; border-radius:5px;margin-bottom: 10px">

            404,页面错误。请前往<span @click="toPath" style="color:#0f9876;cursor: pointer">主页</span>
        </div>
        <div class="demo-image__lazy">
            <el-image :src='urls'></el-image>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default {
   name: 'Error',
   data(){
        return {
            urls: require('../assets/404.jpg')
        }
    },
    methods: {
        toPath(){
            this.$router.push('/home')
        }
    }
}
</script>


<style scoped >
.demo-image__lazy {
    margin: auto;

}
</style>
