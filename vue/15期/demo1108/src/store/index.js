import Vue from "vue";
import Vuex from "vuex";
// import Vuex from "./kvuex";
import count from './modules/count' //使用相对路径
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex);

// 全局设置
export default new Vuex.Store({
  // 模块注册
  modules: {
    count,user,permission
  },
  getters: {
    roles:state => state.user.roles
  }
});


// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
