// test('测试文件名生成', () => {
//     const src = new (require('../index'))() //因为是一个class方法，所以要实例一下
//     const ret = src.getTestFilename('/abc/class.js') //传人一个文件名
//     console.log('ret :>> ', ret);

//     expect(ret)
//         .toBe('/abc/__test__/class.spec.js')
// })

// test('测试代码生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestSource('fun', 'class')
//     console.log('ret :>> ', ret);

//     expect(ret)
//         .toBe(`
//             test('TEST fun',()=>{
//                 const fun = require('../class');
//                 const ret = fun();
//                 //expect(ret)
//                 //  .toBe('test ret')
//             })
//         `)
// })

const fs = require('fs');

test('集成测试 测试生成测试代码文件', () => {
    // 准备环境
    // 删除测试文件夹   rmdirSync同步的方式 | __dirname是index.spec.js所在的文件夹
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true, //迭代的方式，有这个文件的都删掉
    })

    const src = new (require('../index'))()
    src.getJestSource(__dirname + '/data') //生成的逻辑代码放置的位置
})