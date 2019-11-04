// 编译器
/**
 *  遍历模板，分析其中哪些地方用到data中的key以及事件等指令
 *  这时就认为时一个依赖，那么我们就创建一个watcher实例，使界面中的DOM更新函数和那个key挂钩
 *  如果更新了key，则执行这个更新函数
 *
 *  获取DOM => 判断节点/插值文本
 *
 */
class Compiler{
    // el:宿主元素（选择器）
    // vm: CVue实例
    constructor(el, vm) {
        this.$vm = vm;

        this.$el = document.querySelector(el);

        // 执行编译
        this.compile(this.$el)
    }

    compile(el) {
        // 获取子元素
        const childNodes = el.childNodes;

        Array.from(childNodes).forEach(node => {
            // 判断类型：节点/文本
            if (this.isElement(node)){
                // 元素 <div></div>
                // console.log('编译元素：'+node.nodeName)

                this.compileElement(node)
            } else if (this.isInter(node)){
                // 插值文本 {{ xxx }}
                // console.log('插值文本：'+ node.textContent)

                // 编译插值文本
                this.compileText(node)
                
            }

            // 递归可能存在子元素
            this.compile(node)
        })

    }

    isElement(node) {
        return node.nodeType === 1
    }
    compileElement(node) {
        // 获取属性
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // c-text="exp"
            const attrName = attr.name //c-text
            const exp = attr.value //exp

            // 是否指令 c-
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2) //text
                // 执行相应的更新函数
                this[dir] && this[dir](node, exp)
            }
        })
    }
    isDirective(attr) {
        return attr.indexOf('c-') == 0;
    }
    text(node, exp) {
        this.update(node, exp, 'text')
    }


    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    compileText(node) {
        // 赋值
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node,RegExp.$1,'text')
    }


    // update函数：负责更新DOM,同时创建watcher实例，在两者中间挂钩
    //node操作节点 exp表达式 dir指令（v-model...）
    update(node, exp, dir) {
        //创建指令函数，首次初始化
        const updateerFn = this[dir + 'Updater'];
        updateerFn && updateerFn(node, this.$vm[exp])

        // 更新，和watcher建立关系  (实例， 表达式，更新函数)
        new Watcher(this.$vm, exp, function (value) {
            // watcher给最新的值，这里做dom操作
            updateerFn && updateerFn(node, value)
            
        })
        
    }
    textUpdater(node, value) {
        node.textContent = value;
    }
}