import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 根组件
new Vue({
  // 不适宜放数据和管理数据，包括改变数据状态，所以我们用vuex单独的管理数据状态，让不同组件去共用
  // data: {
  //   testRoot:'测试$root与vuex'
  // },
  render: h => h(App),
}).$mount('#app')
