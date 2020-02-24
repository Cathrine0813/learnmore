// 将第三方模块打包出来作为动态链接库使用

const path = require('path')
const { DllPlugin } = require('webpack') //DllPlugin是webpack自带的插件，负责打包

module.exports = {
    entry: {
        react: ['react', 'react-dom'],
        lodash:['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dll'),
        filename: '[name]_dll.js',
        library:'[name]' //导出成库
    },
    mode: 'development',//优化构建速度往往使用在开发模式中
    plugins: [
        new DllPlugin({
            // manifest.json⽂件的输出位置，保存的是动态链接库里面的模块映射关系
            path: path.join(__dirname, './dll', '[name]-manifest.json'), // 必须的
            // name必须和library一致,定义打包的公共vendor⽂件对外暴露的函数名
            name: '[name]'
        })
    ]
}