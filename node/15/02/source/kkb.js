const http = require('http')
// 对context request response进行挂载
const context = require('./context')
const request = require('./request')
const response = require('./response')


class KKB {

    // 监听端口
    listen(...args) {
        const server = http.createServer((req, res) => {
            // this.callback(req, res)
            
            // 创建上下文
            let ctx = this.createContext(req, res)
            this.callback(ctx)

            // 处理响应
            res.end(ctx.body)
        })
        server.listen(...args)
    }

    // 参数是回调函数
    use(callback) {
        this.callback = callback
    }

    // 构建上下文,将原始的http的request和response加载进来
    createContext(req, res) {
        // Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。
        const ctx = Object.create(context)  // 将context request response继承过来,相当于定义了一个对象原型
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        // 挂载
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        // 上下文构建结束
        return ctx
    }
}

module.exports = KKB