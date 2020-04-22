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
        const { app, router } = createApp(context)

        // router 跳转至首屏
        router.push(context.url)

        // router的onReady方法完成时，异步的任务（异步的组件/异步的Ajax请求）都会结束
        router.onReady(() => {
            resolve(app) //处理完再返回app
        },reject)
    })
}