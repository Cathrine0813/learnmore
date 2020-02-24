// 测试在package.json中自定义的变量

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
// const proConfig = require('./webpack.config.pro.js')
// const devConfig = require('./webpack.config.js')


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const proConfig = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "./build"),//build和dev的dist不冲突
        filename: "[name]_[hash:6].js",
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                include: path.resolve(__dirname,'./src'),//优化搜索文件：指定搜索范围
                use: [MiniCssExtractPlugin.loader, 'css-loader']
                //MiniCssExtractPlugin.loader是MiniCssExtractPlugin自带的loader，是将css以文件的形式输出的
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader' //less-loader将less编译成css
                ] 
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'首页',
            template:'./src/index.html', // 模块 （在dist下生成一个以这个文件为模块的文件，而且自动加上构建好的js文件）
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash:6].css"
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        })
    ]
}
const devConfig ={
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]_[hash:6].js",
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                include: path.resolve(__dirname,'./src'),//优化搜索文件：指定搜索范围
                use: ['style-loader', 'css-loader'] //用了MiniCssExtractPlugin就不能使用style-loader
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './src'),
                use:['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] //less-loader将less编译成css
            },
            
        ]
    },
    devtool: 'cheap-module-eval-source-map',//生成什么类型的map文件
    devServer: {
        contentBase: "./dist",// 指定本地服务器的静态资源目录
        open: true, // 启动本地服务器后是否自动打开浏览器窗口
        port: 8083,  // 本地服务器端口
        proxy: {    //代理
            '/api': {
                target: "http://localhost:9092",
            }
        },
        hot: true,
        hotOnly:true, //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'首页',
            template:'./src/index.html', // 模块 （在dist下生成一个以这个文件为模块的文件，而且自动加上构建好的js文件）
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

console.log(process.env.Node_ENV) //获取环境变量，写在package.json中的webpack指令前的Node_ENV

// module.exports不但可以暴露对象，还可以暴露函数，可以接受外面传进来的参数
module.exports = (env) => {
    // console.log(env) //npm run dev:test ==> { production: true }

    // 通过环境变量判断
    if (env && env.prodution) {
        return merge(baseConfig, proConfig)
    }else {
        return merge(baseConfig, devConfig)
    }
}