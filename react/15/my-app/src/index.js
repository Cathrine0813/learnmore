/**
 * 核心的两个库
 * react：负责逻辑控制，生成虚拟DOM（数据->VDOM）；
 *        JSX依赖react，所以用了JSX，一定要引入react
 * react-dom：负责渲染实际DOM（将VDOM->DOM）
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import store from './store/index'

// 将App转成VDOM，之后渲染成真实DOM，再插入到root中
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// // redux重新渲染组件
// store.subscribe(() => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/**
 * 使用的是JSX语法
 *  基础使用：{表达式/变量}
 *  函数
 *  JSX对象
 *  条件语句
 *  数组
 *  属性
 *  模块化
 */
// import styles from './index.module.css'; //模块化
// import logo from './logo.svg';

// const name = 'cc';
// const obj = {
//   fristName: 'Harry',
//   lastName: 'Potter'
// };
// function formatName(target){
//   return target.fristName + '' + target.lastName;
// };
// const greet = <div>nice</div>
// const show = true;
// const a = [1,2,3]
// // const jsx = <div>hello, {name}</div>
// const jsx = (
//   <div className={styles.app}>
//     {/* 基础使用 */}
//     <div>hello, {name}</div> 
//     {/* 函数 */}
//     <div>hello, {formatName(obj)}</div>
//     {/* JSX对象 */}
//     {greet}
//     {/* 条件语句 */}
//     {show ? 'good' : 'bad'}
//     {show && 'terrible'}
//     {/* 数组 */}
//     <ul>
//       {/* diff的时候，首先比较type(当前元素的类型)，然后是key值，所以同级同类型元素，key值必须是唯一 */}
//       {a.map(item => (
//         <li key={item}>{item}</li>
//       ))}
//     </ul>
//     {/* 属性 */}
//     <img src={logo} className="logo" style={{ width: '50px', height: '100px' }} />
//     {/* 模块化 */}
//     <div className={styles.test}></div>
//   </div>
// )
// ReactDOM.render(
//   jsx,
//   document.getElementById('root')
// );


