/**
 * ES6 gennerator
 * 
 * function -> function*
 * 有yield表达式
 */

function* func() {
    console.log('gennerator 1')
    yield '1';
    console.log('gennerator 2')
    yield '2'
    console.log('gennerator 3')
    yield '3'
    // return '3'
}
const f = func() //用next执行
console.log('1----',f.next()) //gennerator 1 {value:1, done:false}
console.log('2----',f.next()) //gennerator 2 {value:2, done:false}
console.log('3----',f.next()) //gennerator 3 {value:3, done:true}
console.log('4----',f.next()) // {value:underfined, done:true}
console.log('5----',f.next()) // {value:underfined, done:true}
// 迭代器
for (const [key, value] of func()) {
    console.log(`${key}:${value}`)    
}