<template>
    <div>
        <h2>商品列表</h2>
        <ul>
            <li v-for="good in goods" :key="good.id">
                <nuxt-link :to="`/detail/${good.id}`">
                    <span>{{good.text}}</span>
                    <span>￥{{good.price}}</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template> 
<script> 
export default {
    head() { 
        return { 
            title: "课程列表", 
            // vue-meta利用hid确定要更新meta 
            meta: [{ name: "description", hid: "description", content: "set page meta" }], 
            link: [{ rel: "favicon", href: "favicon.ico" }], 
        }; 
    },

    // data() {
    //     return {
    //         goods: [
    //             { id: 1, text: 'Web全栈架构师', price: 8999 }, 
    //             { id: 2, text: 'Python全栈架构师', price: 8999 },
    //         ]
    //     }
    // }

    /**
     * 异步数据获取
     * 参数是nuxt上下文中的，自定义的模块可以赋值在上下文之后这里调用
     * asyncData({isDev, route, store, env, params, query, req, res, redirect重定向函数, error}) { //params==$route.params 
     * 
     * 注意：这里不能使用this，因为此时组件实例还未创建
     */
    async asyncData({ $axios, error }) {
        // 发送一个异步请求，加上了async await

        /**
         * $axios由@nuxt/axios模块注入
         *  $get是axios模块封装的类fetch风格的api【和get不一样，$get返回的数据就是data里面的值，不需要再访问response对象】
         * 
         * 注意：如果该页面是首屏，看不到这个接口的调用（服务器请求服务器），不是首屏，而是切换到这个页面就可以看到接口请求
         */
        const { ok, goods } = await $axios.$get('/api/goods') 
        if(ok){ //ok是接口自定义的状态值之类的，例如code...
            return { goods } // 这里返回的数据将来会和data合并，优先级比data高，会覆盖data定义的相同的key
        }

        /**
         * 处理使用
         * error是nuxt传进来的处理函数
         * 重定向到错误处理页面去，并且把状态也传过去
         * 
         * 不想用error可以用redirect
         */
        error({
            statusCode:400, //错误值
            message:'数据查询失败' //错误信息
        })
    },
};</script>