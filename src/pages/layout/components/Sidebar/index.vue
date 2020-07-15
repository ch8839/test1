<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <sidebar-item
        v-for="(route,index) in permission_routers"
        :key="index"
        :item="route"
      />
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Example</span>
        </template>

        <el-menu-item-group>
          <router-link :to="{ path: '/example/table'}">
            <el-menu-item index="1-1">table</el-menu-item>
          </router-link>

          <router-link :to="{ path: '/example/form'}">
            <el-menu-item index="1-2">form</el-menu-item>
          </router-link>

          <router-link :to="{ path: '/example/grid'}">
            <el-menu-item index="1-3">grid</el-menu-item>
          </router-link>

          <router-link :to="{ path: '/example/flex2'}">
            <el-menu-item index="1-4">圣杯布局</el-menu-item>
          </router-link>

          <router-link :to="{ path: '/example/flex3'}">
            <el-menu-item index="1-5">输入框布局</el-menu-item>
          </router-link>
        </el-menu-item-group>
        
          

        <el-submenu index="1-4">
          <template slot="title">Menu</template>
            <router-link :to="{ path: '/example/menu/menu1-1'}">
              <el-menu-item index="1-4-1">Menu1</el-menu-item>
            </router-link>
        </el-submenu>
      </el-submenu>

      <router-link :to="{ path: '/page1/page'}">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
          <span slot="title">页面1</span>
      </el-menu-item>
      </router-link>
      
      <router-link :to="{ path: '/page2'}">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>        
          <span slot="title">页面2</span>       
      </el-menu-item>
      </router-link>

      <router-link :to="{ path: '/page3'}">
      <el-menu-item index="5">
        <i class="el-icon-document"></i>        
          <span slot="title">页面3</span>       
      </el-menu-item>
      </router-link>-->
    </el-menu>
  </el-scrollbar>
</template>
 
<script>
import { mapGetters } from "vuex"
import SidebarItem from './SidebarItem'
export default {
  data() {
    return {};
  },

  components:{ SidebarItem },

  computed: {
    ...mapGetters(["sidebar"]),

    isCollapse() {
      return !this.sidebar.opened;
    },

    permission_routers() {
      return [
        {
          path: "/",
          redirect: "/index",
          name: "Index",
          hidden: true,
          children: [
            {
              path: "index",
              component: () => import("@/pages/index/index")
            }
          ]
        },

        {
          path: "/example",
          redirect: "/example/table",
          name: "Example",
          id:'0',
          children: [
            {
              path: "table",
              name: "table",
              id:'0-1',
              component: () => import("@/pages/table/index")
            },
            {
              path: "grid",
              name: "grid",
              id:'0-2',
              component: () => import("@/pages/grid/index")
            },
            {
              path: "flex2",
              name: "flex2",
              id:'0-3',
              component: () => import("@/pages/flex2/index")
            },
            {
              path: "flex3",
              name: "flex3",
              id:'0-4',
              component: () => import("@/pages/flex3/index")
            },
            {
              path: "form",
              name: "form",
              id:'0-5',
              component: () => import("@/pages/form/index")
            },
            {
              path: "ui",
              name: "ui组件实现",
              id:'0-6',
              component: () => import("@/pages/ui/index")
            }
          ]
        },
        {
          path: "/page1",
          children: [
            {
              path: "index",
              name: "page1",
              id:'1',
              component: () => import("@/pages/page1/index")
            }
          ]
        },
        {
          path: "/page2",
          children: [
            {
              path: "index",
              name: "page2",
              id:'2',
              component: () => import("@/pages/page2/index")
            }
          ]
        },
        {
          path: "/page3",
          children: [
            {
              path: "index",
              name: "page3",
              id:'3',
              component: () => import("@/pages/page3/index")
            }
          ]
        },
        {
          path: "/page-test",
          children: [
            {
              path: "index",
              name: "Page-Test",
              id:'4',
              component: () => import("@/pages/page-test/index")
            }
          ]
        }
      ];
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
 
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
}
.scrollbar-wrapper .el-scrollbar__view {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}

.el-menu-item-group__title {
  padding: 0px !important;
}
/* .el-menu-vertical-demo .el-submenu__title{
    padding-left: 1px !important
  } */
.el-menu-vertical-demo a:active {
  color: rgba(0, 0, 0, 0);
}
.el-submenu .el-menu-item {
  min-width: auto;
}
.el-scrollbar__wrap{
  overflow: hidden;
}
</style>