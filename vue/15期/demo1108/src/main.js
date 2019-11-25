import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './icons/index'
import './permission'; //权限路由
import vp from './directive/permission'; //自定义指令

Vue.config.productionTip = false

// 全局注册指令
Vue.directive('permission', vp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
