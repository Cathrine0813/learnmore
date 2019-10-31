<template>
  <div>
    <p  @click.stop.self='handleClick'>
    <!--<p  @click.stop.self='$emit("nodeClick",data)'>-->
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
      // tree Object
      tree:null,
      showSon:false
    }
  },
  computed: {
    isFolder(){
      return this.data[this.props.children] && this.data[this.props.children].length
    }
  },
  mounted(){
    // this.$on('nodeClick', (data)=> {
    //   console.log('子',data)
    //   this.showSon=!this.showSon
    // })
    // this.$on("dispatch", msg => {
    //   this.msg = "接收dispatch消息:" + msg;
    // });
    // this.$parent.$emit('nodeClick',this.data)
    // this.$bus.$emit('nodeClick',this.data)
  },
  methods:{
    handleClick(){
      this.showSon=!this.showSon

      this.tree.$emit('nodeClick', this.node.data, this.node, this);

      //  const store = this.tree.store;
      //   store.setCurrentNode(this.node);
      //   this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      //   this.tree.currentNode = this;
      //   if (this.tree.expandOnClickNode) {
      //     this.handleExpandIconClick();
      //   }
      //   if (this.tree.checkOnClickNode && !this.node.disabled) {
      //     this.handleCheckChange(null, {
      //       target: { checked: !this.node.checked }
      //     });
      //   }
      //   this.tree.$emit('node-click', this.node.data, this.node, this);
    }
  }
  
}
</script>

<style scoped>

</style>

