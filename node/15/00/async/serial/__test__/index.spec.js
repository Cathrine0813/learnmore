// jest默认不支持异步的，还没执行完callback就退出了，
// test('callback', () => {
//     callback()
// })

// 加个done回调，没有done就直接结束，有done就可以控制结束
test('callback', (done) => {
    const { callback } = require("../index")
    callback()
    // 延迟结束
    setTimeout(done,1000)
})


test('promise', (done) => {
    const { promise } = require("../index")
    promise()
    // 延迟结束
    setTimeout(done,1000)
})