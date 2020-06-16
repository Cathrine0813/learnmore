// 使用到fs和path
const path = require('path');
const fs = require('fs');

module.exports = class TextNow{
    // 先写函数，再写/**就出现JSDoc
    /**
     * 生成测试文件名
     * @param {*} filename 代码文件名
     */
    getTestFilename(filename) {
        // 拆开目录名
        const dirName = path.dirname(filename)
        // 拆开文件名
        const baseName = path.basename(filename) 
        // 获取拓展名
        const extName = path.extname(filename)
        // 新的名字
        const testName = baseName.replace(extName,`.spec${extName}`)
        console.log(dirName,'--',baseName,'--',extName,'--',testName)
        // 组装
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }

    /**
     * 生成测试代码
     * @param {*} methodName 
     * @param {*} classFile 引入的require
     * @param {*} isClass 是否class还是function
     */
    getTestSource(methodName, classFile, isClass = false) {
        console.log('methodName :>> ', methodName);
        // 组装模版，如果是class就要结构出来
        return `
test('${'TEST ' + methodName}',()=>{
    const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}');
    const ret = ${methodName}();
    //expect(ret)
    //  .toBe('test ret')
})
        `
    }

    /**
     * 生成测试文件
     * @param {*} sourcePath 文件夹路径，默认是本文件夹
     */
    getJestSource(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`;
        // 判断是否存在这个文件
        if (!fs.existsSync(testPath)) {
            // 不存在就创建
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件  readdirSync读取出来是相对路径
        let list = fs.readdirSync(sourcePath)
        
        // 使用函数式写法
        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件  statSync判断文件是否存在  isFile是否文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码 spec.js
            .filter(v => v.indexOf('.spec') === -1)
            // 执行生成文件函数
            .map(v=>this.getTestFile(v))
        
    }

    getTestFile(filename) {
        console.log('filename :>> ', filename);
        const testFileName = this.getTestFilename(filename)

        // 判断此文件是否存在
        if (fs.existsSync(testFileName)) {
            console.log('此测试代码已存在', testFileName)
            // 存在就不生成
            return;
        }

        // 看文件中的内容
        const mod = require(filename)
        let source

        if (typeof mod === 'object') {
            source = Object.keys(mod)
                .map(v => this.getTestSource(v, path.basename(filename), true)) // 方法名，文件名，出来的是个字符串数组
                .join('\n') //组装成一个字符串，每行代码加一个空格
        } else if (typeof mod === 'function') {
            const basename = path.basename(filename);
            source = this.getTestSource(basename.replace('.js',''), basename) // 方法名，文件名
        }

        // 写入文件
        fs.writeFileSync(testFileName,source)
    }
}