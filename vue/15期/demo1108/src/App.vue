<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
      <!--使用图标svg-->
        <svg>
          <!--添加命名空间xlink, value是symbolId -->
          <use xlink:href="#icon-delete"></use>
        </svg>
        ----
        <!--全局组件-->
        <svg-icon icon-class="delete"></svg-icon>
      Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import '@/icons/svg/delete.svg' // 这个是给webpack用的
// 使用了svg之后在控制台中可以看到body下添加了个元件库<svg></svg>,之后所有元件都会放在<symbol></symbol>里面，属性id就是我们定义的symbolId

export default {
  
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
