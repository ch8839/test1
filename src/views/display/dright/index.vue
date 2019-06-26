<template>
  <div class="right-container">
   <div class="data-statistics2">
      <chart-border :title="data_statistics_title2" style="height:100%">
        <statistics-table></statistics-table>
      </chart-border>
   </div>
   <div class="abnormal-events">
      <chart-border :title="abnormal_events_title" style="height:100%">
        <line-chart></line-chart>
      </chart-border>
   </div>
   <div class="urgent-event">
      <chart-border :title="urgent_events_title" style="height:100%">
        <dynamic-table></dynamic-table>
      </chart-border>
   </div>
  </div>
</template>

<script>
import dynamicTable from '../../../components/display/table/DynamicTable'
import lineChart from '../../../components/display/echarts/LineChart'
import dataStatisticsTable from '../../../components/display/table/dataStatisticsTable'
export default {
  name: "Left",
  components: {
    'dynamic-table': dynamicTable,
    'line-chart': lineChart,
    'statistics-table': dataStatisticsTable
  },
  data: function() {
    return {
      data_statistics_title2: '监控平台数据统计',
      abnormal_events_title: '各个系统异常事件走势',
      urgent_events_title: '紧急事件'

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
  .right-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    & > div {
      flex: 1;
      border: 1px #08e78a solid
    }
  }

</style>
