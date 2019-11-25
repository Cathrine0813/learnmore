<template>
  <div id="app">
    <ul>
      <!--
        处理好的菜单路由$store.state.permission.routes
        key： path不会重复
        base-path：处理路由（父路由是完整的，计算根路由的超链接，需要拼接处理）
      -->
      <item class="item" 
        v-for="route in $store.state.permission.routes"
        :model="route"
        :key="route.path" 
        :base-path="route.path"></item>
    </ul>
  </div>
</template>
<script>
import Item from "./Item.vue";
export default {
  components: { Item }
};
</script>