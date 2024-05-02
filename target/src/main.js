import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Pagenation from '@/components/Pagenation.vue'
import '@/moke.js/index'
import Vuecookie from 'vue-cookies'
Vue.component('Pagenation',Pagenation)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Vuecookie)
new Vue({
  //引入vue的router
  router,
  VueRouter, 
  render: h => h(App),
  
}).$mount('#app')
