<template>
    <div>
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding:10px 20px; border-radius:5px;margin-bottom: 10px">
            403，请返回<span @click="toPath" style="color:#0f9876;cursor: pointer">主页</span>
        </div>
        <div class="demo-image__lazy">
            <el-image :src='url'></el-image>
        </div>

    </div>
</template>

<script>

export default {
    name: 'MyFooter',
    data() {
        return {
            url: require('../assets/Auth.jpg')
        }
    },
    computed: {
     
    },
    methods: {
        toPath() {
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
 .el-image {
     position: relative; 
     display: inline-block; 
     left: 16%;

}
</style>