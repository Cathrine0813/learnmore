const path = require("path");
module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    },

    // resolveLoader: {
    //     modules: ["node_modules", "./myLoaders"]
    // },
    //   对模块处理使用loader
    module: {
        rules: [
        //   {
        //     test: /\.css$/,
        //     use: ["style-loader", "css-loader"]
        //   },
            {
                test: /\.js$/,
                // use: path.resolve(__dirname,'./myloaders/replaceLoader.js')// 取绝对路径
                use: [{
                    loader: path.resolve(__dirname, './myloaders/replaceLoader.js'),
                    options: {
                        name:'参数'
                    }
                }]
                // use: [
                //     "replaceLoader",
                //     {
                //         loader: "replaceLoaderAsync",
                //         options: { //传参需要options
                //             name: "开课吧！"
                //         }
                //     }
                // ]
            }
        ]
    }
};
