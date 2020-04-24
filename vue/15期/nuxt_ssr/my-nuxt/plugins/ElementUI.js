// 引入elementui
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

// 注册element-ui
export default () => {
    Vue.use(ElementUI, { locale })
}

// 1、 Vue.use(ElementUI)
// 2、
// export default () => {
//     Vue.use(ElementUI, { locale })
// }

// 配置nuxt.config.js