/**
 * 1.创建传入组件实例
 * 2.挂载它从而生成dom结构$mount()
 * 3.生成dom结构追加到body
 * 4.淘汰机制：不需要时组件实例应当被销毁,防止内存泄漏
 *
 *
 *创建指定组件的实例
 *          1:Vue.extend()
 *          2:new Vue()
 */
import Vue from 'vue'
/* eslint-disable */

// 导出create函数             (创建的组件,属性)
export default function create(Component, props) {
    // // 1:Vue.extend({})
    // // 获取构造函数
    // const Ctor = Vue.extend(Component)
    // // new得到组件实例 传入构造参数propsData
    // const comp = new Ctor({propsData:props})
    // comp.$mount();
    // document.body.appendChild(comp.$el)
    // comp.remove = () => {
    //     // 移除dom
    //     document.body.removeChild(comp.$el)
    //     // 销毁组件,释放内存
    //     vm.$destroy();
    // }


    // 2:new Vue()
    // 1 创建一个vue实例 => 创建一个根,Component通过渲染函数变成这个实例的子组件
    const vm = new Vue({
        // template 和 component区别,
        // template:'<Component></Component>',//以字符串的形式传入,在有编译器环境下才可以使用,cli3不带编译器,所以现在只能用render函数,而且template在之后通过编译器都会转成render函数

        // 渲染函数
        render(h) { // h即是createElement(tag标签名称, data键值对形式, children)
            // 作用:返回虚拟dom(用js对象描述)
            return h(Component, {props})
        }
    // 通过$mount()挂载,将虚拟DOM变成正式DOM
    }).$mount(); // 只挂载，不设置宿主，意思是执行初始化过程，但是没有追加dom操作
    // 错误:$mount(document.body)如果挂载在body上,直接替换body,原本的内容没了,相当于outerHtml, 

    // 2 需要的是innerHtml
    document.body.appendChild(vm.$el)

    // 3 获取组件实例  (用$children[0]获取,只是刚好就一个子组件,)
    const comp = vm.$children[0]
    
    // 附加一个删除方法,方便以后释放资源
    comp.remove = () => {
        // 移除dom
        document.body.removeChild(vm.$el)
        // 销毁组件,释放内存
        vm.$destroy();
    }


    return comp;

}


// 创建是自上而下(new Vue根组件先创建,之后遍历创建子组件),挂载是自下而上(子组件找父组件,挂载就是相互设置一个引用关系)