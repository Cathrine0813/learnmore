// 类型注解，约束变量类型
let var1: string; // 小写的，和js的构造函数不一样
var1 = '2'

// 类型推断，有值就不需要定义了
let var2 = true;

/**
 * 类型有
 * 原始类型: string,boolean,number,symbol,undefined,null
 * 任意类型: any
 * 对象类型: object,不是原始类型就是对象类型
 */

//  数组
let varArr: string[]; // 数组里是字符串类型
varArr = ['tom'];

let varArr2: any;//任意类型
varArr2 = 1;
varArr2 = 'ss';
varArr2 = [];

let varArr3: any[];//数组里是任意类型
varArr3 = [1, 'ww', true]

// 函数中类型约束
function greet(person: string): string{  //string约束返回值的类型
    return "hello," + person
}
greet('ddd')

// 没有返回值只有逻辑使用void
function warntest(): void{
    
}

// 对象类型
function fn1(o: object) { }
fn1({prop: 0})