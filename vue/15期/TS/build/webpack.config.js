const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        // 对文件名后缀为js\ts\tsx进行编译
        extensions: ['.js', '.ts', '.tsx']
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/i,
            use: [{
                loader: 'ts-loader' //使用ts-loader进行转换
            }],

            exclude: /node_modules/
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html' //宿主文件
    })]
}