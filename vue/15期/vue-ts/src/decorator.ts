// 1、类装饰器：类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。 
function log(target: Function) {
    // target是构造函数 
    // console.log(target === Foo); // true 
    target.prototype.log = function () {
        console.log(this.bar);
    }
    // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。 
}

// 2、方法装饰器： 三个参数：target是类实例，name是名称，descriptor是定义对象
function dong(target: any, name: string, descriptor: any) {
    // 这里通过修改descriptor.value扩展了bar方法 
    const baz = descriptor.value; //被装饰的原始方法
    descriptor.value = function (val: string) {
        console.log('dong~~');
        baz.call(this, val); //执行之前的原始操作
        // bar(val)
    }
    return descriptor
}

// 3、属性装饰器：两个参数：参数一是实例，参数二是当前实例访问的key
function mua(target: any, name: any) {
    target[name] = 'mua~~~'
}

@log
class Foo {
    bar = 'bar'

    @mua ns!: string; //！明确赋值断言

    @dong
    setBar(val: string) {
        this.bar = val
        console.log(this.bar)
    }
}

const foo = new Foo();
// @ts-ignore 
foo.log();
foo.setBar('ssss')
console.log(foo.ns);