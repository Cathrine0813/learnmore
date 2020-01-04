// buffer操作二进制的库,c语言的库浅层封装
const buf1 = Buffer.alloc(10) //alloc:分配了一个10个字节的内存空间，实际上是不会用到的
console.log(buf1)
//这次使用nodemon，与node的区别是nodemon会自动检测这个文件夹的变化，nodemon需要全局安装npm install -g nodemon

const buf2 = Buffer.from('a')
console.log(buf2)

const buf3 = Buffer.from('中文')
console.log(buf3)

// 合成
const buf4 = Buffer.concat([buf2, buf3])
console.log(buf4,buf4.toString())