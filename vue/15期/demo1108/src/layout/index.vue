<template>
  <div class="app-wrapper">
    <!-- 导航 -->
    <side-menu></side-menu>
    <!-- <sidebar class="sidebar-container" /> -->
    <!-- 内容 -->
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'

export default {
  components:{
    SideMenu
  }
}
</script>
