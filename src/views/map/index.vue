<template>
  <div class="map-container">
    <button @click="toDisplay">大屏展示</button>
  </div>
</template>

<script>
export default {
  name: "Map",

  data: function() {
    return {
   
    }
  },

  methods: {
    toDisplay(){
      this.$router.push({path: '/display'})
    }
  },

  async mounted() {
   
  },
  computed: {
  
  }
};
</script>

<style lang="scss" scoped>


</style>
