<template>
<div class="contain">
  <div class="head">
    head
  </div>
<div class="content">
  <div class="nav">
    nav
  </div>

  <div class="main">
    main
  </div>

  <div class="right">
    right
  </div>
</div>
  <div class="foot">
    foot
  </div>

</div>
</template>
 
<script>
  export default {
    data() {
      return {
       
      }
    },
    methods: {
     
    }
  }
</script>
 
<style scoped>
  .contain{
    width: 80%;
    height: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto
  }
  .head{
    width: 100%;
    flex: 0 0 20%;
    background: #000000
  }
  .content{
    display: flex;
    width: 100%;
    flex: 1
  }
  .nav{
    flex: 0 0 20%;
    background: #99e9e2
  }
  .main{
    flex:1;
    background: #dfc2c2
  }
  .right{
    flex: 0 0 20%;
    background: #9ac2f0
  }
  .foot{
    width: 100%;
    flex: 0 0 20%;
    background: #000000
  }
  
 
</style>