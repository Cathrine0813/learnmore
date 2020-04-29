/**
 * 服务端的入口：用于首屏内容渲染
 * 目标：给服务器提供一个方法，可以根据接收url设置路由地址，，然后返回创建vue实例
 *
 * 在服务器执行
 */

import { createApp } from './main' 

// context是服务器传的
export default context => {
    return new Promise((resolve, reject) => {
        // 获取vue实例
        const { app, router, store } = createApp(context)

        // router 跳转至首屏
        router.push(context.url)

        // router的onReady方法完成时，异步的任务（异步的组件/异步的Ajax请求）都会结束
        router.onReady(() => {
            // resolve(app) //处理完再返回app

            // ----------------------处理异步请求在onReady返回前处理
            // 获取匹配的路由组件数组，【getMatchedComponents获取路由相关联的组件，返回的是数组】 
            const matchedComponents = router.getMatchedComponents();
            // 若无匹配则抛出异常 
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            // 对所有匹配的路由组件调用可能存在的`asyncData()` 
            Promise.all(
                matchedComponents.map(Component => {
                    if (Component.asyncData) {
                        return Component.asyncData({ store, route: router.currentRoute, });
                    }
                }),
            ).then(() => {
                // 所有预取钩子 resolve 后， 
                // store 已经填充入渲染应用所需状态 
                // 将状态附加到上下文，且 `template` 选项用于 renderer 时， 
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。 
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        },reject)
    })
}