// cra项目
// 核心两个库（react & react-dom）
import React from 'react';  //React负责逻辑控制（数据=>VDOM）,使用JSX描述JS对象
import ReactDOM from 'react-dom'; //ReactDom渲染实际DOM（VDOM=>DOM）
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



/**
 *  使用jsx时必须要在react使用作用域内（因为我们要用到react中的createElement）
 *  babel-loader把JSX编译成相应的JS对象（所以我们在webpack里面需要babel-loader）
 *  React.createElement再把这个JS对象构造成React需要的虚拟DOM
 *  JSX是一种js语法拓展，格式像模板语言，实际上是在js内部实现（JSX更好的描述UI，能够有效提高开发效率）
 *
 * jsx：console.log(jsx)
 *  $$typeof:Symbol(react.element) : 标识了唯一性
 *  key : 标志着当前元素在同级的唯一性（diff算法：当前比较的时候只比较同级别的元素）
 *  props : 子元素
 */
// const jsx = <div><p>jjjj</p>hello JSX</div> 
// ReactDOM.render(jsx, document.getElementById('root'));