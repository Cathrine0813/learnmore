// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hi cathrine')
// })

// server.listen(3000, () => {
//     console.log('监听端口3000')
// })

// 封装成koa
const KKB = require('./kkb')
const app = new KKB()

// 优化http的request和response的使用麻烦，koa使用了上下文context
// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hi kkb')
// })
app.use(ctx => {
    ctx.body = 'hehe'
})

app.listen(3000, () => {
    console.log('监听端口3000')
})