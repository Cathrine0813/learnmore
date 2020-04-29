/**
 * TS是JS的超集，可编译为纯js，是给js添加特性的语言拓展
 * 
 * ------特点
 * 类型注解和编译时类型检查
 * 基于类的面向对象编程
 * 泛型
 * 接口
 * 声明文件
 * 。。。
 * 
 * ------安装
 * 全局安装ts
 *  sudo npm i typescript -g
 * 生成ts配置文件（初始化）
 *  tsc --init
 * 生成package.json（初始化）
 *  npm init -y
 * 
 * ------工程化
 * npm i webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin -D
 *  webpack => webpack webpack-cli webpack-dev-server(自动刷新，开发服务器，在package.json中指定执行指令)
 *  ts => ts-loader(转换tsx文件) typescript(语言特色需要在本地安装一次)
 *  html => html-webpack-plugin 为了之后能打包成html文件
 * 
 */