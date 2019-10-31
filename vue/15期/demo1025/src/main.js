import Vue from 'vue'
import App from './App.vue'
import Bus from './utils/bus'
import Create from './utils/create'
import emitter from "./mixins/emitter";

import router from './router'
import store from './store'


Vue.config.productionTip = false

Vue.prototype.$bus = new Bus()
Vue.prototype.$create = Create;
Vue.mixin(emitter);//混入


// 根组件
new Vue({
  // 不适宜放数据和管理数据，包括改变数据状态，所以我们用vuex单独的管理数据状态，让不同组件去共用
  // data: {
  //   testRoot:'测试$root与vuex'
  // },
  router, //配置router实例
  store,
  render: h => h(App),
}).$mount('#app')
