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
// app.use(ctx => {
//     ctx.body = 'hehe'
// })

// static的实现
const static = require('./static')
app.use(static(__dirname+'/public'))

// router的实现
const Router = require('./router')
const router = new Router();

// 作业缓存
// const Homework = require('./homework')

// let today_data = '', time = ''
// router.get('/api/data', async ctx => {
//     timeFilter()
//     console.log(333,today_data)
//     ctx.body =today_data.toString();
// });

// const timeFilter = () => {
//     let data = new Date()

//     let times = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`

//     if (time != times){
//         today_data = times
//         time = times
//         console.log(111)
//     }
//     console.log(222,today_data,time)   
    
// }

router.get('/index', async ctx => { ctx.body = 'index page';});
router.get('/post', async ctx => {ctx.body = 'post page';});
router.get('/list', async ctx => {ctx.body = 'list page';});
router.post('/index', async ctx => { ctx.body = 'post page'; });
// 路由实例输出父中间件 router.routes()；routes()的返回值是一个中间件，所以需要挂载method到ctx之上，修改request.js
app.use(router.routes())

app.use(async (ctx, next) => {
    ctx.body = "1";
    await next();
    ctx.body += "5";
});
app.use(async (ctx, next) => {
    ctx.body += "2";
    await delay();
    await next();
    ctx.body += "4";
});
app.use(async (ctx, next) => {
    ctx.body += "3";
});
const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));




app.listen(3000, () => {
    console.log('监听端口3000')
})