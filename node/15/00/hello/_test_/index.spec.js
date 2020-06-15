test('测试hello', () => {
    const ret = require('../index')
    // console.log('111',hello)

    // 断言，断言成功认为测试成功
    expect(ret).toBe('world')   //这里是如果ret等于world就代表测试成功
})