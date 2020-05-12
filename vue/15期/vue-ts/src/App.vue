<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"
      @add-feature="onAddfeature"/>
    <Decorator />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Decorator from './components/Decorator.vue';
import Feature from './models/feature';

@Component({
  components: {
    HelloWorld,
    Decorator
  },
})
export default class App extends Vue {
  // 监听事件
  onAddfeature(f: Feature){
    alert('新增特性'+f.name)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
