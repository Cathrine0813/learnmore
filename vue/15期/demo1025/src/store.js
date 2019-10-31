/* eslint-disable */
import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "./CStore";

// 使用插件（插件要提供install方法）
Vue.use(Vuex);


// 创建一个实例
export default new Vuex.Store({
  // 存放响应式数据
  state: { count: 0 },
  // 改变数据
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
  // 对state加工，相当于计算属性
  getters: {
    left(state) {
      // 计算剩余数量
      return 10 - state.count;
    },
  },
  // 处理复杂业务，最终还是通过commit到mutations去修改数据
  actions: {
    asyncIncrement({ getters, commit }) {
      // 异步逻辑返回Promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 添加业务逻辑
          // if (getters.left > 0) {
            commit("increment");
            resolve();
            return;
          // }
          // reject();
        }, 1000);
      });
    },
  },
});
