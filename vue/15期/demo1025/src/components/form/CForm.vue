<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
    /* eslint-disable */
    export default {
        // 要将数据给下面的子代inject使用
        provide(){
            return{
                // 将整个表单组件实例（this）传递过去
                form:this
            }
        },
        props:{
            model:{
                type:Object,
                required:true
            },
            //   检验規則
            rules:{
                type:Object
            }
        },
        methods:{
            // 设置全局的校验方法,供外部调用
            validate(cb){
                // 调用所用fornitem的validate,只要失败就返回false,有可能是异步的,去服务器看结果,所以不能直接判断,要通过promise
                // item.validate()会返回promise,map之后会返回一个新的promise数组
                const tasks = this.$children
                    .filter(item => !!item.prop)  //将需要校验的的过滤出来,不需要的例如button去掉
                    .map(item => item.validate())
                // console.log(this.$children)
                // 判断所有的结果,调用promise.all方法,其中有挂了的会通过catch返回
                Promise.all(tasks)
                    .then(()=> cb(true))
                    .catch(()=>cb(false))
            }
            
        }
    }
</script>
