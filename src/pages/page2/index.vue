<template>
  <div>
   <ul>
     <!-- <item2 class='tree2' :model='treeData'></item2> -->
     <item2 class='tree2' :model='item' v-for="(item,index) in treeData" :key="index"></item2>
     <li @click="addPeople" class="tree2">+</li>
   </ul>  
  </div>
</template>
 
<script>
import Item2 from '@/components/tree2'
var data = [
  {
  name:'People1',
  children:[
    {name: 'People1-son1'},
    {name: 'People1-son2'},
    {
      name: 'People1-son3', 
      children: [
      {
        name:'People1-son3-son1',
        children:[
          {name:'People1-son3-son1-son1'}
        ]
      },
      {name:'People1-son3-son2',},
      {name:'People1-son3-son3',},
      {
        name:'People1-son3-son4',
        children:[
          {name:'People1-son3-son1-son1'}
        ]
      }
      ]
    }
  ]
  }
]
  export default {
    data() {
      return {
       treeData:data
      }
    },
    components:{ Item2 },
    methods: {
     addPeople(){
      let count = this.treeData.length
      this.treeData.push(
        {name:`People${count+1}`}
      )
     }
    }
  }
</script>
 
<style scoped>
 .tree2 {
        cursor: pointer;
      }

      ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
      }
</style>