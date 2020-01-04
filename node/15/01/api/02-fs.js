// 文件读取
const fs = require('fs')

// -------1、同步调用，所以没有回调，readFileSync同步读取，单纯只是输出且书写方便
// const data = fs.readFileSync('./download.js') // 代码会阻塞在这里
// console.log(data)// 读取出来，把二进制变成16进制编码，而且是一个buffer;  ps:buffer这个库（是c的库二次封装）是处理二进制的一个库
// console.log(data.toString()) //buffer这个库提供的一个方法toString将二进制用默认的uft-8的编码转换

// 有些地方用异步IO，主要是提高cpu资源，还有些要处理并发的项目时使用

// -------2、异步调用
fs.readFile('./download.js', (err, data) => {
    console.log(data.toString())
})


// fs常搭配path使用