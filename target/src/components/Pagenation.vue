<template>
    <div class="pagination">
        <!-- 当前页数为第一页时，上一页不能点 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',page-1)">上一页</button>
        <button v-if="startNumAndEndNum.start>1">1</button>
        <button v-if="startNumAndEndNum.start>2">...</button>
        <!-- 中间部分 -->
        <!-- 问题四：如果遍历出来的有7个数，当前页数为第5页。让其只显示3页以后的continues【连续页数】 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start"
            @click="$emit('getPageNo',page)"> {{ page }}</button>

        <button v-if="startNumAndEndNum.end < totalPage-1">...</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>
        <button style="margin-left:30px">共{{total}}条</button>
    </div>
</template>

<script>
export default {
    name: 'Pagenation',
    data() {
        return {

        }
    },
    props: ['pageNo','pageSize','total','continues'],
    computed: {
        //总共的页数,
        totalPage (){
        //由总数量【total】除以一页展示多少数据【pageSize】然后取整
        return Math.ceil(this.total/this.pageSize)
        },
        //计算出连续的页码的初始数字与结束数字【连续的页码数字：至少是5】
        startNumAndEndNum(){
            const {continues,pageNo,totalPage} = this;
            //定义两个变量存储初始数字与结束数字
            let start = 0, end = 0;
            //连续页码的数字5，问题一：如果页数为4页而连续的页面的数为5，怎么办？
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            }else{
            //else为正确的情况，问题二：totalPage大于continues的开始和结束如何表达
            start = pageNo - parseInt(continues/2);
            //结束数字
            end = pageNo + parseInt(continues/2);
            }
            //在问题二的基础上，引出问题三。start不能为-1、0两个数字。end不能大于总页数
            if(end > totalPage){
                end = totalPage;
                star = totalPage - continues + 1;
            }
            return {start,end}
            
        }

    }

}
</script>

<style lang="less" scoped>
.pagination {
    bottom {
        margin: 0 5px;
        background-color: #f4f4f4;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border:0;

        &[disabled]{
            color: #c0c4cc;
            cursor:not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }


    }
}
</style>
