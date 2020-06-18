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
const promise = (name, delay = 1000) => new Promise(resolve => {
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

