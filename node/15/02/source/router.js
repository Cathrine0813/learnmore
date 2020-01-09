
class Router {
    constructor() {
        this.stack = [];//数组存储
    }

    register(path, methods, middleware) {
        let route = {
            path,
            methods,
            middleware
        }
        this.stack.push(route);
    }

    // router.get('/index', async ctx => { ctx.body = 'index page';});
    
    // 现在只支持get和post，其他的同理; middleware相当于handler
    get(path, middleware) {
        this.register(path, 'get', middleware);
    }
    post(path, middleware) {
        this.register(path, 'post', middleware);
    }

    // app.use(router.routes())
    routes() {
        let stock = this.stack;
        return async function (ctx, next) {
            let currentPath = ctx.url;
            let route;

            for (let i = 0; i < stock.length; i++) {
                let item = stock[i];
                //routes()的返回值是一个中间件，所以需要挂载method到ctx之上，修改request.js
                if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
                    // 判断path和method ，对应上就执行这个中间件
                    route = item.middleware;
                    break;
                }
            }

            if (typeof route === 'function') {
                route(ctx, next);
                return;
            }
            await next();
        };
    }
}

module.exports = Router;