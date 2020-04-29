import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import Detail from '@/views/Detail.vue'

Vue.use(Router)

// 导出工厂函数，可以返回新的router实例【每个请求一个单独实例，避免状态相互污染】
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: "/", component: Index },
            { path: "/detail", component: Detail }
        ]
    });
}
/**
Q:为什么直接返回一个工厂函数，而不是返回一个实例

对于服务器，面对的用户是多个的，面对单个用户的请求也是多次的，所以每次都应该是全新的router实例，
这样子在不同的用户请求间不容易产生状态的污染

*/