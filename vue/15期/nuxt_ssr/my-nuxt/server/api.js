// 此文件并非nuxt生成，它为演示项目提供数据服务接口
const Koa = require('koa');
const app = new Koa();

// 中间件
const bodyparser = require("koa-bodyparser");
const router = require("koa-router")({ prefix: "/api" }); //设置api的前缀prefix

// 设置cookie加密秘钥
app.keys = ["some secret", "another secret"];

const goods = [
    { id: 1, text: "Web全栈架构师", price: 1000 },
    { id: 2, text: "Python架构师", price: 1000 }
];

// 配置路由
// 获取产品列表
// http://localhost:8080/api/goods
router.get("/goods", ctx => {
    ctx.body = {
        ok: 1,
        goods
    };
});

// 产品详情
router.get("/detail", ctx => {
    ctx.body = {
        ok: 1,
        data: goods.find(good => good.id == ctx.query.id)
    };
});

// 登录
router.post("/login", ctx => {
    const user = ctx.request.body;
    if (user.username === "cc" && user.password === "123456") {
        // 将token存入cookie
        const token = 'a mock token';
        ctx.cookies.set('token', token); //cookies设置token
        ctx.body = {
            ok: 1,
            token
        };
    } else {
        ctx.body = {
            ok: 0
        };
    }
});

// 拦截post请求，用bodyparser解析post数据，并注册路由
app.use(bodyparser());
// 注册路由
app.use(router.routes());

app.listen(8080, () => console.log('api服务已启动'))
