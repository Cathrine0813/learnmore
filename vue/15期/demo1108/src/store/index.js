import Vue from "vue";
import Vuex from "vuex";
// import Vuex from "./kvuex";
import count from './modules/count' //使用相对路径
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex);

export default new Vuex.Store({
  // 模块注册
  modules: {
    count,user,permission
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
