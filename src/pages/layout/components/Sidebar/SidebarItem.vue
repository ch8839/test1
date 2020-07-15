<template>
  <div v-if="!item.hidden" class="menu-wrapper">

    <template v-if="item.children.length==1">
      <router-link :to="handlePath(item.path , item.children[0].path)">
        <el-menu-item :index="item.children[0].id">
          {{item.children[0].name}}
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.id">
      <template slot="title">
        <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
      </template>
      <el-menu-item-group>
        <router-link  v-for="(child,index) in item.children" :key="index" :to="handlePath2(item.path, child.path)">
          <el-menu-item :index="child.id">{{child.name}}</el-menu-item>
        </router-link>
     </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
import Item from './Item'


export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }

  },
  mounted(){
      console.log("传递的路由表", this.item)
  },

  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    
    return {}
  },
  methods: {
   
    handlePath(path1, path2) {
     let res ={ path:path1+'/'+path2 }
      return res
    },
    handlePath2(path1, path2){
      let res ={ path:path1+'/'+path2 }
      return res
    }
  }
}
</script>

<style scoped lang="scss">
a{
    text-decoration:none //去掉A链接下划线样式
}
</style>
