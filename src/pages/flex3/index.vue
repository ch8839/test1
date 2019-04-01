<template>
<div class="contain">
  <div class="Grid Grid--guttersLg Grid--full med-Grid--fit">
   <div class="Grid-cell">
     <h2>模块一</h2>
     <div class="input-cell">
       <span class="input-title">数量</span>
       <input class="input-item">
     </div>

      <div class="input-cell">
       <input class="input-item">
       <span class="input-title">数量</span>
     </div>
   </div>

   <div class="Grid-cell">
     <h2>模块二</h2>
     <div class="input-cell">
       <button class="button" @click="search($event)" ref="search" data-search_index="666">
         <span class="icon icon-search"></span>
       </button>
       <input class="input-item">
     </div>

     <div class="input-cell">
        <input class="input-item">
       <button class="button">
         <span class="icon icon-star"></span>
       </button>      
     </div>
   </div>
  </div>


  </div>
</template>
 
<script type="text/babel">
  export default {
    data() {
      return {
        
      }
    },
    methods: {
     search(e){
       console.log(this.$refs.search)
       let res = this.$refs.search.getAttribute("data-search_index")
       console.log("search", res)
     }
    }
  }
</script>
 
<style scoped>
.contain{
  margin: 20px 60px
}
.Grid{
  display: flex;
  flex-wrap: wrap;

}
.Grid-cell{
  padding: 16px 0 0 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.input-cell{
  display: flex;
  margin-bottom: 12px;

}
.input-title{
  border-radius: 2px 0 0 2px;
  border: 1px solid hsla(31,15%,50%,.25);
  padding: 8px 8px;
  background-color: hsla(31,15%,50%,.1);
  color: #666;
  font: inherit;
  font-weight: 400;
}
.button{
  border-radius: 2px 0 0 2px;
  border: 1px solid hsla(31,15%,50%,.25);
  padding: 8px 8px;
  background-color: hsla(31,15%,50%,.1);
  color: #666;
  font: inherit;
  font-weight: 400;
  
}

.icon-search:before {
    content: "\f002";
}
.icon-star:before {
    content: "\f005";
}
.input-item{
  flex: 1;
  border: 1px solid hsla(31,15%,50%,.25);
  padding: 5px
}
</style>