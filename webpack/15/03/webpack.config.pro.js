// 线上的配置
const path = require('path')
// HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 做清楚工作要提取一下内置的cleanwebpackplugin
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 抽离css为独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Css tree shaking
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')


// 合并配置
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')


// module.exports = {
const proConfig = {
    mode: "production",
    // entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./build"),//build和dev的dist不冲突
        filename: "[name]_[hash:6].js",
        // publicPath:'//cdnURL.com //CDN服务器地址，指定存放JS⽂件的CDN地址，在输出文件路径前自动补全该路径
    },
    module: {
        rules: [
            // css
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
            // // 图片
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     include: path.resolve(__dirname,'./src'),
            //     use:{
            //         loader: "file-loader",
            //         options: {
            //             name: "[name]_[hash:6].[ext]",
            //             outputPath:"images/"
            //         }
            //     }
            // },
            // // 文件
            // {
            //     test: /\.(eot|ttf|woff|woff2)$/,
            //     include: path.resolve(__dirname,'./src'),
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name:"[name].[ext]"
            //         }
            //     }
            // },
            // // js
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname,'./src'),
            //     use: {
            //         loader: "babel-loader",
            //         // exclude: /node_modules/,
            //         options: {  // 在.babelrc中配置
            //             //用@babel/preset-env规范进行代码输出
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }
        ]
    },
    // resolve: {
    //     //  "@": path.join(__dirname, "./pages"),
    //     //寻找当前目录下的第三方模块，第三方模块一般都已经是安装在node_modules下，所以这个优化是很微小的，除非是自己额外写的
    //     modules: [path.resolve(__dirname, './node_modules')],
    //     alias: {
    //         // 在使用react是直接使用react.production.min.js
    //         react: path.resolve(
    //             __dirname,
    //             './node_modules/react/umd/react.production.min.js'
    //         ) ,
    //         "react-dom": path.resolve(
    //             __dirname,
    //             "./node_modules/react-dom/umd/react-dom.production.min.js"
    //         )
    //     },
    // },
    optimization: {
        //只要mode是production就会⽣效，develpoment不⽣效的，因为webpack为了⽅便你的调试
        //但是mode是develpoment的时候会用注释的形式告诉我们哪些代码是没有使用到的
        usedExports:true,  //开始js tree shaking, 哪些导出import的模块被使⽤了，再做打包
        // 代码分割
        splitChunks: {
            chunks: 'all', //all:所有代码都进行分割
            // 设置缓存组，例如将lodash分割出来
            cacheGroups: {
                lodash: {
                    chunks: 'all',//缓存组里的chunks只支持同步的async，可以设置成all
                    test: /\lodash/,//正则匹配
                    name: 'lodash',
                    minSize: 30000,//30kb
                    minChunks: 1,//最少被引用过一次
                },
                // // 默认,设置了会将默认的vendors输出改成了default的
                // default: {
                    
                // }
            }
            
        }
    },
    // 引入对应的插件，之后再plugins中进行实例化
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
        // 在构建之前将dist目录删除掉
        // new CleanWebpackPlugin(),
        // 提取css为独立文件
        new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash:6].css"
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        // 清除⽆⽤ css,
        new PurifyCSS({
            //对css进行摇树，一定要对相映的html进行摇树
            paths: glob.sync([//glob帮助我们使用通配符*匹配路径
                // 要做 CSS Tree Shaking 的路径⽂件
                path.resolve(__dirname, './src/*.html'),
                // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ]
}

module.exports = merge(baseConfig,proConfig) // 通过merge合并配置
// module.exports = proConfig//通过自定义环境变量合并配置