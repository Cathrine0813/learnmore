// 图标素材的自动加载

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'


//【https://webpack.js.org/guides/dependency-management/#requirecontext】
//(require.content模块导出返回一个request函数，这个函数可以接收一个参数：require函数-这里的request应该指在require()语句中的表达式)
// 设置上下文 (目录，是否还应该搜索它的子目录, 規則)
const req = require.context('./svg', false, /\.svg$/)

// req是个数组，保存./svg下所有的文件名,之后循环加载
req.keys().map(req)
// req.keys()获取req所有的数组，之后map(req)每个req都加载一下


// svg-icon 注册全局组件
Vue.component('svg-icon', SvgIcon)