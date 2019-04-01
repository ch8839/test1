<template>
  <div>
   <li>
       <div :class="{bold: isFolder}" @click="toggle" @dblclick="createSon">
           {{model.name}}
           <span v-if="isFolder">[{{open?'-':'+'}}]</span>
       </div>

       <ul v-show="open" v-if="isFolder" class="son">
           <item2 v-for="(item,index) in model.children" :key="index" :model=item></item2>
           <li @click="addChild(model.children.length+1,model.name)">+</li>
       </ul>       
   </li>
  </div>
</template>
 
<script>
  export default {
    name:'Item2',
     props: {
      model: Object
    },
    data: function () {
      return {
       open:false
      }
    },
    computed: {
      isFolder(){
          return this.model.children&&this.model.children.length
      }
    },
    methods: {
      toggle(){
          this.open=!this.open
      },
      createSon(){
        if(!this.isFolder){
          this.$set(this.model, 'children', [])
          let count = this.model.children.length==0? 1:this.model.children.length
          this.addChild(count,this.model.name)
          this.open = true
        }        
      },
      addChild(count,currentName){      
          this.model.children.push({name:`${currentName}-son${count}`})
        }
    }
  }
</script>
 
<style scoped>
  
</style>