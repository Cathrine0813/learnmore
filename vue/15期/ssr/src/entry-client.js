/**
 * 目的：挂载、创建vue实例
 *
 * 在浏览器执行（服务器返回的是静态页面，需要在浏览器激活）
 */
import { createApp } from "./main";

const { app, router, store } = createApp();// 创建vue实例

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态自动嵌入到最 终的 HTML 
// 在客户端挂载到应用程序之前，store 就应该获取到状态： 
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);//反序列化
}

// 路由就绪，执行挂载（激活过程）
router.onReady(() => {
    app.$mount("#app");//#app在宿主文件指定,  
    // 指定服务端渲染
    //1、设置$mount("#app"，第二个参数)第二个参数是否服务端渲染，
    //2、（现在选择这个方法）在index.html中设置 < !--vue - ssr - outlet-- >
});