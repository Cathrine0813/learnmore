import store from "@/store";

// 声明指令(实际上是一个配置对象)
// <button v-permission="['admin']">admin</button>
const permission = {
    /**
     * 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
     * el：指令所绑定的元素，可以用来直接操作 DOM 。
        binding：一个对象，包含{name，value，oldValue，expression，arg，modifiers}
        vnode：Vue 编译生成的虚拟节点。
        oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
     *
     */
        
    // 设置一些核心的生命周期钩子函数，挂载在某个元素中
    inserted(el, binding) {
        // 获取指令的值：按钮要求的角色数组
        const { value:pRoles } = binding;
        // 获取用户角色 （全局的getters获取roles）
        const roles = store.getters && store.getters.roles;

        if (pRoles && pRoles instanceof Array && pRoles.length > 0) {      
            // 判断用户角色中是否有按钮要求的角色
            const hasPermission = roles.some(role => {
                return pRoles.includes(role);
            });

            // 如果没有权限则删除当前dom
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`);
        }
    }
};

export default permission;

/**
 *
 *  钩子函数
        一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

        bind：只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置。

        inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。

        update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

        componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

        unbind：只调用一次，指令与元素解绑时调用。
 *
 */

