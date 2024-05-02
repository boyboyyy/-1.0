<template>
    <div>
        <el-card style="width: 50%;margin:auto">
            <el-form ref="form" :model="user" label-width="80px">
                <div>
                    <el-form-item label="密码:" prop="username">
                        <el-input disabled v-model="user.username" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="密码验证:" prop="name">
                        <el-input v-model="user.name" placeholder="再次输入密码"></el-input>
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
export default {
    name: 'Password',
    data() {
        return {
            user:{}
        }
    },
    mounted() {
      
    },
    methods: {
      
    }
}
</script>

<style scoped>

</style>
