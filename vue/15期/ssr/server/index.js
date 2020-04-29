// 创建一个express服务器，将vue ssr集成进来，

const express = require('express')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer') //createRenderer工厂函数，给我们一个渲染器

// 创建express实例
const app = express()
// 创建渲染器
const renderer = createRenderer()

// 带渲染页面
const vm = new Vue({
    data: { name: "诗诗测试22" },
    template: ` <div ><h1>{{name}}</h1> </div> `
});

// express路由
// app.get('/', async (req, res) => {
//     // 用渲染器创建html渲染结果, renderToString可以接收一个回调函数，不接收回调函数将返回一个promise，所以加个await
//     const html = await renderer.renderToString(vm) //这是个异步操作

//     // 返回给前端
//     res.send(html)
// })
// *所有路由
app.get('*', async (req, res) => {
    console.log(req)
    let html = ''
    if (req.url == '/') {
        html = await renderer.renderToString(vm) 
    }
    // 返回给前端
    res.send(html)
})
// 监听端口
app.listen(3000, () => {
    console.log('服务器启动')
})