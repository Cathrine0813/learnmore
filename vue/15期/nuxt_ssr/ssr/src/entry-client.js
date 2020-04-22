/**
 * 目的：挂载、创建vue实例
 *
 * 在浏览器执行（服务器返回的是静态页面，需要在浏览器激活）
 */
import { createApp } from "./main";

const { app, router } = createApp();// 创建vue实例

// 路由就绪，执行挂载（激活过程）
router.onReady(() => {
    app.$mount("#app");//#app在宿主文件指定,  
    // 指定服务端渲染
    //1、设置$mount("#app"，第二个参数)第二个参数是否服务端渲染，
    //2、（现在选择这个方法）在index.html中设置 < !--vue - ssr - outlet-- >
});