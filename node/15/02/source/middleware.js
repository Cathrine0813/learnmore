// // 体验compose函数式编程(可以用redux实现)
// const add = (x, y) => x + y
// const square = z => z * z

// // 正常写法
// // const fn = (x, y) => square(add(x, y))

// // compose写法
// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// // const fn = compose(add, square)

// // 多个函数的时候compose的写法，通过结构赋值(因为中间件的数目是不固定的，所以用数组描述)返回一个新的函数
// const compose = (...[first, ...other]) => (...args) => {
//     // 先执行first
//     let ret = first(...args)

//     // 可以使用redux，但是要先解释什么是redux
//     // 第一次执行完的结果被其他函数依次执行
//     other.forEach(fn => {
//         ret = fn(ret)
//     })

//     return ret
// }

// const fn = compose(add, square, square)
// console.log(fn(1, 2))



// --------------实例
// 实现一个compose方法，目的：通过compose返回一个新的函数，函数的功能是将middlewares合成
function compose(middlewares) {
    return function () {
        return dispatch(0) //我们自己定义的函数，执行第0个
        // 参数i是中间件middlewares数组的下标
        function dispatch(i){
            let fn = middlewares[i]

            // 如果这个函数不存在，就返回一个空的承诺执行
            if (!fn) {
                return Promise.resolve() //和new promise一样的，都会返回执行承诺
            }

            // 存在就返回这个函数的承诺执行
            return Promise.resolve(
                fn(function next() {
                    // promise完成后再执行下一个
                    return dispatch(i+1) //递归调用
                })
            )
        }
    }
}

// 目的：执行顺序fn1 => fn2 => sleep => fn3 => fn2 => fn1，像洋葱圈一样执行
async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}

async function fn2(next) {
    console.log("fn2");
    await delay(); //相当于sleep，在这里模拟一个异步方法
    await next();
    console.log("end fn2");
}

function fn3(next) {
    console.log("fn3");
}

function delay() {
    // 因为使用了await，这里就执行一个承诺
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);

finalFn();