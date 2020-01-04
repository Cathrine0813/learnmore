const fs = require('fs')
const rs = fs.createReadStream('./img.png') // 读取流
const ws = fs.createWriteStream('./img_copy.png') // 写出流（这个文件名原本是没有的）
// 连接流
rs.pipe(ws)
/**
 *  过程：
 *  1、读取文件，将文件用二进制的形式读到内存去
 *  2、之后从内存将文件写出来
 *
 *  旧问题：
 *  如果文件太大，几个G；或者文件很多人读写的时候，每次都占用点内存，就会造成内存的严重浪费，服务器内存得好大。
 *  所以实际上不会用这种方式去做读写文件的
 *
 *  解决办法：
 *  引用流的概念去完成读写文件。
 *  相当于一个导管，我们不做存储的功能，只是建立一个导管，做疏导的作用
 *      1、创建一个读取的流createReadStream
 *      2、创建一个写的流createWriteStream，（1&2的过程中是不消耗内存的，不需要内存去存储文件的内容的）
 *      3、之后使用pipe这个命令，将1&2连接在一起，完成了复制，大大提高了系统资源的利用率
 */