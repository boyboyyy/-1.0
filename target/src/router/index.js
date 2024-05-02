import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import Manage from '@/components/Manage.vue'
import Error  from '@/components/Error.vue'
import moke from '@/components/moke'
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/Login_In.vue'
import Register from '@/views/Login_Up.vue'
import Vuecookie from 'vue-cookies'
import MyFile from '@/components/MyFile'
import Auth from '@/components/Auth.vue'
import User from '@/components/User.vue'
import Person from '@/components/Person.vue'
import Password from '@/components/Password.vue'
//解决重复点击路由时报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login_In',
    meta:{name:'登录'},
    component: Login
  },
  //我的尾文件
  
  //我的头部文件
  {
    path: '/MyFile',
    name: 'MyFile',
    meta:{name:'文件页面'},
    component: MyFile
  },
 
  
  //我的列表内容
  {
    path: '*',
    name: '404',
    component: Error
    
  },
  {
    path: '/moke',
    name: 'moke',
    component: moke
  },
  
  {
    path: '/register',
    name: 'Login_Up',
    meta:{name:'注册页面'},
    component: Register
  },
  
  
  {
    path: '/home',
    name: 'home',
    component:home,
    redirect:'/HelloWord',
    children: [
      {path: 'Manage', name: 'Manage',meta:{name:"管理员页面"}, component: Manage,},
      {path: 'HelloWord', name: 'HelloWord', meta: { name: "主页" }, component: HelloWorld},
      {path: '403', name: 'Auth',meta:{name:"无权访问"}, component: Auth },
      {path: 'User', name: 'User',meta:{name:"用户信息"}, component: User },
      {path: 'person',name: 'person',meta:{name:'个人信息'},component: Person},
      {path: 'Password',name: 'Password',meta:{name:'修改密码页面'},component: Password},
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from ,next)=>{
  let token = Vuecookie.get('token') 
  // 携带token了,已经登录过了
  if(token){
    //已经登录了，如果还想登录或注册不允许
    if (to.path == '/' || to.path == '/Register'){
      //已经登录了，不允许去登录和注册了
      next('/home/HelloWord')
    }else{
      //如果登录了，但权限是用户的，不放行去管理员页面
      let auth  = Vuecookie.get('user').auth
      if (auth !== '管理员' && to.path === '/home/Manage'){
        next('/home/403')
        /*
          let adminPath = ['/user']
          let user = JSON.parse(localStorage.getItem('user')||'{}'){
            if(user.auth !== '管理员' && adminPath.includes(to.path)){

            }
          }
        */
      }else{
        //登录了,但去别的页面，放行
        next();
      }
      
    }
  }
  // console.log(token );
  //没有携带token的时候直接放行
  next()
})
export default router
