// 使用webpack-merge，基础配置，公共配置

const path = require('path')
// HtmlWebpackPlugin
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 做清楚工作要提取一下内置的cleanwebpackplugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 抽离css为独立文件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 线上才使用
// const webpack = require("webpack");

module.exports = {
    // mode: "development",
    entry: './src/index.js',
    // output: {
    //     path: path.resolve(__dirname, "./dist"),
    //     filename: "[name]_[hash:6].js",
    //     // publicPath:'//cdnURL.com //CDN服务器地址，指定存放JS⽂件的CDN地址，在输出文件路径前自动补全该路径
    // },
    module: {
        rules: [
            // // css
            // { 
            //     test: /\.css$/,
            //     include: path.resolve(__dirname,'./src'),//优化搜索文件：指定搜索范围
            //     // exclude: path.resolve(__dirname, './node_modules'),// 排除
            //     use: ['style-loader', 'css-loader'] //用了MiniCssExtractPlugin就不能使用style-loader
            //     // use: [MiniCssExtractPlugin.loader, 'css-loader']
            //     //MiniCssExtractPlugin.loader是MiniCssExtractPlugin自带的loader，是将css以文件的形式输出的
            // },
            // {
            //     test: /\.less$/,
            //     include: path.resolve(__dirname, './src'),
            //     use:['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] //less-loader将less编译成css
            // },
            // 图片
            {
                test: /\.(png|jpe?g|gif)$/,
                include: path.resolve(__dirname,'./src'),
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
                include: path.resolve(__dirname,'./src'),
                use: {
                    loader: "file-loader",
                    options: {
                        name:"[name].[ext]"
                    }
                }
            },
            // js
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'./src'),
                use: {
                    loader: "babel-loader",
                    // exclude: /node_modules/,
                    options: {  // 在.babelrc中配置
                        //用@babel/preset-env规范进行代码输出
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // 字符串类型，不支持函数使用
    // devtool: 'cheap-module-eval-source-map',//生成什么类型的map文件
    resolve: {
        //  "@": path.join(__dirname, "./pages"),
        //寻找当前目录下的第三方模块，第三方模块一般都已经是安装在node_modules下，所以这个优化是很微小的，除非是自己额外写的
        modules: [path.resolve(__dirname, './node_modules')],
        alias: {
            // 在使用react是直接使用react.production.min.js
            react: path.resolve(
                __dirname,
                './node_modules/react/umd/react.production.min.js'
            ) ,
            "react-dom": path.resolve(
                __dirname,
                "./node_modules/react-dom/umd/react-dom.production.min.js"
            )
        },
        // extensions:['.js','.json','.jsx','.ts'], //后缀补全，默认'.js','.json'，不推荐增加，只会增加webpack的后缀搜索树
    },
    // devServer: {
    //     contentBase: "./dist",// 指定本地服务器的静态资源目录
    //     open: true, // 启动本地服务器后是否自动打开浏览器窗口
    //     port: 8083,  // 本地服务器端口
    //     proxy: {    //代理
    //         // 当访问的请求带有key这个字段的时候，就把当前请求转发（代理）到我们用express搭建的服务器那里
    //         '/api': {
    //             target: "http://localhost:9092",
    //             // pathRewrite: { //重写路径
    //             //     '^/api': '/'
    //             // }
    //         }
    //     },
    //     hot: true,
    //     hotOnly:true, //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
    // },
    // 引入对应的插件，之后再plugins中进行实例化
    plugins: [
        // new HtmlWebpackPlugin({
        //     title:'首页',
        //     // filename:'cc.html', // 生成的文件名称，默认是index.html
        //     template:'./src/index.html', // 模块 （在dist下生成一个以这个文件为模块的文件，而且自动加上构建好的js文件）
        // }),
        // 在构建之前将dist目录删除掉
        new CleanWebpackPlugin(),
        // 提取css为独立文件
        // new MiniCssExtractPlugin({
        //     // filename: "[name][chunkhash:8].css"
        //     // filename: "css/[name].css"
        //     filename: "css/[name]_[contenthash:6].css"
        // }),
        // webpack自带的热模块更新插件,不⽀持抽离出的css 我们要使⽤css-loader
        // new webpack.HotModuleReplacementPlugin()
    ]
}