// 必填参：参数一旦声明，就要求传递，且类型需符合
function greeting(person: string): string {
    return "Hello, " + person;
}
greeting('tom')

// 可选参数：参数名后面加上问号，变成可选参数
function greeting2(person: string, msg?: string): string {
    return "Hello, " + person;
}

// 默认值
function greeting3(person: string, msg = ''): string {
    return "Hello, " + person;
}

/**
 * 函数重载：先声明再实现
 * 【比较多使用在库和框架里】
 *  可以用参数数量、参数类型、参数返回值、函数返回值区分
 */
// 重载1 
function watch(cb1: () => void): void; //void不希望return
// 重载2 
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// 实现 
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    } else {
        console.log('执行watch重载1');
    }
}
watch(() => { })
