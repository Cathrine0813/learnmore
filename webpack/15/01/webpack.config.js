// 没有写这个文件的时候用的是webpack的默认配置

const path = require('path') // node.js的核心模块,处理路径

// 导出配置对象
module.exports = {
    // 构建模式 none development production
    mode:'development', // development这样子的话输出的代码模式就不是压缩的，而是可阅读的development
    // 执行构建的入口
    // entry: ['./src/index.js','./src/a.js'],
    entry: {
        main: "./src/index.js",
        a:'./src/a.js'
    },
    // 构建出口
    output: {
        // 路径，而且必须是绝对路径，所以这里用node.js中的path模块，生成绝对路径dist（就是以后生成代码都放到当前目录的dist目录里）
        path: path.resolve(__dirname, "./dist"),
        // 构建生成的代码文件名字
        // filename: "main.js" //单入口
        // filename: "[name].js" //动态；entry的key是什么输出的就是什么
        // filename: "[name]_[hash].js" //hash做缓存处理
        filename: "[name]_[hash:6].js" //:6对哈希进行长度的裁剪
        
    },
    module: {
        rules: [
            {
                test: /\.css$/, //正则匹配做校验
                // loader是有执行顺序的，从后往前
                use: ['style-loader','css-loader']
                // use: ['style-loader', {  //含传参数的方式
                //     loader: "css-loader",
                //     option: {}
                // }]
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/, //图片 png jpg 
            //     use: {
            //         loader: "file-loader", //把文件挪到输出目录里面，相当于copy
            //         // 写参数与配置
            //         option: {
            //             // 输出的文件名称[name]：原来的名字是什么输出的就是什么 [ext]：原来的后缀是什么输出的也是什么
            //             // name: '[name].[ext]',
            //             name: '[name]_[hash:6].[ext]',
            //             outputPath:'images/' // 输出到的目录
            //         }
            //     }
            // }
        ]
    }
}