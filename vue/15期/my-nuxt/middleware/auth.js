// 定义中间件，参数是nuxt提供的上下文对象
export default function ({ route, redirect, store }) {
    // 上下文中通过store访问vuex中的全局状态 
    // 通过vuex中令牌存在与否判断是否登录 
    if (!store.state.user.token) {
        // 全局拦截 守卫
        redirect("/login?redirect=" + route.path);
    }
}

/**
 * 配置
 *
 * 1、nuxt.config.js配置
 * router: {
    // 执行的中间件，有严格的顺序，中间件是链式执行，如果中间件有顺序依赖，就要严格控制
    // middleware
 *
 * 2、页面单独设置
 * middleware:['auth']
 */