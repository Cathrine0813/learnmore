// Loader就是⼀个函数，声明式函数，不能⽤箭头函数（会改变this的指向）

// 导出函数,接收的是源代码，之后再返回处理过的代码
module.exports = function (source) {
    console.log(source, this, this.query); //options参数this.query
    // 必须有返回值，不然会报错
    return source.replace('world','开课吧') 
}
//https://webpack.js.org/api/loaders/

// 需要⽤声明式函数，因为要上到上下⽂的this,⽤到this的数据，该函数接受⼀个参数，是源码