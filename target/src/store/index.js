import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { nanoid } from 'nanoid'
Vue.use(Vuex)
// 人员管理相关的配置
const MyHeaderOptions = {
  namespaced:true,
  actions: {
    addPersonWang(context,value){
      if(value.name.indexOf('王') === 0){
        context.commit('ADD_PERSON',value)
      }
    },
    // 向后端发出请求来获取value，故这里只需要context
    addSao(context){
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
        response => {
          context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
        },
        error => {
          alert(error.message)
        }
      )
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      console.log('mutations中的ADD_PERSON被调用了');
      state.personList.unshift(value)
    }
  },
  state: {
    personList: [{ id: '001', name: '张三' }]
    
  },
  getters: {
    firstPersonName(state){
      return state.personList[0].name
    }
  },
}
// 求和相关的配置
const MyFooterOptions = {
  namespaced: true,
  actions: {
    jiaOdd(context, value) {
      if (context.state.sum % 2 != 0) {
        context.commit("JIA", value)
      }
    },
    jiaWait(context, value) {
      setTimeout(() => {
        context.commit("JIA", value)
      }, 5000)
    }
  },
  mutations: {
    JIA(state, value) {
      console.log("mutations中的JIA被调用", state, value);
      state.sum += value
    },
    JIAN(state, value) {
      console.log("mutations中的JIAN被调用", state, value);
      state.sum -= value
    },
  },
  state: {
    sum: 0,
    address: '花果山',
    subject: '前端',
  },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  },
}


export default new Vuex.Store({
  // modules为模块的意思,告诉Vue要进行模块化。完整形式为：MyFooterOptions：MyFooterOptions
  modules:{
    a:MyHeaderOptions,
    b:MyFooterOptions
  }

})
