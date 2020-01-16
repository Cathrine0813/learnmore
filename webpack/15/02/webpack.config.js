const path = require('path')
// HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 做清楚工作要提取一下内置的cleanwebpackplugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 抽离css为独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename:"[name]_[hash:6].js"
    },
    module: {
        rules: [
            // css
            {
                test: /\.css$/,
                // use:['style-loader', 'css-loader'] //用了MiniCssExtractPlugin就不能使用style-loader
                use: [MiniCssExtractPlugin.loader, 'css-loader']
                //MiniCssExtractPlugin.loader是MiniCssExtractPlugin自带的loader，是将css以文件的形式输出的
            },
            // 图片
            {
                test: /\.(png|jpe?g|gif)$/,
                use:{
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash:6].[ext]",
                        outputPath:"images/"
                    }
                }
            },
            // 文件
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name:"[name].[ext]"
                    }
                }
            }
        ]
    },
    // 字符串类型，不支持函数使用
    devtool:'cheap-module-eval-source-map',
    // 引入对应的插件，之后再plugins中进行实例化
    plugins: [
        new HtmlWebpackPlugin({
            title:'首页',
            // filename:'cc.html', // 生成的文件名称，默认是index.html
            template:'./src/index.html', // 模块 （在dist下生成一个以这个文件为模块的文件，而且自动加上构建好的js文件）
        }),
        // 在构建之前将dist目录删除掉
        new CleanWebpackPlugin(),
        // 提取css为独立文件
        new MiniCssExtractPlugin({
            // filename: "[name][chunkhash:8].css"
            // filename: "css/[name].css"
            filename: "css/[name]_[contenthash:6].css"
        })
    ]
}