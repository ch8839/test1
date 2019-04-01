<template>
  <div class="contain">
   <ul id="demo">
      <item
        class="item"
        :model="treeData"
        >
      </item>
    </ul>
  </div>
</template>
 
<script>
import Item from '@/components/tree1'
var data = {
    name: 'My Tree',
    children: [
      { name: 'hello' },
      { name: 'wat' },
      {
        name: 'child folder',
        children: [
          {
            name: 'child folder',
            children: [
              { name: 'hello' },
              { name: 'wat' }
            ]
          },
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              { name: 'hello' },
              { name: 'wat' }
            ]
          }
        ]
      }
    ]
  }
  export default {
    data() {
      return {
       treeData: data
      }
    },
    components:{ Item },
    methods: {
     
    }
  }
</script>
 
<style scoped>
  body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
      }
      .item {
        cursor: pointer;
      }
      .bold {
        font-weight: bold;
      }
      ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
      }
</style>