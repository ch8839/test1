<template>
  <div class="pieChart-container">

  </div>
</template>

<script>
export default {
  name: 'PieChart',

  data: function() {
    return {
      chart: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.chart = this.$echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        color: ['#de2e4a','#20becc', '#37b347', '#1f549b', '#ff8561','#fec637', '#b0f330', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '事件分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{b} {d}%\n\n',
                // show: false,
                // position: 'center'
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                // smooth: 0.5, //0-1，越大越平滑弯曲
                length: 2, //从块到文字的第一段长
                // length2: 20 //拐弯到文字的段长
              }
            },
            data: [
              { value: 33, name: '消防报警系统' },
              { value: 15, name: '楼宇水系统' },
              { value: 10, name: '防排烟系统' },             
              { value: 20, name: '独立式烟感系统' },
              { value: 12, name: '市政消火栓系统' },
              { value: 18, name: '电气火灾系统' },
              { value: 26, name: '电梯监控系统' },
            ]
          }
        ]
      })
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
.pieChart-container {
  height: 100%;
  width: 100%;
  margin-left: 20px
}
</style>
