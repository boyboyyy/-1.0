import Mock from 'mockjs'
//设置moke模拟的动态的随机的数据
const { newsList } = Mock.mock({
    // newsList生成9条数据,前边加个c是中文的形式
    'newsList|60':[{
        "id":"@increment()",
        "title":"@ctitle()",
        "content":"@cparagraph(2)",
        "add-time":"@date(yyyy-MM-dd)"
    }]
})
//设置token
const {token} = Mock.mock({
    "token|1-5":"sdsdjsdkjs"
})
//设置单文件的图片
const {imgage} = Mock.mock({
    'imgage':"@image('100x100','#67C23A;','#FCFCFC','png','BOY')"
})
//设置权限和名字
const {username} = Mock.mock({
        'username':{
            name:"@cname",
            auth:"管理员",
            'username|2022101885-2100252251':1,
        'imgage': "@image('100x100','#FF83FA;','#FCFCFC','png','BOY')"
           
         }
})
//设置用户的信息
const { userData } = Mock.mock({
    // newsList生成9条数据,前边加个c是中文的形式
    'userData|5': [{
        "id": "@increment",
        "username|2022101775-2042101775":1,
        "name": "@cname",
        "phone|13481775-16461779": 1,
        "email|215635415-354156781": 1,
        "address": "@city(true)",
        "avatar":"@image('100x100','#67C23A;','#FCFCFC','png','BOY')",
        "role":"用户"
    }]
})
//处理url获取的query参数
const getQuery = (url,name)=>{
    // console.log(url,name);
    //是否包含？
    const index = url.indexOf('?')
    if(index != -1){
        //如果包含？截取问号后一位的字符串，以【&】符为分割将字符串变成数组
        const queryStrArr = url.substr(index + 1).split('&')
        // console.log(queryStrArr);
        //for循环遍历出来参数
        for (let index = 0; index < queryStrArr.length; index++) {
            const element = queryStrArr[index].split('=');
            // console.log(element);
            if(element[0] === name){
                return element[1]
            }
        }
        
    }
    return null;
}
//设置get请求，由于设置了get请求的params传参。前端请求的地址和这里的地址不一致了
//  /api/get/new?pageindex=1$pagesie=10。解决就用正则表达式【/\api\/get\/news/】这个意思包含【/api/get/new】都给通过
const data = Mock.mock(/\api\/get\/news/,'get',(options)=>{
    //options里面的url中有前端传递过来的参数
    // console.log(options);
    const pageindex = getQuery(options.url,'pageindex')
    const pagesize = getQuery(options.url,'pagesize')
    //获取数据的起始的位置
    const start = (pageindex - 1)*pagesize;
    //截取数据的终点位置
    const end = pageindex * pagesize;
    //计算总页数
    const totolPage = Math.ceil(newsList.length/pagesize)
    //1 0-9 
    //2 10-19
    //3 20-29
    //处理list数据,slice()，包含第一个参数，不包括第二个参数
    const list = pagesize > totolPage ? [] :  newsList.slice(start, end)
    // console.log(list);
    return {
        status: 200,
        message: "获得数据成功",
        //获取moke模拟的动态的随机的数组
        list: list,
        total: newsList.length
    }
})
// console.log(data);
//设置添加接口
const data01 = Mock.mock('/api/add/news','post',(options)=>{
    const body = JSON.parse(options.body)
    console.log(body);
    newsList.push(Mock.mock({
        "id": "@increment()",
        "title": body.title,
        "content": body.content,
        "add-time": "@data(yyyy-MM-dd)"
    }))
    return {
        status: 200,
        message: '添加成功',
        list: newsList,
        total:newsList.length
}
})
// console.log(data01);
//删除接口
Mock.mock('/api/delete/news', 'post', (options) => {
    const body = JSON.parse(options.body)
    // console.log(body);
    const index = newsList.findIndex(item=>item.id === body.id)
    // console.log(index);
    newsList.splice(index,1)
    return {
        status: 200,
        message: '删除成功',
        list: newsList,
        total: newsList.length
    }
})
//登录接口
Mock.mock('api/login/news','post',(options)=>{
    const body = JSON.parse(options.body)
    if(body.username != ''&& body.password != '' && body.code != ''){
        return {
            status: 200,
            message: '登录成功',
            token: token,
            data: username
        }
    }else{
        return {
            status: 401,
            message:'登录失败'
        }
        alert('账号和密码不能为空')
    }
   
})
//修改接口
Mock.mock('api/fix/news','post',(options)=>{
    const body = JSON.parse(options.body)
    console.log(body);
    if(body.fixdata.id != ''&& body.fixdata.model1 != ''&& body.fixdata.model2){
        return {
            status: 200,
            message: "修改成功",
        }
    }
})
//注册接口
Mock.mock('api/register/news','post',(options)=>{
    const body = JSON.parse(options.body)
    if(body.username != '' && body.password1 === body.password2){
        return {
            status: 200,
            message: '注册成功',
        }
    }else{
        return {
            status: 400,
            message: '注册失败'
        }
    }
})
//单文件上传
Mock.mock('api/file/news','post',()=>{
    return {
        status: 200,
        message: '文件上传成功',
        data: imgage
    }
})
//多文件上传
Mock.mock('api/files/news','post',()=>{
    return {
        status: 200,
        message: '文件上传成功',
        data: imgage
    }
})
//用户信息模块接口
Mock.mock('api/news/user','post',()=>{
    return {
        status:200,
        message: '查询成功',
        data:userData
    }
})
//个人信息接口
Mock.mock('api/news/person','post',(options)=>{
    const body = JSON.parse(options.body)
    // console.log(body);
    return {
        status:200,
        message: '查询成功',
        data:body
    }
})
