/**
 * Vuex
 * 设计思想：单向数据流（为了实现程序可控、错误可追踪、数据可维护）
 *
 * 
 *        (dispatch)  (commit)    (mutate)  (render)
 * component => actions  => mutations => state => component
 *         (复杂的业务逻辑) (改变数据)  (存放响应式数据)
 *
 *  数据在组件里只能用不能改，为了保持单向数据流，能改的只能是vuex里的store中的mutation/通过action用mutation去改state里的值
 *
 * state里的数据是响应式的，当数据发生改变，component就会发生改变
 *
 *（因为vue-router和vuex都使用到vue的响应式数据，所以他们的关系都是紧耦合的关系，所以只能在vue的项目中使用）
 *
 */

let Vue;

class Store{
    constructor(options) {
        // 1、持有state,并使其响应化
        // this.state是Vue的实例，可以直接访问this.state中的数据
        this.state = new Vue({ data : options.state})
        // this.state = new Vue({ data : options.state}).$data

        this.mutations = options.mutations
        this.actions = options.actions
        // this.getters = options.getters

        // 事件this指向绑定,因为在执行过程中this容易丢失，函数中调函数上下文丢失
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    // 2、实现commit和dispatch方法
    commit(type,arg) {
        this.mutations[type](this.state,arg)
    }

    dispatch(type, arg) {
        const store = this //当前实例上下文，方便解构获取各个方法
        return this.actions[type](store,arg)
    }


}

// 声明插件 静态install  _Vue是形参，会传入vue的构造函数，use会将vue传进来
function install(_Vue) {
    Vue = _Vue;
    // 使用混入,实例是后创建，use是先执行
    Vue.mixin({
        beforeCreate() {
            // 这里的this指向组件实例  this.$options.store是因为在main.js中根组件中有传入
            if (this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


// 导出vuex
export default {Store, install}