// 借助@babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的特性
// import '@babel/polyfill' //设置了按需加载，useBuiltIns值为usage，所以不需要import
// 测试babel
const arr = [new Promise(() => { }), new Promise(() => { })];

arr.map(item => {
    console.log(item);
});




// import axios from 'axios'
// import css from './index.css'
// import counter from "./counter";
// import number from "./number";
// counter();
// number();
// // js的hmr需要加上监听,
// if (module.hot) {
//     module.hot.accept("./number", function() {
//         document.body.removeChild(document.getElementById("number"));
//         number();
//     });
// }


// // mock，会有跨域问题
// axios.get('/api/info').then(res => {
//     console.log(res)
// })


// console.log('hello webpack')


// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function() {
//     var div = document.createElement("div");
//     div.innerHTML = "item";
//     document.body.appendChild(div);
// };