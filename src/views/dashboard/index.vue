<template>
  <div class="dashboard-container">
    <p>土壤监测管理平台</p>
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    p {
      text-align: center;
      font-family: "微软雅黑";
      font-size: 50px;
      font-weight: 500;
      color: #909399
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    color: #1989fa
  }
}
</style>
