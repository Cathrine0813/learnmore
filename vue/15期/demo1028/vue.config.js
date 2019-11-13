// 项目配置，指定应用上下文、端口号、主要title
const port = 7070;
const title = 'Vue架构'


// 导出用module.exports,因为代码运行在node.js的环境，所以用cjs(commonjs)的语法
module.exports = {
    // 改上下文地址(访问地址)
    publicPath: '/best-practice',
    // 关闭eslint规范
    // lintOnSave:false,
    // 与开发服务器交互
    devServer: {
        port
    },
    // 与webpack交互
    configureWebpack: {
        // 传入页面内能用的变量
        name: title
    }

    // 链式操作
}