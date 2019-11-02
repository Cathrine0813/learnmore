<template>
  <div class="hello" @click="$emit('myclick')">
    <h1>{{ msg }}</h1>
    <!-- vuex -->
    <div>
        <!--$store.state获取数据-->
      <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
      <!-- <span>还剩{{$store.getters.left}}个</span> -->
      <p>
        <button @click="add">扔一个</button>
        <button @click="asyncAdd">蓄力扔一个</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      xx: "xx"
    };
  },
  created() {
    
  },
  methods: {
    sayHello() {
      this.$parent.$emit("hiBrother");

      this.$root.bar = "barrrrrr";
    },
    add() {
        // 直接改变数据commit到mutation
      this.$store.commit("increment");
    },
    asyncAdd() {
        // 处理异步使用dispatch到action在commit到mutation改变数据
      this.$store.dispatch("asyncIncrement").catch(() => {
        alert("投掷失败！没货啦");
      });
    }
  }
};
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
