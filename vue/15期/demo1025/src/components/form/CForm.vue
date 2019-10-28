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
        }
    }
</script>
