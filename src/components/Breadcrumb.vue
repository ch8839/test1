<template>
  <div class="contain">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: '/'+item }"
        v-for="(item,index) in RouteList"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {},
  data() {
    return {
      RouteList: []
    };
  },
  methods: {
    getRouteList() {
      let arr = this.$route.path.split("/");
      arr.shift();
      console.log(arr);
      this.RouteList = arr;
    }
  },
  mounted() {
      this.getRouteList()
  },
  watch: {
    $route() {
      this.getRouteList();
    }
  }
};
</script>

<style scoped>
.contain{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
}
</style>
