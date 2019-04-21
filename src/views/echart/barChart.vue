<template>
  <!-- 树状图 -->
        <div class="chart-wrapper">
          <!-- <div class="chart_contain"> -->
          <!-- <el-select v-model="listQuery.depth" placeholder="请选择深度" clearable class="filter-item">
          <el-option v-for="(item,index) in depthOptions" :key="index" :label="item" :value="item"/>
          </el-select>-->
          <div>
            <!-- <p>请选择元素</p> -->
            <el-select
              v-model="listQuery1.element"
              placeholder="请选择元素"
              class="filter-item"
              @change="handleFilter1"
            >
              <el-option
                v-for="(item,index) in elementOptions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <!-- <div id="myChart2" class="chart-item"></div> -->
          <div id="myChart2" :class="className" :style="{height:height,width:width}"></div>
          <!-- </div> -->
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

/* bar图接口 */
// import { getGroundList } from "@/api/echarts";
import {
  getGroundList,
  getSpecifiedElementList,
} from "@/api/echarts";

import { debounce } from "@/utils";

export default {
  
  name: "barChart",
  data() {
    return {
      // mychart3: null,
      location: [],
      series: [],
      selectedOptions: [],
      selectedOptionsLabels: [],
      listQuery1: { element: "PH值" },
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
  props: {
    message: {
    type: String
    },
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
  mounted() {
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.mychart2) {
          this.mychart2.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
  },
  methods:{
    /* 获取数据库的数据 */
    async getBarList(params1, params2) {
      this.selectedOptions = params1
      this.selectedOptionsLabel = params2
      /* 获取bar图所需的信息 */
      let res = await getSpecifiedElementList(params1);
      let arr_res = res.data.res1;
      console.log("我是params1", params1),
      console.log("selectedOptionsLabel", params2);
      //selectedOptions返回的是数组信息，如何对应到数据库里面的ground_num，并根据该索引取出数据呢？
      let ground_list = res.data.res;
      console.log("ground_list", ground_list);
      // console.log("listQuery", this.listQuery);
      // if (
      //   this.listQuery1.depth !== "" &&
      //   ground_list.locationtext.indexOf(this.listQuery1.depth) >= 0
      // ) {
      //   ground_list.locationtext = ground_list.locationtext.slice(
      //     ground_list.locationtext.indexOf(this.listQuery1.depth),
      //     ground_list.locationtext.indexOf(this.listQuery1.depth) + 1
      //   );
      // }
      if (
        this.listQuery1.element !== "" &&
        ground_list.pelements.indexOf(this.listQuery1.element) >= 0
      ) {
        ground_list.pelements = ground_list.pelements.slice(
          ground_list.pelements.indexOf(this.listQuery1.element),
          ground_list.pelements.indexOf(this.listQuery1.element) + 1
        );
      }
      console.log("ground_list after filter", ground_list);

      // this.location.locationnumber = ground_list.locationnumber;
      // this.location.locationtext = ground_list.locationtext;
      // this.location.pelements = ground_list.pelements;
      // this.location.selected_point_num = ground_list.point_num;
      this.location = ground_list;

      let filterList = arr_res.filter(item => {
        if (
          this.listQuery1.element !== "" &&
          item.name !== this.listQuery1.element
        ) {
          return false;
        }
        return true;
      });
      arr_res = filterList;

      this.series = arr_res;
      // this.selectedOptionsLabel = this.$refs["cascaderAddr"].currentLabels;
      this.selectedOptionsLabel = params2;
      console.log("series", this.series);
      this.sendMsgToParent();
      return;
    },

    /* bar图的初始化函数 */
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.mychart2 = echarts3_0.init(document.getElementById("myChart2"));
      // console.log("location number in drawline", this.location.locationtext);
      // 绘制图表
      this.mychart2.setOption({
        title: {
          show: true, //默认为true，可以省略
          text: "各深度" + this.listQuery1.element + "一周变化情况",
          subtext: this.selectedOptionsLabel,
          x: "center",
          y: "0"
        },
        tooltip: {
          trigger: "item",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, "10%"];
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          // top: "top",
          x: "center",
          y: "55",
          data: this.location.pelements
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
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // boudaryGap: true,
            data: this.location.locationtext
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}mg"
            }
          }
        ],
        series: this.series
      });
    },

    /* 发送数据 */
    sendMsgToParent(){
      this.$emit("barEvent", this.location, this.series)
    },

    /* 处理元素选择器1的过滤功能 */
    async handleFilter1() {
      await this.getBarList(this.selectedOptions, this.selectedOptionsLabels, this.listQuery1);
      this.drawLine();
    },


  },

    beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }
    this.mychart2.dispose();
    this.mychart2 = null;
  },

}
</script>

<style>
</style>