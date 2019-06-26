<template>
  <div class="center-container">
   <div class="data-counts">
     <div>
       <p>服务项目体数</p>
       <p class="count">{{ server_count }}个</p>
     </div>
     <div>
       <p>实时监控设备数</p>
       <p class="count">{{ monitor_count }}个</p>
     </div>
     <div>
       <p>实时异常设备数</p>
       <p class="count">{{ abnormal_count }}个</p>
     </div>
   </div>
   <div class="map">
     <img src="../../../assets/display_images/map.png">
   </div>
   <div class="proportion">
     <div class="progress" v-for="(item, index) in list" :key="index">
      <el-progress :percentage="70"></el-progress>
      <div class="progress-data">
      <span>消防报警系统</span>
      <span>12%</span>
      </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "Center",

  data: function() {
    return {
      server_count:11111,
      monitor_count: 111111,
      abnormal_count: 222222,
      list: [1,2,3,4,5,6,7]
    }
  },

  methods: {
    
  },

  mounted() {
   
  },
  computed: {
  
  }
};
</script>

<style lang="scss" scoped>
  .center-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .data-counts {
      flex-basis: 17%;
      // border: 1px #08e78a solid;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p {
        color: #ccedfa
      }
      .count {
        font-size: 20px
      }
    }
    .map {
      flex: 1;
      // border: 1px #08e78a solid;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 85%;
        width: 85%
      }
    }
    .proportion {
      flex-basis: 17%;
      // border: 1px #08e78a solid;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      .progress {
        width: 25%;
        .progress-data {
          font-size: 12px;
          & span:first-child {
            text-align: left
          }
          & span:last-child {
            text-align: right
          }
        }
      }
    }
  }

</style>
