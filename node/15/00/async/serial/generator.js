/**
 * ES6 generator
 * 
 * function -> function*
 * 有yield表达式
 */

// function* func() {
//     console.log('generator 1')
//     yield '1';
//     console.log('generator 2')
//     yield '2'
//     console.log('generator 3')
//     yield '3'
//     // return '3'
// }
// const f = func() //用next执行
// console.log('1----',f.next()) //generator 1 {value:1, done:false}
// console.log('2----',f.next()) //generator 2 {value:2, done:false}
// console.log('3----',f.next()) //generator 3 {value:3, done:true}
// console.log('4----',f.next()) // {value:underfined, done:true}
// console.log('5----',f.next()) // {value:underfined, done:true}
// // 迭代器 for of
// for (const [key, value] of func()) {
//     console.log(`${key}:${value}`)    
// }

function compare(a, b) {
    if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
        return -1;
    }
    if (a > b ) {
        return 1;
    }
    // a must be equal to b
    return 0;
}