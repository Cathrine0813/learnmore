/**
 * nuxtServerInit 服务端初始化
 *
 * 渲染流程第一步，只在服务端运行
 * 作用：在服务端渲染首屏前执行一些action，把服务器的一些状态存到store里（例如用户的登录状态）
 *
 *  1、必须在store的根模块【store/indexjs】中定义
 *  2、是个action，实现nuxtServerInit
 *
 *  依赖：npm i -S cookie-universal-nuxt
 *
 *  注册, nuxt.config.js
 *      modules: ["cookie-universal-nuxt"],
 */
// 通过在store的根模块【store/indexjs】中定义 nuxtServerInit 方法，
// Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它。
// 当我们想将服务端的一些数据传到客户端时，这个方法非常好用。

// 登录状态初始化  因为页面刷新就没有了store的数据，所有用这个在将服务端的数据存到store中
export const actions = {
    nuxtServerInit({ commit }, { app }) {
        // app是nuxt实例，不是koa实例
        // console.log(app)
        const token = app.$cookies.get("token");
        //$cookies是安装的一个跨平台模块cookie-universal-nuxt里面的方法，
        //不用模块的话（就是访问koa实例，再访问请求对象，再访问请求对象里的cookie）很容易不兼容而且打包报错，因为解析过程繁琐，容易出问题
        if (token) {
            console.log("nuxtServerInit: token:" + token);
            commit("user/init", token);
        }
    }
};
