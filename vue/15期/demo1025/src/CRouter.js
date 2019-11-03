/* eslint-disable */
/**
 * 1.解析routes选项
 *
 * 2.监控url变化
 *      html5 history api (更加干净/index)
 *      hash (#/index)
 *
 * 3.实现两个全局组件
 *      router-link
 *      router-view
 *
 */

// 声明插件:vue插件需要声明一个install静态方法


// 3.声明局部变量
let Vue;//保存Vue构造函数的引用,在1.和2.中使用,不对vue产生直接(import vue...)的依赖,否则将来打包就会特别大

// 1.实现一个类
class CRouter{
    //8. 
    // 解析routes
    // 监听事件
    // 声明组件

    // 构造函数:参数处理  options就是new router({options})中的options
    constructor(options) {
        // 8.1 参数保存备用
        this.$options = options;
        // 8.2 声明一个路由的映射对象{'/index':{路由备注对象component:Index,...}}
        this.routeMap = {}

        // 8.3当前url的监控,需要的是响应式的(用vue中data实现响应式),用到这个值的组件在值发生变化时都会重新渲染
        // Vue在3.和4.中保存到的
        this.app = new Vue({
            data: {
                current:'/',//当前url
            }
        })
    }

    // 9.初始化代码
    init() {
        this.bindEvents();//绑定事件
        this.createrouteMap()//创建映射
        this.initComponent()//声明组件
    }

    // 9.1
    bindEvents() {
        // hashchange  window.addEventListener('hashchange',fn)  fn是事件hashchange的回调函数,而我们要的this是CRouter的this,为了避免this丢失,我们在fn后绑定当前的this
        window.addEventListener('hashchange',this.onHashchange.bind(this))
    }
    onHashchange() { 
        console.log('path:',window.location.hash)
        // 作用:修改this.app中的current  slice(1)截取#号后面的部分
        this.app.current = window.location.hash.slice(1)||'/'
    }

    // 9.2
    createrouteMap() {
        // 遍历用户配置的路由数组
        this.$options.routes.forEach((route) => {
            // 方便以后通过路由拿到路由的配置信息
            this.routeMap[route.path] = route;
        }, this);
    }

    // 9.3组件初始化:主要声明两个组件router-link和router-view
    initComponent() {
        // 全局的声明在任何组件中能使用,而不需要在components中声明

        // 转换目标<a herf="/">xxx</a>
        // <router-link to=""></router-link>
        Vue.component('router-link', {
            props: {
                to:String
            },

            // 不能使用template和el，因为使用了render,要了解vue初始化代码，template和el只存在于render不在的情况下，render是vue2出的，vue1时可以使用template和el
            // template: '<a></a>',
            // el:'#app',


            // 渲染函数
            render(h) {
                // 9.3.1使用createElement韩式
                // //h(tag, data, children) (String, Object, Array)
                return h('a', {
                    // 设置特性要用attrs
                    attrs: {
                        href:'#'+this.to //因为我们现在实现的是hash模式路由跳转
                    }
                },[this.$slots.default]) //将a标签包裹的内容用插槽实现,内容相对于a来说是子元素,所以可以用插槽实现,  this.$slots.default默认插槽

                // 9.3.2使用JSX,react, 但是之后loader还是会转换成9.3.1,现在是因为cli3做好了配置所以我们现在才能用jsx
                // return <a href={'#' + this.to}>{this.$slots.default}</a>
            }
        })

        Vue.component('router-view', {
            // bug this指向错误，这里的this指向组件实例对象，不是CRouter，访问不了routeMap
            // render(h) {
            //     // 把当前地址的component拿出来  (component: Home import Home from './views/Home.vue')
            //     const Component = this.routeMap[this.app.current].component
            //     return h(Component)
            // }

            // 解决方案1：改用箭头函数，这样子这里的this就是该作用域上下文(CRouter)的this,这样就能取到routeMap\app... 
            // render: (h) => {
            //     const Component = this.routeMap[this.app.current].component
            //     return h(Component)
            // }

            // 解决方案2：函数式组件,react也有该概念。该组件只负责渲染，不负责业务逻辑和数据的获取...，所以router-view是函数式组件的典型例子
            // 源码： https://github.com/vuejs/vue-router/blob/dev/src/components/view.js
            functional: true,
            // render(目标，上下文)
            render(h, { parent }) {
                const router = parent.$router;//获取父组件的$router
                // 这里的this指的是router-view这个组件实例
                const Component = router.routeMap[router.app.current].component

                // 嵌套路由的解决方法<router-view>...<router-view></router-view>....</router-view>,源码26行，向上递归


                return h(Component)
            }


            // 解决方案3：this.$router.app
        })

        // ps:只要组件内Vue.component的render函数里面使用到某个响应式的数据(例如this.app.current),只要这个响应式数据发生变化，那么这个组件将重新执行render函数，所以组件的内容就会刷新
        //  （依赖收集：render中使用到vue.data里的数据，就会产生依赖，所以程序在执行render时就会执行一次依赖收集的过程，只要依赖的数据发生改变，与这个依赖相关的组件都会更新）
    }
}

// 2.静态方法,参数是vue的构造函数
CRouter.install = function (_Vue) {
    //4.引用
    Vue = _Vue;

    //为什么不在这里执行,因为在router中直接就Vue.use使用了,获取不到实例,执行install时实例还不在呢
    //(看router.js: 1.Vue.use(Router)之后再创建实例2.new router({})),所以这个时候还没有拿到实例, 拿不到this.$options.router
    //之后把代码用mixin延后到根组件beforeCreate才执行
    //总的来说就是实例创建时间问题
    // Vue.prototype.$router = this.$options.router
    

    // 5.实现一个混入操作,我们在生命周期写的东西会vue指定的生命周期执行
    Vue.mixin({
        beforeCreate () {
            //先执行混入的代码,之后再执行组件内的代码
            //用混入的目的:获取到CRouter实例,并且挂载到Vue.prototype,这样子每个组件都能用
            
            //7.确保在根组件beforeCreate时只执行一次
            if (this.$options.router) {
                // 6.创建$router
                Vue.prototype.$router = this.$options.router;
                //this.$option.router的获取是因为在根组件(下面四行代码)配置项中配置了一个router实例,所以我们可以在配置项中获取到router实例;(要确保只执行一次)
                // main.js中  new Vue({
                //     router, 
                //     render: h => h(App),
                // }).$mount('#app')
                console.log(this.$options)

                //10 路由器初始化
                this.$options.router.init()
            }
            
        }
    })
}

// 导出文件
export default CRouter;