// postcss样式自动补全配置文件

module.exports = {
    // 插件列表
    plugins: [
        // autoprefixer插件，让postcss有自动补全前缀的功能 npm i autoprefixer -D
        require("autoprefixer")({
            // 新版本需要这个字段overrideBrowserslist
            overrideBrowserslist: ["last 2 versions", ">1%"]
            //last 2 versions：目前主流浏览器的前2，>1%：浏览器市场份额
        })
    ]
};