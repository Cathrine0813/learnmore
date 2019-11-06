/**
 * new Mvvm()
 *
 * 创建一个观察者Observer函数：劫持监听所有属性，data中的属性，遍历data中所有的属性，之后对每一个属性都执行Object.defineProperty（响应化过程），之后data的数据都会杯拦截起来，
 *
 * 之后对data的属性进行依赖收集，就是编译过程compile，遍历用户写的模板，将页面中有使用这些属性的地方收集起来（创建一个监视器watcher），
 *
 * 监视器watcher会将update更新函数、render渲染函数 以及 data中的属性建立关系（承担中间人的角色，负责监视界面中谁和属性建立了关系）
 *
 *
 *      *因为现在一个属性引用一个watcher，所以当页面多次引用同一个属性时，会创建多个watcher，所以将同一个属性的watcher改变成由一个Dep负责（observer => dep => watcher）
 *
 *
 */


/**
 *  new vue({
 *      data:{}
 *
 * })
 *
 *
 */


class CVue { 
    // 1、数据响应化
    constructor(options) {
        this.$options = options

        // 处理data
        this.$data = options.data;

        // 实现响应化Object.defineProperty,遍历data中的属性
        this.observer(this.$data)


        // 2、依赖收集(编译过程)[在vue中是在render中执行的，]
        // new Watcher(this, 'test');
        // this.test;
        new Compiler(options.el, this)

        // 执行钩子函数
        if (options.created){
            options.created()
        }
    }

    // data中的属性不一定时object,所以要处理一下 data:{ foo:{}, num:1}
    observer(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        // 遍历的必须是对象
        Object.keys(data).forEach(key => {
            // 定义响应式，传入原始data，和属性，描述符
            this.defineReactive(data, key, data[key])
            // 代理data中的属性到vue实例上
            this.proxyData(key)
        })



        
    }
    // 响应化处理（创建闭包）
    defineReactive(obj, key, val) {
        // 当data中属性中还有下一层属性a:{b:{c:'111'}},我们需要递归一下遍历所有属性
        this.observer(val)

        // ********在这里创建Dep实例,每一个key对应一个Dep
        const dep = new Dep()
        // ******* 

        Object.defineProperty(obj, key, {
            get() {
                // ********对这个值访问的时候才做依赖收集
                Dep.target && dep.addDep(Dep.target)
                // ********

                // 通过函数把变量暴露给外界（典型的闭包），所以就会一直保留属性的key和值val,保存了应用程序的状态（闭包的特性）
                return val
            },
            set(newVal) {
                if (newVal === val){
                    return;
                }
                // 如果在setter中直接改变data中的值，就会造成无限循环，所以我们通过函数46行defineReactive，定义一个局部作用域val变量，这个时候就会产生一个闭包
                val = newVal;
                // ********通知更新
                dep.notify()
                // *******
            }
        })
    }
    // 代理数据,转发
    proxyData(key) {
        // 需要给vue实例定义属性
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }


}

// 创建大管家Dep：和data中的每一个key对应起来，主要负责管理相关的watcher,相当于订阅
class Dep{
    constructor() {
        // 管理的依赖，watcher数组
        this.deps = [];
    }
    // 创建watcher和dep的关系
    addDep(dep) {
        this.deps.push(dep)
    }
    // 通知，发布订阅
    notify() {
        // 通知deps执行更新,其实是对应的watcher中的update更新函数
        this.deps.forEach(dep => dep.update())
    }
}

// Watcher :负责创建data中的key和更新函数的映射关系，key一发生变化，就执行更新函数
class Watcher{
    // 保存当前的vue实例，之后访问对应的key
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        this.cb = cb; //回调函数，由编译器传入        

        // 设置当前实例，把当前watcher实例添加到Dep静态属性target上
        Dep.target = this;
        this.vm[this.key];//读一下，触发收集依赖---78行
        Dep.target = null; //防止多次加入，出现性能问题

    }

    // 更新对应的DOM,或者diff算法的引线工作
    update() {
        // console.log(`${this.key}更新了`)
        this.cb.call(this.vm, this.vm[this.key]) //这里看编译器那边的回调函数
    }
}