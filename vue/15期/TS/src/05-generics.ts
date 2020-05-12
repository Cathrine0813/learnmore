// 不用泛型
// interface Result { 
//     ok: 0 | 1; 
//     data: Feature[]; // 固定了结果Feature[]
// } 


// 异步数据获取的时候用的最多
// 使用泛型 
interface Result<T> {  //加上了T，动态的类型变量，范型约束
    ok: 0 | 1;
    data: T;
}

// 泛型方法 
function getResult<T>(data: T): Result<T> {
    return { ok: 1, data };
}
// 用尖括号方式指定T为string 
getResult<string>('hello')
// 用类型推断指定T为number 
getResult(1)


// 进一步约束类型变量 
interface Foo { foo: string }
// 约束T必须兼容Foo 
function getResult2<T extends Foo>(data: T): Result<T> {
    return { ok: 1, data };
}
// 这样上面的两个调用就非法了
// getResult2({bar:'bar'})
getResult2({foo:'foo',bar:'bar'}) //必须含有foo