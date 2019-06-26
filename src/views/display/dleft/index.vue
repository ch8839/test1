<template>
  <div class="left-container">
   <div class="data-statistics">
     <chart-border :title="data_statistics_title" style="height:100%">
       <table class="data-statistics-table">
         <tbody>
            <tr>
                <td>服务行政区域</td>
                <td>{{count1}}个</td>
                <td>使用系统成员数</td>
                <td>{{count2}}个</td>
            </tr>
           <tr>
                <td>服务总面积</td>
                <td>{{count1}}个</td>
                <td>服务维保单位</td>
                <td>{{count2}}个</td>
            </tr>
            <tr>
                <td>服务维护单位</td>
                <td>{{count1}}个</td>
                <td>服务楼宇数</td>
                <td>{{count2}}个</td>
            </tr>
        </tbody>
       </table>
     </chart-border>
   </div>
   <div class="abnormal-events">
     <chart-border :title="abnormal_events_title" style="height:100%">
       <!-- <div class="pie-chart-content"> -->
        <pie-chart></pie-chart>
       <!-- </div> -->
     </chart-border>
   </div>
   <div class="events-trend">
     <chart-border :title="events_trend_title" style="height:100%">
       <bar-chart></bar-chart>
     </chart-border>
   </div>
  </div>
</template>

<script>
import pieChart from '../../../components/display/echarts/PieChart'
import barChart from '../../../components/display/echarts/BarChart'
export default {
  name: "Left",
  components: {
    'pie-chart': pieChart,
    'bar-chart': barChart
  },
  data: function() {
    return {
      data_statistics_title: '监控平台数据统计',
      abnormal_events_title: '上月异常事件分布',
      events_trend_title: '异常事件发生与未来趋势',
      count1:11111,
      count2:222222
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
  .left-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    & > div {
      flex: 1;
      border: 1px #08e78a solid
    }
    .data-statistics {
     width: 100%;
      .data-statistics-table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        border: none;
        font-size: 12px;
        & tr {
          height: 33%;
        }
        & tr:hover {
          background: #111947
        }
        & tr:nth-child(even) {
          background: #111947
        }
        & td {
          padding: 5px

        }
      }
      
      
    }

    .abnormal-events {
      .pie-chart-content {
        height: 100%;
        padding: 0 2px 0px 10px
      }
    }
  }

</style>
