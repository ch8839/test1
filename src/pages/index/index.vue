<template>
  <div>
   {{msg}}
   <input :value="parseInt('125')" />
  </div>
</template>
 
<script>
  export default {
    data() {
      return {
        msg:'Index'
      }
    },
    methods: {
     
    }
  }
</script>
 
<style scoped>
  
</style>