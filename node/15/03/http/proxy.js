// 虚拟一个主机，当作页面服务器

// 使用express npm i express@4.16.2
const express = require('express')
const app = express()

// express自带静态服务器 地址指向文件index.html根目录
app.use(express.static(__dirname + '/'))

// npm install --save-dev http-proxy-middleware
// 建立一个代理（就是反向代理）：加载一个http - proxy - middleware中间件, 用于后台将请求转发给其它服务器。
const proxy = require('http-proxy-middleware')
app.use('/api', proxy({
    target:'http://localhost:4000' //转向到
}))
// vue中的vue.config.js中的proxy就是建立了反向代理，这里的devServer其实就是express服务器，这里注册的proxy就是http-proxy-middleware

app.listen(3000, () => {
    console.log('proxy is 3000')
})


// 之后访问localhost3000发现404