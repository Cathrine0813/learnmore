/**
 * 1、核心模块（也是内置模块）：不需要require
 *      buffer、module、process、util
 * 2、内置模块：不需要install，但是需要require
 *      os、fs、path、http、event
 * 3、第三方模块
 */


// -----1、内置模块的调用
// const os = require('os') //反应操作系统内部信息的

// // 实现查看内存占用率的功能 - 空闲内存/总内存 * 100 （得到百分比）
// const mem = os.freemem() / os.totalmem() * 100
// console.log(`内存占用率${mem.toFixed(2)}%`) //之后终端运行node 01-useModule.js查看


// ------2、第三方插件的调用
// 想下载库（https://github.com/su37josephxia/vue-template），先安装第三方模块npm i download-git-repo -s
// download-git-repo作用是能从GitHub、GitLab、Bitbucket下载工程
// const download = require('download-git-repo')
// const ora = require('ora') // 显示进度条

// const process = ora(`下载......项目`)
// process.start()

// // download('github：用户名/工程名','自定义文件名'，callback)是一个异步IO操作,
// download('github:su37josephxia/vue-template', 'test', err => {
//     // console.log(err ? 'Error' : 'Success')
//     if (err) {
//         process.fail() // 失败显示x
//     } else {
//         process.succeed() //成显示√
//     }
// })

/**
 * 备注1：这样下载没有比 git clone 快，git下载有ssh方式和http方式，ssh比较快
 *
 * 备注2：当使用回调函数的时候，当两个异步过程想进行串行的时候
 *      https://github.com/su37josephxia/frontend-basic/tree/master/src/callback
 *
 */

// ------2优化版,让异步任务串行化（async await）
// const repo = 'github:su37josephxia/vue-template'
// const desc = 'download_vue_template'
// clone(repo, desc)

// async function clone(repo, desc) {
//     const { promisify } = require('util') // 内置的核心模块，promisify可以将方法变成承诺执行

//     const download = promisify(require('download-git-repo')) //变成承诺执行的方法，【CMD规范规定，错误回调一定要出现在最后一个参数，promise语法规范】
//     const ora = require('ora') // 显示进度条
//     const process = ora(`下载......项目`)
//     process.start()

//     // 用try catch包着，捕获错误
//     try {
//         // download就不需要写成回调形式
//         await download(repo, desc)    
//         // 成功
//         process.succeed()
//     } catch (error) {
//         // 失败
//         process.fail()
//     }
// }


// ------3、封装模块
const repo = 'github:su37josephxia/vue-template'
const desc = 'download_vue_template'
const { clone } =  require('./download') //自己封装
clone(repo, desc)

// async function clone(repo, desc) {
//     const {
//         promisify
//     } = require('util')

//     const download = promisify(require('download-git-repo'))
//     const ora = require('ora')
//     const process = ora(`下载......项目`)
//     process.start()

//     try {
//         await download(repo, desc)
//         process.succeed()
//     } catch (error) {
//         process.fail()
//     }
// }
// // 选中方法，右击点选JS Refactor：Add Export，则自动生成module.exports
// module.exports = {
//     clone: clone
// }

/**
 * node 还不支持直接用于export import两个方法，
 * 虽然支持了90%ES6语法，但这两个还不支持，如果文件后缀是mjs就能用，或者用buffer转一下，但是不建议，没啥意义
 */