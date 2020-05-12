<template>
    <div>
        {{foo}}
    </div>
</template>

<script lang="ts">
    // import { Component, Prop, Vue } from "vue-property-decorator";
    import { Vue } from "vue-property-decorator";

    /**
        component
        装饰器工厂
        将用户写的转换成配置对象
        返回一个vuecomponent的函数
     */
    // function Component(target: any){ //这里的target就是Decorator

    //     return Vue.extend({ //返回一个构造函数
    //         template:template
    //     })
    // }

    // @Component

    // 工厂函数里的工厂函数
    function Component(options: any){
        // 如果要扩展装饰器可以传递参数，多嵌套一层
        // 返回的才是装饰器函数
        return function Component(target: any){ //这里的target就是Decorator
            return Vue.extend(options)
        }
    }

    @Component({
        data() {
            return {
                foo:'jahsh'
            }
        },
    })
    export default class Decotator extends Vue {    //继承了vue构造函数
        
    }
</script>

<style scoped>

</style>
