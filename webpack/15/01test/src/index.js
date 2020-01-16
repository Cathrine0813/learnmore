//！ webpack 4.x默认配置，也就是0配置（这个配置是特别弱的）
//！ 默认只支持js、json格式 

// const add = require('./test')

// // webpack进入入口文件，会分析出依赖、文件、内容， 分析完会生成一个webpack启动函数
// const a = require('./a') //引入了其他模块，这种是依赖


import css from "./index.css";

import url from "./cesuo.jpg"
console.log(url) // 返回的是构建后dist目录下的路径
let img = new Image()
img.src = url
img.classList.add("logo");
let root = document.getElementById('root')
root.append(img)



console.log('hello webpack')
