<template>
  <div class="contain">
   menu1
  </div>
</template>
 
<script type="text/babel">
  export default {
    data() {
      return {
        msg:'侧边栏'
      }
    },
    methods: {
     
    }
  }
</script>
 
<style scoped>
  .contain{
      display: flex;
      justify-content: center;
      align-items: center
  }
  .contain button{
      padding: 10px;
      border-radius: 2px;
      background: #409EFF;
      color: #fff;
      border: none
  }
</style>