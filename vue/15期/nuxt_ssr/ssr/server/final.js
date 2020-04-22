const fs = require("fs"); //加载本地文件
const path = require("path"); //处理url
const express = require('express')
const app = express()

// 获取绝对路径（把相对路径变成绝对路径）
const resolve = dir => {
    return path.resolve(__dirname, dir)
}

// 第 1 步：开放dist/client目录（给用户提供一个静态服务），
app.use(
    //express.static：中间件 访问本地静态文件
    express.static( resolve('../dist/client'), {
        index: false //关闭默认下载index页的选项，不然到不了后面路由 （路由/默认去到/index.html，所以要关了）
    })
)

// 第 2 步：获得一个createBundleRenderer打包渲染器 （获取渲染器，处理打包好的服务端和客户端的bundle）
const { createBundleRenderer } = require("vue-server-renderer");

// 第 3 步：导入服务端打包文件 （加载打包好的服务端文件，在node.js里，json文件可以直接require）
const bundle = require(resolve("../dist/server/vue-ssr-server-bundle.json"));

// 第 4 步：创建渲染器 
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8");
const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"));
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, //性能 https://ssr.vuejs.org/zh/api/#runinnewcontext 
    template, // 宿主文件 （模板）
    clientManifest, // 客户端清单 client bundle
});

// 通配符*，所有url都接受（浏览器直接输入的是get请求）
app.get('*', async (req, res) => {
    console.log(req.url);
    // 上下文对象：设置url和title两个重要参数 
    const context = {
        title: 'ssr test',
        url: req.url //url，核心参数，首屏地址
    }
    const html = await renderer.renderToString(context);//renderToString将context传给main.js
    res.send(html)
})

const port = 3001;
app.listen(port, function () {
    // eslint-disable-next-line no-console 
    console.log(`server started at localhost:${port}`);
});