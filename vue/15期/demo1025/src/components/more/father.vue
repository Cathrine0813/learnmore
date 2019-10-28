<template>
  <div>
      <h1>{{father}}</h1>
    <my-son></my-son>
  </div>
</template>
<script>
import mySon from './son'
export default {
    name:'father',
    // 接收祖辈的传值，数组/对象写法
    inject:['father'],
  data () {
      return {
          
      }
  },
  components: {
      mySon
  }
}
</script>
