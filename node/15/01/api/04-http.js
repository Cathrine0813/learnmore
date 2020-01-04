const http = require('http')
const fs = require('fs')

// -------1、基础测试
// // 创建连接
// const server = http.createServer((request, response) => {
//     console.log('request',getPrototypeChain(request)) 
//     console.log('response',getPrototypeChain(response)) // 原型上有流的原型Stream { pipe: [Function] },
//     // response是一个流,所以end实际上是一个流的操作，
//     response.end('Hello Node')
// })

// // 监听端口
// server.listen(3000)

// // 获取原型链
// function getPrototypeChain(obj) {
//     const protoChain = []

//     // 每次都会取obj的原型，没有继承属性则返回null
//     while (obj = Object.getPrototypeOf(obj)) { 
//         protoChain.push(obj)
//     }
//     return protoChain
// }


// -------2、进入首页
const server = http.createServer((request, response) => {
    const { url, method, headers } = request

    if (url === '/' && method === 'GET') {
        // 很多人访问服务器的时候就需要用异步去写
        fs.readFile('index.html', (err, data) => {
            
            if (err) {
                // 错误应答 charset=utf-8返回中文
                response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
                response.end('500 服务器错误') //end是多态（oo面向对象的概念）的，一个api你可以放不同的参数
            } else {
                response.statusCode = 200
                response.setHeader( 'Content-Type', 'text/html')
                response.end(data)
            }
        })
    }

    else if (url === '/user' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ name:'小星星'}))
    }
    
    /**
     * accept:指发送端（客户端）希望接受的数据类型
     * Content-Type:指发送端（客户端|服务器）发送的实体数据的数据类型
     */
    // 接收一个流,图片资源        
    else if (method === 'GET' && headers.accept.includes('image/*') !== -1) {
        // 为什么'.' + 因为在index.html中的image标签中的src是img.png，需要找到对应的文件目录
        fs.createReadStream('.' + url).pipe(response)
    }    
        
    else {
        response.statusCode = 404
        response.setHeader( 'Content-Type', 'text/plain;charset=utf-8')
        response.end('404 页面未找到')
    }
})

server.listen(3000)