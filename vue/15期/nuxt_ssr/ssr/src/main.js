/**
 * main.js 用于创建vue实例的
 * entry-server.js 服务端入口，用于首屏内容渲染
 * entry-client.js 客户端入口，用于静态内容激活
 */
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router' // 导出个具名方法

// 导出一个方法，context上下文是服务器传递给vue实例的参数对象
export function createApp(context) {
  // 1、获取router实例
  const router = createRouter();
  // 2、创建vue实例
  const app = new Vue({
    router,
    context,//约定了就叫context
    render: h => h(App) //render渲染函数
  })

  return {app, router} //每次用户请求都会创建新的vue实例和router实例，每个人都是单独唯一的
}


// -----------原spa的设置
// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
