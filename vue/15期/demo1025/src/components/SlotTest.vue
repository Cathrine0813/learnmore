<template>
  <div>
    <h1>插槽</h1>
    <!--匿名插槽-->
    <p><slot></slot></p>

    <!--具名插槽-->
    <p><slot name="myname"></slot></p>

    <!--作用域插槽-->
    <p><slot name="wantdata" :newData="newData"></slot></p>
  </div>
</template>
<script>
export default {
  name:'slottest',
  data () {
    return {
      newData:'作用域插槽数据'
    }
  }
}
</script>
