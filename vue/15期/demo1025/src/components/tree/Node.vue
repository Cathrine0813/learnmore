<template>
  <div>
    <!--<p  @click.stop.self='handleShow'>{{data.title}}</p>-->
    <p  @click.stop.self='$emit("nodeClick",data)'>
      <span v-if="isFolder">{{ showSon ? '-' : '+'}}</span>
      {{data[props.label]}}
    </p>
    
    <!--针对name,递归组件就是自己套自己-->
    <Node 
      v-for="item in data[props.children]" :key="item.id" 
      :data="item" :props="props" 
      v-show="showSon"
    >
    </Node>
    
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name:'Node', // name对递归组件是必要的
  props:{
    data: {
        type: Object,
        require: true 
    },
    props: {
        type: Object,
        require: true 
    },
  },
  data () {
    return {
      showSon:false
    }
  },
  computed: {
    isFolder(){
      return this.data[this.props.children] && this.data[this.props.children].length
    }
  },
  mounted(){
    this.$on('nodeClick', (data)=> {
      console.log('子',data)
      this.showSon=!this.showSon
    })
    // this.$on("dispatch", msg => {
    //   this.msg = "接收dispatch消息:" + msg;
    // });
    // this.$parent.$emit('nodeClick',this.data)
    // this.$bus.$emit('nodeClick',this.data)
  },
  methods:{
    
  }
  
}
</script>

<style scoped>

</style>

