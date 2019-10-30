<template>
  <div id="app">
    <h2>Parent</h2>
    <h3>{{msg}}</h3>
    <child1 :title="title1" @getmsg="getmsg"></child1>
    <child2></child2>
  </div>
</template>

<script>
import Child1 from "@/components/communicate/Child1";
import Child2 from "@/components/communicate/Child2";

/**
 * $dispatch向上通讯 
 *    首先会在自己实例本身上触发，然后沿父链向上传播
 * $boardcast向下通讯 
 *    它向下传播到当前实例的所有后代。
 * 
 * $bus全局
 * 
 */
export default {
  name: "app",
  // 向后代传递
  provide: {
    woniu: "我是骚气的Jerry老师"
  },
  data() {
    return {
      msg: "",
      title1: "我是你爸爸"
    };
  },
  methods: {
    getmsg(msg) {
      this.msg = msg;
    }
  },
  components: { Child1, Child2 },
  mounted() {
    this.$on("dispatch", msg => {
      this.msg = "接收dispatch消息:" + msg;
    });
    this.$bus.$on("event-bus", msg => {
      this.msg = "接收event-bus消息:" + msg;
    });
  }
};
</script>
<style scoped>
div {
  border: 3px blue solid;
  padding: 10px;
  display: inline-block;
  vertical-align: top;
  /* width:50%; */
}
h1,
h2 {
  font-size: 18px;
  margin: 5px 0;
}
h3 {
  color: red;
  font-size: 14px;
}
</style>