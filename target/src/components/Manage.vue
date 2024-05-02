<template>
    <div>
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding:10px 20px; border-radius:5px;margin-bottom: 10px">
            早安,boy 期待每一天
        </div>
        <div class="el-main-box">
            <el-card class="el-card">
                <moke></moke>
            </el-card>
        </div>
    </div>
</template>

<script>
import moke from '@/components/moke.vue'
export default {
    name: 'Manage',
    components: { moke },
    data() {
        return {
           
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

</style>