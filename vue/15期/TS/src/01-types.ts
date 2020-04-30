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

let varArr4: [string, number] //元组
varArr4 = ['sss',22]

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
fn1({ prop: 0 })

// 更合适
function fn2(o: { prop: string }) { }
fn2({ prop: 'ss' })

/**
 * 类型别名type：自定义类型
 * 增强可读性
 */
type Prop = { prop: number } //命名不一定大写开头，只是这样写更像类型
function fn3(o: Prop) { }

/**
 * 类型断言：某些情况下用户比较确定值对类型，可以直接断言
 * 语法：as
 * 断言是把比较范的类型断言为更具体的类型
 */
const someValue: any = 'this is a string';
const strLength = (someValue as string).length;

/**
 * 联合类型：希望某个变量或参数的类型是多种类型其中之一
 * 语法：|
 */
let union: string | number;
union = 1;
union = 'aa';

/**
 * 交叉类型：想要定义某种由多种类型合并而成的类型使用交叉类型
 * 语法：&
 */
type First = { first: number };
type Second = { second: number };
type FirstAndSecond = First & Second;
function fn4(param: FirstAndSecond): FirstAndSecond {
    // param自带有first second两个值
    // param.first
    // param.second
    return { first: 1, second: 2 }
}

/**
 * 类型守卫，判断类型
 * 语法：is typeof instanceof
 */