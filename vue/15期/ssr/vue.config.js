// 两个插件分别负责打包客户端和服务端 
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
// npm install webpack-node-externals lodash.merge -D 优化
const nodeExternals = require("webpack-node-externals"); //外置化，用于优化打包速度和体积
const merge = require("lodash.merge");

// 根据传入`环境变量WEBPACK_TARGET`，决定`入口文件`和`相应配置项`
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
    css: {
        extract: false
    },
    outputDir: './dist/' + target,
    configureWebpack: () => ({
        // 将 entry 指向应用程序的 server / client 文件 
        entry: `./src/entry-${target}.js`,
        // 对 bundle renderer 提供 source map 支持 
        devtool: 'source-map',
        // target设置为node使webpack以Node适用的方式处理动态导入，并且还会在编译Vue组件时告知`vue-loader`输出面向服务器代码。 
        target: TARGET_NODE ? "node" : "web",
        // 是否模拟node全局变量 (node里面有全局变量)
        node: TARGET_NODE ? undefined : false,//这里没有用到就直接关掉了
        output: {
            // 打包输出的格式，此处使用Node风格(cjs)导出模块  [undefined 不定义就是我们平常输出的web方式]
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        // https://webpack.js.org/configuration/externals/#function 
        // https://github.com/liady/webpack-node-externals 
        // 外置化应用程序依赖模块：可以使服务器构建速度更快，并生成较小的打包文件。 
        externals: TARGET_NODE ? nodeExternals({
            // 不要外置化webpack需要处理的依赖模块。 
            // 可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件， 
            // 还应该将修改`global`（例如polyfill）的依赖模块列入白名单 
            whitelist: [/\.css$/]
        }) : undefined,
        optimization: {
            // 直接设undefined，报错Error: Server-side bundle should have one single entry file. Avoid using CommonsChunkPlugin in the server config.
            splitChunks: TARGET_NODE ? false: undefined //分块
        },
        // 这是将服务器的整个输出构建为单个 JSON 文件的插件。 
        // 服务端默认文件名：vue-ssr-server-bundle.json； 告诉用什么方式渲染首屏，不会影响nginx
        // 客户端默认文件名：vue-ssr-client-manifest.json。 
        plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
    }),
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
            merge(options, {
                optimizeSSR: false
            });
        });
    }
};