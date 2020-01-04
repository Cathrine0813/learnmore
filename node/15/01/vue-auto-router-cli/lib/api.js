// 实现npm i
const { clone } = require('./download')
const fs = require('fs') //读取文件
const handlebars = require('handlebars') //模块渲染
const symbols = require('log-symbols') //显示特殊字符
const chalk = require('chalk') //粉笔，给文字添加颜色

// 初始化后下载项目
module.exports.init = async name => {
    console.log('🐖创建项目：' + name)
    // 如果下载的数GitHub项目，前面的github:是可以省略的
    await clone('su37josephxia/vue-template',name)
}

// 更新路由
module.exports.reflesh = async () => {
    // 读取文件夹readdirSync页面列表，用同步的方式，而且也没有并发什么的
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue') //过滤首页，而且尽量使用函数式写法
        .map(v => ({     //转换一下
            name: v.replace('.vue', '').toLowerCase(), //将文件名剩下前缀和，且变成小写
            file: v
        }))

    // 生成路由定义
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')
    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')
}

// 编译代码
function compile(meta, filePath, templatePath) {
    // 判断文件是否存在
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta) //compile是个柯里化方法，高阶函数，实际上返回了一个函数
        fs.writeFileSync(filePath, result)
        console.log(symbols.success, chalk.green(`🐖${filePath} 创建成功`))
    }
}