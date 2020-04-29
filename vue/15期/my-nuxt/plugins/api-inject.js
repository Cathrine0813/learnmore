// 一、插件定义
// 参数1：nuxt上下文对象；参数2：注入函数

export default ({ $axios }, inject) => {
    // inject产生挂载，相当于在上下文添加了自定义属性；
    // inject( key, value )
    // 这里就是定义了一个接口
    inject('login', user => {
        return $axios.$post("api/login", user)
    })
}

// 二、注册插件 
// nuxt.config.js中的plugins'@/plugins/api-inject'