const Koa = require('koa')
const app = new Koa()

// 打印日志（相当于中间件在一定程度上建立了一个切面）
app.use(async(ctx, next) => {
    const start = new Date().getTime() //获取当前时间戳
    console.log(`start ${ctx.url}`)

    // 这里的await等待的是下面的use，相当于中间走业务逻辑
    await next()

    const end = new Date().getTime()
    console.log(`请求${ctx.url} 耗时${parseInt(end - start)}ms`)
})

// 使用的时候加载一个中间件; ctx:上下文
app.use((ctx, next) => {
    // 给http的body放回了一个json数组
    ctx.body = [
        {
            name:'jerry'
        }
    ]
})

app.listen(3000)