// 异步编程
const logTime = (name) => {
    console.log(`log...${name} ${new Date().toLocaleDateString()}`)
}

exports.callback = () => {
    setTimeout(() => {
        logTime('time 01')
        setTimeout(() => {
            logTime('time 02')
        },100)
    },100)
}

// promise
const promise = (name, delay = 100) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name)
        resolve()
    }, delay)
})

exports.promise = () => {
    promise('Promise 1')
        .then(promise('Promise 2'))
        .then(promise('Promise 3'))
}

exports.generator = () => {
    const generator = function* (name) {
        // 串行处理
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
    }

    let co = generator => {
        if (it = generator.next().value) {
            it.then(res => {
                // 递归调用
                co(generator)
            })
        } else {
            // 完成
            return
        }
    }

    co(generator('C0-Generator'))
}

exports.asyncAwait = async () => {
    await promise('async/await 1')
    await promise('async/await 2')
    await promise('async/await 3')
    await promise('async/await 4')
}

// 事件驱动
exports.event = async () => {
    // 柯里化
    const asyncFun = name => event => {
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100)
        return event;
    }

    // 需要做的
    const asy = [
        asyncFun('event 1'),
        asyncFun('event 2'),
        asyncFun('event 3')
    ]

    // 订阅发布事件
    const { EventEmitter } = require('events')
    const event = new EventEmitter()
    // 订阅一个事件
    let i = 0
    event.on('end',()=> i< asy.length && asy[i++](event)) //执行到end时就触发say[]
    event.emit('end') //第一个
}