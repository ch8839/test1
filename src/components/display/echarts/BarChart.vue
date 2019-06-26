<template>
  <div class="barChart-container">

  </div>
</template>

<script>
export default {
  name: 'BarChart',

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
      this.chart = this.$echarts.init(this.$el)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          } //坐标横虚线
        },
        grid: [{
          width:'85%',
          height:'60%',
          top:'20%',
          left:'10%',
        }],
        legend: {
          // orient: 'vertical',
          textStyle:{
            color:'#fffff'
          },       
          left:'30%',
          itemWidth:12,
          itemHeight:4,
          data: ['完成率', '异常事件发生数', '异常事件处理数']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1周', '2周', '3周', '4周', '5周'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                // width:'5px'
                color: '#95b6cd'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '异常事件',
            splitLine: {
              show: false
            }, //显示分割线
            axisLine: {
              lineStyle: {
                color: '#95b6cd'
              } //y轴轴线的样式配置
            },
            minInterval:6
          },
          {
            type: 'value',
            name: '完成率',
            splitLine: {
              show: false
            },

            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '异常事件发生数',
            type: 'bar',
            itemStyle: {
              color: '#95b6cd'
            },
            barWidth: '10px',
            data: [9, 14, 16, 11, 19]
          },
          {
            name: '异常事件处理数',
            type: 'bar',
            itemStyle: {
              color: '#198dd3'
            },
            barWidth: '10px',
            data: [7, 12, 14, 9, 15]
          },
          {
            name: '完成率',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              color: '#172f5c'
            },
            data: [87, 56, 62, 71, 68, 61]
          }
        ]
      })
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
.barChart-container {
  height: 100%;
  width: 100%;
  // margin-left: 20px;
}
</style>
