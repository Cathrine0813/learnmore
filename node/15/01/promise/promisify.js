// 源码解析
module.exports = function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            // 核心（约定），回调函数中，错误出现在第一个参数，后面是其他参数
            args.push(function (err,...arg) {
                if(err){
                    reject(err)
                }else{
                    resolve(...arg);
                }
            });
            fn.apply(null, args);
        })
    }
}