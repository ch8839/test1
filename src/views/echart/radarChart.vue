<template>
  <!-- 雷达图 -->
  <div class="chart-wrapper">
    <!-- <div class="chart_contain"> -->
    <div>
      <el-select
        v-model="listQuery3.depth"
        placeholder="请选择元素"
        class="filter-item"
        @change="handleFilter3"
      >
        <el-option v-for="(item,index) in depthOptions" :key="index" :label="item" :value="item"/>
      </el-select>
    </div>
    <div id="myChart3" :class="className" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
let echarts3_0 = require("echarts/lib/echarts"); // 引入基本模板
require("echarts/lib/chart/bar"); // 引入柱状图组件
require("echarts/lib/chart/radar"); // 引入柱状图组件

// // 引入提示框和title组件
// require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");


import { getRadarRealTimeValue, getRadarData } from "@/api/echarts";

import { debounce } from "@/utils";

export default {
  
  props: {
    // message: [],
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
  name: "radarChart",
  data() {
    return {
      mychart3: null,
      radarSeries: [],
      listQuery3: { depth: "深度1" },
      depthOptions: ["深度1", "深度2", "深度3"]
    };
  },

  mounted() {
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.mychart3) {
          this.mychart3.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
  },

  methods: {
    async handleFilter3() {
      console.log(this.listQuery3);
      this.drawRadar();
    },

    /* 获取雷达数据 */
    async getRadarList(params) {
      console.log(
        "this.params",
        params
      );
      // 获取radar的实时数据
      let res = await getRadarRealTimeValue(params);
      let radar_rt_data = res.data.res;
      this.radarSeries.rt_data = radar_rt_data;
      console.log("我是雷达的res0", res1);

      // 获取radar的值
      let res1 = await getRadarData(1);
      console.log("我是雷达的res1", res1);
      this.radarSeries.threshhold = res1.data.resDatar_arr;
      // 获取radar的最大值
      let res2 = await getRadarData(2);
      this.radarSeries.max = res2.data.resDatar_arr;
      console.log("我是雷达的res2", this.radarSeries.max);
    },

    /* 雷达图的初始化函数 */
    drawRadar() {
      // 基于准备好的dom，初始化echarts实例
      this.mychart3 = echarts.init(document.getElementById("myChart3"));
      // console.log("location number in drawline", this.location.locationtext);
      // 绘制图表
      this.mychart3.setOption({
        title: {
          text: "各深度" + this.listQuery3.depth + "一周变化情况",
          subtext: this.selectedOptionsLabel,
          x: "center",
          y: "0"
        },
        tooltip: {
          show: true,
          // trigger: "item",
          trigger: "axis"
        },
        legend: {
          // orient: "vertical",
          x: "center",
          y: 55,
          data: ["阈值", "实际值"]
        },
        toolbox: {
          // show: true,
          show: true,
          orient: "vertical",
          x2: "1%",
          y: "150",
          feature: {
            // mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        polar: [
          {
            indicator: this.radarSeries.max,
            axisLine: {
              show: true
            },
            type: "polygon",
            axisLabel: {
              // 坐标轴文本标签，详见axis.axisLabel
              show: false,
              textStyle: {
                color: "#247bd7" // 坐标轴刻度文字的样式
              }
            },
            radius: 130,
            center: ["50%", "55%"],
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#9999CC" // 设置网格的颜色
              }
            }
          }
        ],
        calculable: true,
        color: ["#FF6666", "#99CC99"],
        series: [
          {
            name: "阈值 vs 实际值",
            type: "radar",
            symbol: "rect", // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 2, // 拐点的大小
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.9
              }
            },

            // color: ['#9999CC','#99CC99'],
            // itemStyle: {
            //   normal: {
            //     lineStyle: {
            //       type: "default",
            //       opacity: 0.1
            //     }
            //   }
            // },
            data: [
              {
                value: this.radarSeries.threshhold,
                name: "阈值",
                itemStyle: {
                  normal: {
                    color: "#FF6666",
                    lineStyle: {
                      // type: "line"
                      // opacity: 0.5,
                    }
                  }
                }
              },
              {
                value: this.radarSeries.rt_data,
                name: "实际值",
                itemStyle: {
                  normal: {
                    color: "#99CC99",
                    lineStyle: {
                      // type: 'default',
                      opacity: 0.5
                    }
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },

  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }
    this.mychart3.dispose();
    this.mychart3 = null;
  },

}; //export end
</script>