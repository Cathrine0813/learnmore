
import axios from 'axios'
import css from './index.css'
import counter from "./counter";
import number from "./number";
counter();
number();
// js的hmr需要加上监听,
if (module.hot) {
    module.hot.accept("./number", function() {
        document.body.removeChild(document.getElementById("number"));
        number();
    });
}


// mock，会有跨域问题
axios.get('/api/info').then(res => {
    console.log(res)
})


console.log('hello webpack')


var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
    var div = document.createElement("div");
    div.innerHTML = "item";
    document.body.appendChild(div);
};