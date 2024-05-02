<template>
    <div>
        <el-input v-model="title" placeholder="请输入内容" style="width:200px"></el-input>
        <el-input v-model="content" placeholder="请输入内容" style="width:200px "></el-input>
        <el-button type="warning" plain @click="addNum">添加内容</el-button>
        <el-button size="mini" type="success" @click="drawer = true"
            style="width: 11%;font-size:20px;margin-left:1px">文件批量上传</el-button>
        <el-drawer title="使用Ctrl键选取多文件" :visible.sync="drawer" :direction="direction">
            <!-- 多文件上传  -->
            <el-upload style="margin-left: 5px;" :headers="{ token: token.token }" action="api/files/news" multiple
                list-type="picture" :on-success="filesSuccess">
                <el-button size="small" type="primary">选择文件上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-drawer>
        <br>
        <br>
        <!--  表格-->
        <div class="news_list">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="id" label="文件ID" width="180">
                </el-table-column>
                <el-table-column prop="title" label="文件头" width="150">
                </el-table-column>
                <el-table-column prop="content" label="文件内容" width="150">
                </el-table-column>
                <el-table-column prop="add-time" label="文件时间" width="150">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template v-slot="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="warning" @click="handleFix(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <!-- 单文件上传 -->
                <el-table-column label="文件上传" width="150">
                    <template v-slot="scope">
                        <el-upload action="api/file/news" :headers="{ token: token.token }" :show-file-list="false"
                            :on-success="(row, file, fileList) => handelSuccess(scope.row, file, fileList)">
                            <el-button size="mini" type="success">文件上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column label="文件图片" width="150">
                    <template v-slot="scope">
                        <el-image v-if="scope.row.avatar" style=" width: 100%; height: 100%"
                            :src="scope.row.avatar"></el-image>
                        <div> <el-button size="mini" type="success" @click="previewBtn(scope.row.avatar)">预览</el-button> </div>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!-- //修改窗口 -->
        <el-dialog title="请修改内容" :visible.sync="dialogVisible" width="35%">
            <el-form label-width="90px">
                <el-form-item label="文件头：">
                    <el-input v-model="fixdata.model1" placeholder="请修改文件头"></el-input>
                </el-form-item>
                <el-form-item label="文件内容：">
                    <el-input v-model="fixdata.model2" placeholder="请修改文件内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureBtn()">确 定</el-button>
            </span>
        </el-dialog>
        <br>
        <br>
        <div class="block">
            <el-pagination background :current-page.sync="pageindex" @current-change="currentPage" :page-size="pagesize"
                layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tableData: [],
            pagesize:5,
            pageindex:1,
            total: 0,
            title:'',
            content: '',
            //修改功能的数据
            dialogVisible: false,
            fixdata:{
                model1: '',
                model2: '',
                id:''
            },
            token: {},
            url:'',
            //抽屉
            drawer: false,
            direction: 'rtl',
            

        };
    },
    methods: {
        //预览
        previewBtn(url){
            window.open(url)
        },
        //单文件上传
        handelSuccess(row, file, fileList){
            console.log("row" , row,"file", file,"filelist",fileList);
            //给scope加一个avatar的属性，属性值为【''】
            // this.$set(scope,'avatar',file.response.data)
            row.avatar = file.response.data;
            this.$message({
                message: '文件上传成功',
                type: 'success'
            })
            
        },
        //多文件上传
        filesSuccess(response,file,fileList){
            let urls = fileList.map(v =>v.response?.data)
            console.log(urls);
        },
        //分页
        currentPage(pageNum){
            // console.log(pageNum);
            this.pageindex = pageNum
            this.getNewsList();
        },
       getNewsList() {
        axios.get('api/get/news',{
            params: {
                pageindex: this.pageindex,
                pagesize: this.pagesize
            }
        }).then(res => {
            // console.log(res);
            this.tableData = res.data.list
            this.total = res.data.total
            // console.log(this.total);
            })
        },
        //添加按钮,当输入的数据带空格时用trim去掉空格部分。0
        addNum(){
            if(this.title.trim()===''||this.content.trim()===''){
                alert('请规范书写')
            }
            console.log(this.title,this.content);
            // 发送post请求
            axios.post('/api/add/news',{
               title: this.title,
               content:this.content
            }).then(res=>{
                console.log(res);
                this.getNewsList();
            })
        },
        //删除按钮
        handleDelete(id){
        
            axios.post('/api/delete/news',{
                id
            }).then(res=>{
                console.log(res);
                this.getNewsList();
            })
        },
        //修改按钮
        handleFix(data){
            console.log('xiu',data.avatar);
            this.dialogVisible = true;
            this.fixdata = {};
            this.fixdata.id = data.id;
        },
        //修改-确定按钮
        sureBtn() {
            axios.post('api/fix/news', {
               fixdata: this.fixdata,
            }).then(res => {
    
                this.$message({
                    message:'修改成功',
                    type: "success"
                })
                //更新数据
                // this.getNewsList();
                //未完，通过返回的res来更改数据
                console.log(res);
            })

            // console.log(data);
            this.dialogVisible = false;
        }
    },
    // 接收get请求
    created() {
        this.getNewsList();
    },
    mounted() { 
        this.token = this.$cookies.get('token');
        // console.log(this.token.token , 'token');
        // console.log("usr",this.url);
    },
};
</script>

<style scoped>
    .el-button--success {
        /* width: 14%; */
        background-color: #67C23A !important;
        border-color: #67C23A !important;
    }
    .el-form {
        margin: 0;
    }
</style>
