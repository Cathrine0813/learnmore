<template>
  <div class="hello">

    <!-- 1、父 => 子 -->
    <!--props-->
    <h1>{{ msg }}</h1>
    <!-- $attrs:子组件没有声明，父组件传递了过来，用$attrs能拿到所有没有声明的值 -->
    <p>{{$attrs.attrtest}}</p>
    <!-- ref -->
    <p>{{refTest}}</p>


    <!-- 2、子 => 父 -->
    <!--子组件派发自定义事件，父组件监听-->
    <p @click="$emit('myclick', '$event传递该参数')">子组件$emit(派发)向父组件$on(监听)通讯,实际上是父组件的监听在将来一定会附加在子组件上面，所以是子组件派发，子组件监听</p>

    <!-- 3、兄弟通讯 -->
    <p @click="brotherTest" >兄弟间通讯，通过共同的parent/root祖辈实现，但是不推荐</p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'HelloWorld',
  // props 子组件定义，父组件传递
  props: {
    msg: String
  },
  data () {
    return {
      refTest:''  
    }
  },
  created () {
    // 兄弟组件通讯,监听事件(需要处理一下排除自己)
    this.$parent.$on('hiBrother',()=>{
      console.log('来自兄弟的问候',this)
    })
  },
  mounted () {
    console.log(this.$attrs)
  },
  methods: {
    brotherTest(){
      // 用$parent派发事件
      this.$parent.$emit('hiBrother')

    },
    _testLabel(){
      // var num = 0;
      // // label语句
      // outermost:
      // for (var i = 0; i < 10; i++) {
      //  for (var j = 0; j < 10; j++) {
      //    if (i==5 && j==5) {
      //     //  break outermost; //强制跳出两个循环
      //      continue outermost; //终止当前j循环，继续i循环
      //    }
         
      //  }
        
      // }
    },
    _testWith(){
      // var qs = location.search.substring(1);
      // var hostName = location.hostname;
      // var url = location.href;

      // with(location){
      //   var qs = search.substring(1);
      //   var hostName = hostname;
      //   var url = href;
      // }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
