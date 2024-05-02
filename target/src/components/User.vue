<template>
    <div style="">
        <el-table :data="tableDatas" style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="150">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="150">
            </el-table-column>
            <el-table-column label="头像" width="150">
                <template v-slot="scope">
                    <div style="display: flex;align-items:center"> <el-image :preview-src-list="[scope.row.avatar]"
                            style=" border-radius: 50%;width: 50px; height: 50%" v-if="scope.row.avatar"
                            :src="scope.row.avatar"></el-image> </div>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="角色" width="150">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template v-slot="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button size="mini" type="warning" @click="handleFix(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'User',
    data() {
        return {
          tableDatas:[]
        }
    },
    created(){
    this.load()
    },
    methods:{
        load(){
            axios.post('api/news/user').then(res=>{
                this.tableDatas = res.data.data
                console.log(res);
            })
        }
       
    }
}
</script>


<style scoped>

</style>
