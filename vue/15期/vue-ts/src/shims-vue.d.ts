// 让ts可以识别vue文件
// 后缀.d.ts，对写对库进行一个接口描述，类型声明
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
