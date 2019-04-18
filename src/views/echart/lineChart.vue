<template>
  <div>
    <div>
      <el-select
        v-model="listQuery2.element"
        placeholder="请选择元素"
        class="filter-item"
        @change="handleFilter2"
      >
        <el-option v-for="(item,index) in elementOptions" :key="index" :label="item" :value="item"/>
      </el-select>
    </div>
    <div id="myChart1" :class="className" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
let echarts3_0 = require("echarts/lib/echarts"); // 引入基本模板
require("echarts/lib/chart/bar"); // 引入柱状图组件

// // 引入提示框和title组件
// require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
/* 引入函数 */
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "450px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },

  data() {
    return {
      listQuery2: { element: "PH值" },
      elementOptions: [
        "PH值",
        "砷",
        "镉",
        "铬",
        "铜",
        "铅",
        "汞",
        "镍",
        "锑",
        "铍",
        "钴",
        "锌",
        "银",
        "铊",
        "锡",
        "硒",
        "钼",
        "矾"
      ]
    };
  },

  mounted() {
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.mychart1) {
          // this.mychart1.resize();
          this.mychart1.resize();
          // this.mychart3.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
  },
  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }
    this.mychart1.dispose();
    this.mychart1 = null;
  },

  methods: {
    /* 处理元素选择器2的过滤功能 */
    async handleFilter2() {
      console.log(this.listQuery2);
      this.drawZoom();
    },
    /* 折线图的初始化函数 */
    drawZoom() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.init(document.getElementById("myChart"));
      this.mychart1 = echarts3_0.init(document.getElementById("myChart1"));
      // console.log("location number in drawline", this.location.locationtext);
      // 绘制图表
      this.mychart1.setOption({
        title: {
          show: true,
          text: "各深度" + this.listQuery2.element + "一周变化情况",
          subtext: this.selectedOptionsLabel,
          x: "center",
          y: "0"
        },
        tooltip: {
          trigger: "axis",
          position: function(p) {
            return [p[0] + 10, "10%"];
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#CCFF99", "#99CCFF", "#CCCCFF"],
        legend: {
          data: ["深度一", "深度二", "深度三"],
          x: "center",
          y: "55"
        },
        grid: {
          top: "100", //图表内容距上下左右的距离，可设置top，left，right，bottom
          bottom: "5%",
          left: "12%",
          right: "12%",
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "2%",
          y: "120",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}单位"
            }
          }
        ],
        series: [
          {
            name: "深度一",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#CCFF99"
                }
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                [{ coord: ["周一", 10] }, { coord: ["周日", 10] }] //如何获取grid上侧最大值，目前是写死的
              ]
            }
          },
          {
            name: "深度二",
            type: "line",
            data: [9, 12, 8, 6, 23, 4, 11],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#99CCFF"
                }
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                [{ coord: ["周一", 10] }, { coord: ["周日", 10] }] //如何获取grid上侧最大值，目前是写死的
              ]
            }
          },
          {
            name: "深度三",
            type: "line",
            data: [19, 11, 6, 16, 12, 14, 23],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#CCCCFF"
                }
              }
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                [{ coord: ["周一", 10] }, { coord: ["周日", 10] }] //如何获取grid上侧最大值，目前是写死的
              ]
            }
          }
        ]
      });
    }
  }

  //end of export
};
</script>

