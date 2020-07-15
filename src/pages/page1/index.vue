<template>
  <div class="contain">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  <router-link :to="{ name:'Mytable' , params: { color: 'red' }}"><el-menu-item index="1">处理中心</el-menu-item></router-link>
  <router-link :to="{ path:'/page1/index/grid' }"><el-menu-item index="2">消息中心</el-menu-item></router-link>
  <router-link :to="{ path:'/page1/index/form' }"><el-menu-item index="3">数据中心</el-menu-item></router-link>
   </el-menu>
  <router-view></router-view>
  </div>
</template>
 
<script>
  export default {
    data() {
      return {
        activeIndex:'1'
      }
    },
   
    methods: {
      
    }
  }
</script>
 
<style scoped>
 a{
    text-decoration:none;
    display: inline-block
}
</style>