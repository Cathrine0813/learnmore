#  00_node学习

### 一、目标

- 优秀的前端 - 可与后端有效沟通（起码掌握一门后端语言）
- 敏捷的全栈 - 快速开发全栈应用（大前端团队，node，js语言基础）
- 架构师 - 践行工程化思想（系统架构调整，前端的工程化都使用node，例如加载文件使用fs、项目搭建、代码管理方式、Jest测试、rollup打包等）

###  二、Web Application阶段

`前端全栈，相当于web应用阶段`

* 后端模板JSP ASP PHP
* 前后端分离 Jquery
* 工程化： ng webpack glup
* 全栈时代+大前端
* 云+端时代： 体验 微信云开发 flutter（开发多端应用）+Serverless小程序云平台函数

### 三、快速开发

`概念：node.js是一个异步的事件驱动的JavaScript运行时`

创建node项目（npm init）

[官网](https://nodejs.org/en/)

> 运行时runtime就是用于**程序运行的时候**。运行时库就是**程序运行的时候所依赖的库**
>
> * Java：JRE
>
> * C：C Runtime
>
> * .NET（多种语言的）：.NET Common Language Runtime
>
> 为什么有运行时，因为语言是要编译的，相当于编译时，所以提供一个运行时环境。
>
> 运行的时候指的是指令加载到内存并由CPU执行的时候。
>
> 代码编译成可执行文件的时候，指令没有被CPU执行，这个时候算是**编译时**，就是编译的时候

#### 特性

`nodejs特性其实也是js特性`

1. 非阻塞IO
2. 事件驱动

**与前端不同**

`JS核心语法不变，操作对象不同`

* 前端BOM DOM

* 后端 fs http buffer event os



> 并发处理
>
> * 多进程时代 - LinuxC、Apache，提高cpu的使用效率，使用多个进程
> * 多线程 - java，一般般，很复杂，`线程可以理解成轻量化的进程`
> * 异步IO - js、nginx
> * [协程](https://segmentfault.com/a/1190000019220859?utm_source=tag-newest) - lua、openresty(lua框架)、go、deno(node下一代产品，底层使用go，上面使用TS)，`协程可以理解成更轻量化的线程,在程序内部存在`









