<template>
  <div class="contain">
   <!-- <table>
     <thead>
       <tr></tr>
     </thead>
   </table> -->
   <div class="table-head">
     <div>ID</div>
     <div>Title</div>
     <div>Author</div>
     <div>Pageviews</div>
     <div>Status</div>
   </div>
   <div class="table-body">
     <div v-for="(item,index) in table_list" :key="index" class="single-body">
      <div>ID</div>
      <div>Title</div>
      <div>Author</div>
      <div>Pageviews</div>
      <div>Status</div>
     </div>
   </div>
  </div>
</template>
 
<script type="text/babel">
  export default {
    data() {
      return {
        msg:'侧边栏',
        table_list:[1,2,3,4,5,6,7]
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
      align-items: center;
      padding:20px;
      flex-direction: column
  }
  .table-head{
    display: flex;
    flex-direction: row;
    /* justify-content:center; */
    width: 100%
  }
  .table-head div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid grey;
    font-weight: 500;
    flex: 1
  }
  .table-head div:nth-child(2){
    width: 50px;
    flex: 2
  }
  .table-body{
    display: flex;
    flex-direction: column;
    
    width: 100%
  }
  .single-body{
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 92px;
  }
  .single-body div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid grey;
    font-weight: 500;
    flex: 1
  }
  .single-body div:nth-child(2){
    width: 50px;
    flex: 2
  }
</style>