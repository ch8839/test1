<template>
  <div :class="classObj" class="app-wrapper">
   <sidebar class="sidebar-container"/>
   <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>
 
<script>
import { Navbar, Sidebar, AppMain } from './components'
  export default {
    
    data() {
      return {
        msg:'侧边栏'
      }
    },
    components:{Navbar, Sidebar, AppMain},
    methods: {
     
    },
    computed:{
      sidebar() {
      return this.$store.state.app.sidebar
    },
      classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
      }
    }
    }
  }
</script>
 
<style scoped lang="scss">
// @import '@/styles/index.scss';
#app {

  @mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
    // 主体区域 Main container
    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: 180px;
      position: relative;
    }
  
    // 侧边栏 Sidebar container
    .sidebar-container {
      transition: width 0.28s;
      width: 180px !important;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
  
    }

    .hideSidebar {
      .sidebar-container {
        width: 42px !important;
      }
  
      .main-container {
        margin-left: 42px;
      }

  }
}
  
</style>