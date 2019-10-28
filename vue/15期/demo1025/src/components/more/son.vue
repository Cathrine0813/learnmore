<template>
  <div>
    <p>{{son}}</p>
  </div>
</template>
<script>
export default {
  name:'son',
  inject: {
    son:{
          type:String
      }
  }
}
</script>
