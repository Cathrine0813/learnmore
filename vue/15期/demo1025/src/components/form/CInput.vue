<template>
  <div>
      <!--input事件处理，值赋值; -->
      <input :type="type" @input="onInput" :value="value" v-bind="$attrs">
      <!--
          v-bind="$attrs"理解成属性展开运算符，例如placeholder。。/
          只使用这个会有个影响，就是会将属性赋到这个组件的根节点上，为了解除这个副作用，我们要设置inheritAttrs:false,让子组件不要继承这个属性到根节点上
      -->
  </div>
</template>

<script>
/* eslint-disable */

    export default {
        inheritAttrs:false,
        props:{
            type:{
                type:String,
                default:'text'
            },
            value:{
                type:String,
                default:''
            }
        },
        methods: {
            onInput(e){
                // 事件派发,当值改变的时候，把数据派发给父组件，单向数据流
                this.$emit('input',e.target.value)

                // 通知校验
                this.$parent.$emit('validate')//事件谁派发谁监听
            }
        }
    }
</script>

