<template>
  <div class="lineChart-container">

  </div>
</template>

<script>
export default {
  name: 'LineChart',

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
          trigger: 'axis'
        },
        legend: {
          textStyle:{
            color:'#fffff',
            // backgroundColor:'#20becc'
          }, 

          itemWidth:8,
          itemHeight:2,
          fontSize:8,
          data: ['消防报警系统', '楼宇水系统', '防排烟系统', '电气火灾系统', '电梯监控系统']
        },
        grid: [{
          width:'90%',
          height:'68%',
          top:'20%',
          left:'5%',
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.x_data,
          axisLine: {
              lineStyle: {
                color: '#186cad'
              }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#174c80'
            }
          },
          axisLabel:{
            show:true
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
              lineStyle: {
                color: '#186cad'
              } //y轴轴线的样式配置
          },
          splitLine: {
            lineStyle: {
              color: '#174c80'
            }
          }, //分割线样式
          minInterval:5
        },
        series: [
          {
              name:'消防报警系统',
              type:'line',
              symbol: 'circle',
              lineStyle: {
                width:1
              },
              data:[2, 5, 8, 11, 4, 12, 2]
          },
          {
              name:'楼宇水系统',
              type:'line',
              symbol: 'circle', //设置转折点为圆形
              lineStyle: {
                width:1
              },
              data:[0, 2, 6, 16, 18, 3, 8]
          },
          {
              name:'防排烟系统',
              type:'line',
              symbol: 'circle',
              lineStyle: {
                width:1
              },
              data:[0, 8, 17, 6, 19, 2, 12]
          },
          {
              name:'电气火灾系统',
              type:'line',
              symbol: 'circle',
              lineStyle: {
                width:1
              },
              data:[0, 5, 8, 9, 15, 11, 12]
          },
          {
              name:'电梯监控系统',
              type:'line',
              symbol: 'circle',
              lineStyle: {
                width:1
              },
              data:[0, 7, 9, 15, 18, 15, 12]
          }
        ]
      })
    }
  },

  computed: {
    x_data(){
      let arr = new Array(13).toString().split(',').map((item, index)=>{
        return index *2 
      })
      console.log(arr)
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.lineChart-container {
  height: 100%;
  width: 100%;
  // margin-left: 20px
}
</style>
