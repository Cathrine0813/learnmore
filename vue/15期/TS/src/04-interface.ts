// 接口:仅约束结构，不要求实现，使用更简单【类似借口别名type】

// interface：接口定义了解构 
interface Person {
    firstName: string;
    lastName: string;
}
// 继承
interface Human extends Person { 
    fullName:string //除了继承firstName和lastName，还可以添加其他属性
}
// 交叉类型 扩充
// type A = { foo: 1 } & { bar: 'a' }


// greeting函数通过Person接口约束参数解构 
function greeting(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
greeting({ firstName: 'Jane', lastName: 'User' });// 正确 
// greeting({ firstName: 'Jane' }); // 错误