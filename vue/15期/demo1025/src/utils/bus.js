// 创建事件总线，像观察者模式
// Bus:事件派发、监听、回调处理
export default class Bus {
    // 构造器
    constructor() {
        this.callbacks = {}
    }

    // 监听
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || []  //数组，可能多个事件
        this.callbacks[name].push(fn)
    }

    // 派发
    $emit(name, args) {
        if (this.callbacks[name]){
            this.callbacks[name].forEach((cb) => cb(args));
        }
    }
}

// main.js
// Vue.prototype.$bus = new Bus()

// child1
// this.$bus.$on('foo',handle)

// child2
// this.$bus.$emit('foo')


// 在vue中可以直接使用$on、$emit,因为vue中已经实现了观察者模式