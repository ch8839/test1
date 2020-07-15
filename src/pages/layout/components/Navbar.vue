<template>
  <div class="navbar">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb />
      <el-dropdown trigger="click" class="dropdown">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link :to="{ path: '/index'}">
          <el-dropdown-item icon="el-icon-plus">首页</el-dropdown-item>
        </router-link>
        <router-link :to="{ path: '/login'}">
          <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
        </router-link>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed:{
    ...mapGetters([
      'sidebar'
    ])
  },
  methods:{
      toggleSideBar(){
          this.$store.dispatch('ToggleSideBar')
      }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 10%;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
}

.dropdown{
  display: inline-block;
  position: absolute;
  right: 35px
}
</style>
