// 虚拟一个主机，当作页面服务器

// 使用express npm i express@4.16.2
const express = require('express')
const app = express()

// express自带静态服务器 地址指向文件index.html根目录
app.use(express.static(__dirname + '/'))

app.listen(3000, () => {
    console.log('proxy is 3000')
})


// 之后访问localhost3000发现404