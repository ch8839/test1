<template>
  <div class="app-container">
    <div class="chart_contain">
      <ve-line :data="chartData" :settings="chartSettings" :loading="loading"></ve-line>
    </div>
    
    <div class="chart_contain">
      <ve-line :data="chartData" :settings="chartSettings2" :extend="extend" :loading="loading"></ve-line>
    </div>

    <div class="chart_contain">
      <ve-histogram :data="chartData_h" :settings="chartSettings3" :extend="extend2"></ve-histogram>
    </div>

    <div class="chart_contain">
      <ve-pie :data="chartData_p" :settings="chartSettings_p" :extend="extend_p"></ve-pie>
    </div>

    <div class="chart_contain">
      <ve-gauge :data="chartData_g" :settings="chartSettings_g"></ve-gauge>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      chartData: {
        columns: ["data", "tourists", "buy_user", "rate"],
        //columns 中是维度和指标的集合，v-charts 中的大部分图表都是单维度多指标，所以默认第一个值为 维度，剩余的值为指标
        rows: [
          // { data: "1/1", tourists: 1393, buy_user: 1093, rate: 0.32 },
          // { data: "1/2", tourists: 3530, buy_user: 3230, rate: 0.26 },
          // { data: "1/3", tourists: 2923, buy_user: 2623, rate: 0.76 },
          // { data: "1/4", tourists: 1723, buy_user: 1423, rate: 0.49 },
          // { data: "1/5", tourists: 3792, buy_user: 3492, rate: 0.323 },
          // { data: "1/6", tourists: 4593, buy_user: 4293, rate: 0.78 }
        ]
      },

      chartData_h: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: 1, 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: 2, 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: 5, 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: 10, 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: 20, 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: 22, 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      loading:false,
      
      chartData_p:{
        columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
      },

      chartData_g:{
        columns: ['type', 'value'],
          rows: [
            { type: 'speed', value: 80}
          ]
      },

      chartSettings: {
        labelMap: {
          tourists: "访问用户",
          xAxisType: "value",
          buy_user: "下单用户"
        }, //指标的名称
        metrics: ["buy_user", "tourists"] //指定指标
      },
      loading: false,

      chartSettings2: {
        axisSite: { right: ["rate"] }, //设置右y轴指标
        yAxisType: ["KMB", "percent"], //数据格式
        yAxisName: ["数值", "比率"], //设置双y轴
        area: true //显示堆积
      },

      chartSettings3: {
        //  metrics: ['访问用户', '下单用户'],
        showLine: ["下单率"],
        axisSite: { right: ["下单率"] }, //设置右y轴指标
        yAxisType: ["KMB", "percent"], //数据格式
        yAxisName: ["数值", "比率"] //设置双y轴
      },

      chartSettings_p:{
         roseType: 'radius',
         limitShowNum: 5  //设置超过此数字时使用‘其他’代替
      },

      chartSettings_g:{
        labelMap: {
          'speed': '速度'
        },
        dataName: {
          'speed': 'km/h'
        },
        seriesMap: {
          'speed': {
            min: 0,
            max: 200
          }
        }
      },

      extend: {
        series: {
          label: {
            normal: {
              show: true //显示指标数值
            }
          }
        }
      },
      extend2: {
        series: {
          label: { show: true, position: "top" }
        }
      },

      extend_p:{
        legend:{
           orient: 'vertical',
          left: '10'
        }
      }
      // chartSettings2:{
      //     // labelMap: {
      //     //   tourists: '访问用户2',
      //     //   buy_user: '下单用户2',
      //     //   rate:"下单率"
      //     // }, //指标的名称
      //     axisSite: { right: ['下单率'] },
      //     yAxisType: ['KMB', 'percent'],
      //     yAxisName: ['数值', '比率'],
      //     area: true
      // }
    };
  },
  methods: {
    async getData(){
      this.loading = true
      const res = await Axios.get('https://www.easy-mock.com/mock/5c8f3becc3ee14532e6031b3/echart')
      console.log(res)
      this.chartData.rows = res.data.data
      this.loading = false
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f0f2f5 
}
.chart_contain {
  height: 500px;
  width: 800px;
  border: 1px solid #eeeeee;
  padding: 50px;
  background: #ffffff;
  margin-top: 30px
}
</style>

