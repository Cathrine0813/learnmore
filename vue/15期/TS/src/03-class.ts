class Parent {
    /**
     * 修饰符
     * public：公共属性，随便用
     * private：私有属性，只能自己用
     * protected：保护属性，自己和继承者都能使用
     * 
     * 定义变量
     * 参数
     * 方法
     */

    private _foo = "foo";// 私有属性，不能在类的外部访问 
    protected bar = "bar";// 保护属性，可以在子类中访问，继承者也能使用 

    // 构造函数参数加修饰符，能够定义为成员属性 
    constructor(public tua = "tua") { }

    // 方法也有修饰符，控制访问权 
    private someMethod() { }

    // 存取器：属性方式访问，可添加额外逻辑，控制读写性 【ES6也有】
    get foo() {
        return this._foo;
    }
    set foo(val) {
        this._foo = val;
    }
}

class Child extends Parent {
    baz() {
        this.foo; //get实现访问
        this.bar; //protected继承者可访问
        this.tua; //定义为成员属性
    }
}