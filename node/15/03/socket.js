// TCP编程，通常也叫套接字编程，socket套接字编程

const net = require('net')  // 要使用TCP协议的话就要使用net包（网络通讯包）
const chatServer = net.createServer() //启动TCP server

const clientList = [] // 访问通讯录，连接会有多个客户端

// 注册一个connection事件，之后就会回调一个客户端
chatServer.on('connection', client => {
    client.write('hi \n') //告诉客户端
    clientList.push(client)

    // 客户端创建一个事件（data）
    client.on('data', data => {
        // 通讯的时候使用的是二进制字节流buffer，所以要toString转一下
        console.log('receive:', data.toString())
        
        // 接收到信息之后广播一次
        clientList.forEach( v => v.write(data))        
    })
})

// 启动监听端口 nodemon socket.js
chatServer.listen(9000)


// 通过telnet(telnet localhost 9000)实现客户端连接服务器，但是发送的是明文，现在多用ssh  

// 底层通讯：pos机、硬件通讯

// mac 没有的话都可以用brew安装 https://blog.csdn.net/weixin_44722978/article/details/89914912