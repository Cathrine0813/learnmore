<template>
  <div id="app">
    <!--20191029插件-->
    <div style="border-bottom:2px solid #333;">
      <router-link to="/">HOME</router-link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <router-link to="/about">ABOUT</router-link>
      <!--路由视图-->
      <router-view></router-view>
    </div>
    

    <!--20191025组件-->
    <!--模拟element表单组件-->
    <c-form></c-form>

    <!--用递归recursion思想创建组件-->
    <c-tree></c-tree>


    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 1: 父子通讯-->
    <HelloWorld 
      msg="父子组件通讯"
      attrtest="$attrs测试"
      ref="childref"
      @myclick="onMyclick($event,'粑粑')"
    />

    <!-- 2: 兄弟组件通讯：$parent,$root-->
    <HelloWorld 
      msg="兄弟组件通讯"
    />

    <!-- 3: 祖先与后代通讯：provide/inject祖先给后代传值,没有后代给祖先传
        $dispatch向上通讯 
        $boardcast向下通讯 -->
    <my-father></my-father>

    <!--任意两个组件中间：
        1、事件总线(创建一个总线负责派发、监听、回调事件，例如观察者模式,$emit, $on, $off 分别来分发、监听、取消监听事件)
        2、vuex（终极方案，创建唯一的全局数据管理者store管理数据并且通知组件状态更新）
            （不能用$root代替vuex）-->


    <!-- 4: 插槽-->
    <SlotTest>  
      <!--不起名字就是默认的插槽位置，匿名插槽-->
      <template>匿名插槽</template>
      
      <!--具名插槽使用-->
      <template v-slot:myname>名字叫myname的插槽位置</template>

      <!--作用域插槽:
            子组件传递数据到父组件, slotProps是子组件带过来的数据对象
            原理：是将作用域插槽变成一个函数，这个函数在子组件里会被执行，所以就能获取到子组件的数据并且执行
            场景：显示子组件数据
          v-slot:插槽名="作用域上下文"
      -->
      <template v-slot:wantdata="slotProps">1、{{slotProps.newData}}</template>
      <!--可以使用解构获取-->
      <!--<template v-slot:wantdata="{newData}">2、{{newData}}</template>-->
    </SlotTest>

    <Communicate></Communicate>
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import myFather from './components/more/father'
import SlotTest from './components/SlotTest.vue'

import CForm from './components/form/index'
import CTree from './components/tree/index'

import Communicate from '@/components/communicate/index'

export default {
  name: 'app',
  // 祖先给后台传值
  provide(){
    return{
      father:'grandefather to father',
      son:'grandefather to son',
    }
  },
  components: {
    HelloWorld,
    myFather,
    SlotTest,
    CForm,
    CTree,
    Communicate
  },
  mounted () {
    // this.$ref['childref'].refTest 
    this.$refs.childref.refTest = '父组件使用ref改变子组件的值';

    // 使用$children（数组）访问自定义子组件，但是子组件实例的顺序是无法保证的,有的组件可能是异步的，是需要时间才渲染出来，
    // this.$children[0].refTest = '父组件使用$children改变子组件的值';
    

  },
  methods: {
    onMyclick(e,text){
      console.log('子组件通过$emit向父组件派发事件，父组件通过$on监听事件； ')
      console.log(e,text)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
