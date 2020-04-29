/**
 * main.js 用于创建vue实例的
 * entry-server.js 服务端入口，用于首屏内容渲染
 * entry-client.js 客户端入口，用于静态内容激活
 */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router'; // 导出个具名方法
import { createStore } from './store'; // 导出个具名方法

// 混入
Vue.mixin({
  // 挂载前判断是否有asyncData，有就执行
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise 
      // 以便在组件中，我们可以在数据准备就绪后 
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务 
      this.dataPromise = asyncData({
        store: this.$store, //这里的上下文就是挂载之后的上下文
        route: this.$route,
      });
    }
  },
});

// 导出一个方法，context上下文是服务器传递给vue实例的参数对象
export function createApp(context) {
  // 1、获取router实例
  const router = createRouter();
  const store = createStore();
  // 2、创建vue实例
  const app = new Vue({
    router,
    store,
    context,//约定了就叫context
    render: h => h(App) //render渲染函数
  })

  return { app, router, store }//返回给entry-server
  //每次用户请求都会创建新的vue实例和router实例，每个人都是单独唯一的
}


// -----------原spa的设置
// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
