const path = require('path');


// 项目配置，指定应用上下文、端口号、主要title
const port = 7070;
const title = 'Vue架构';

// 将相对地址转化为绝对地址
function resolve(dir) {
    // 拼凑出绝对地址, __dirname当前地址  dir用户传进来的地址
    return path.join(__dirname, dir)
}


// 导出用module.exports,因为代码运行在node.js的环境，所以用cjs(commonjs)的语法
module.exports = {
    // 改上下文地址(访问地址)
    publicPath: '/best-practice',
    
    // 与开发服务器交互
    devServer: {
        port
    },
    // 与webpack交互
    configureWebpack: {
        // 传入index.js页面内能用的变量
        name: title
    },

    // 高级配置：用链式操作改变loader; 
    //例如svg icon引入，这种方式维护起来方便，（可以在configureWebpack，但是这里使用链式操作实现）
    //https://www.iconfont.cn/plus/collections/detail 下载/复制svg
    //安装开发依赖 cnpm i svg-sprite-loader -D
    //查看規則：vue inspect --rules （这个食查看所有规则），vue inspect --rule svg（单独查看某个規則）
    chainWebpack(config) {
        //对config进行链式操作即可修改loader、plugins
        /* config.module.rule('svg') */
        // 原规则：{
        //     test: /\.(svg)(\?.*)?$/,
        //     use: [
        //         {
        //         loader: 'file-loader', //现在不希望它用file-loader，希望用刚刚安装的svg-sprite-loader
        //         options: {
        //             name: 'img/[name].[hash:8].[ext]'
        //         }
        //         }
        //     ]
        // }

        console.log(resolve('src/icons'))
        // 1、排除icons目录(首先访问config模块module里面的規則rule())，目的是让svg的默认規則不对我们排除的目录产生作用
        config.module.rule('svg')
            .exclude.add(resolve('src/icons')) //exclude排除(这个选项是数组，所以要用add添加)，add加上绝对地址,不要用相对地址add('src/icons')，不安全,含斜杠/平台有差异性，需要写兼容代码resolve('src/icons'),处理成绝对地址
        
        // 2、添加規則icons(規則如果不存在就相当于创建)，引用刚刚安装的svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/)  //匹配正则
            .include.add(resolve('src/icons')).end()  //包括的地址(include这个选项是数组，所以要用add添加),最后使用end()向上一级走，因为我们include的时候进入的是include数组，接下来操作时回上一级创建use
            .use('svg-sprite-loader')   //使用自定义loader
            .loader('svg-sprite-loader') //读取loader
            .options({ symbolId: 'icon-[name]' }) // 使用規則, name文件名前缀
         
    }
}