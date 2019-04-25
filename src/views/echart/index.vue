<template>
  <div class="project-info-container">
    <div>
      <div>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          ref = "cascaderAddr"
          clearable
          v-model="selectedOptions"
          @change="handleCascaderChange"
        ></el-cascader>

        <el-select
          v-model="assessListQuery"
          placeholder="请选择类型"
          class="filter-item"
          @change="handleAssessFilter"
        >
          <el-option
            v-for="(item,index) in assessOptions"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>

      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="土壤" name="earth">
          <el-table
            :data="temp_tableItems"
            @expand-change="handlePieFlag"
            border
            stripe
            style="width:100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <!-- 饼图div -->
                    <div
                      :id="'myPieChart'+props.row.point_num"
                      :data="drawPie('myPieChart'+props.row.point_num, props.row.pieseries)"
                      :class="className"
                      :style="{height:height, width:width}"
                    ></div>
                  </el-col>
                  <!-- <PieChart v-if="pieflag" :data="props.row.series" :piedatalist="props.row.series"></PieChart> -->
                  <el-col :xs="24" :sm="24" :lg="8">
                    <!-- 折线图div -->
                    <div
                      :id="'myLineChart'+props.row.point_num"
                      :data="drawLine('myLineChart'+props.row.point_num, props.row.lineseries)"
                      :class="className"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <!-- 雷达图div -->
                    <div
                      :id="'myRadarChart'+props.row.point_num"
                      :class="className"
                      :data="drawRadar('myRadarChart'+props.row.point_num, props.row.radarseries)"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column prop="point_num" label="采样点位编号" align="center"></el-table-column>
            <el-table-column prop="tips" label="点位描述" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="水" name="water"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script >
let echarts3_0 = require("echarts/lib/echarts"); // 引入基本模板
require("echarts/lib/chart/bar"); // 引入柱状图组件
// require("echarts/lib/chart/radar"); // 引入柱状图组件

// // 引入提示框和title组件
// require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import { getCascader, getTableItemsByPN } from "@/api/echarts/echarts"

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
      activeName: "earth",
      selectedOptions: [],
      assessOptions: [
        { label: "所有类型", value: 0 },
        { label: "初次调查", value: 1 },
        { label: "详细调查", value: 2 },
        { label: "修复调查", value: 3 }
      ],
      assessListQuery: { label: "所有类型", value: 1 },
      charts: [],
      /* tableData: [
        {
          point_num: 1,
          tips: "我是1",
          pieseries: [
            { value: 4, name: "初次调查" },
            { value: 6, name: "详细调查" },
            { value: 9, name: "修复调查" }
          ],
          lineseries: {
            data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
            markLine: [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }],
            xAxis: [
              "样本一",
              "样本2",
              "样本3",
              "样本4",
              "样本5",
              "样本6",
              "样本7",
              "样本8",
              "样本9",
              "样本10"
            ]
          }
          // radarseries:{
          //   max: [],
          //   threshhold: [],
          //   rt_data: [],
          // },
        },
        {
          point_num: 2,
          tips: "我是2",
          pieseries: [
            { value: 1, name: "初次调查" },
            { value: 2, name: "详细调查" },
            { value: 3, name: "修复调查" }
          ],
          lineseries: {
            data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
            markLine: [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }],
            xAxis: [
              "样本一",
              "样本2",
              "样本3",
              "样本4",
              "样本5",
              "样本6",
              "样本7",
              "样本8",
              "样本9",
              "样本10"
            ]
          }
        },
        {
          point_num: 3,
          tips: "我是3",
          pieseries: [
            { value: 4, name: "初次调查" },
            { value: 5, name: "详细调查" },
            { value: 6, name: "修复调查" }
          ],
          lineseries: {
            data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
            markLine: [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }],
            xAxis: [
              "样本一",
              "样本2",
              "样本3",
              "样本4",
              "样本5",
              "样本6",
              "样本7",
              "样本8",
              "样本9",
              "样本10"
            ]
          }
        },
        {
          point_num: 4,
          tips: "我是4",
          pieseries: [
            { value: 7, name: "初次调查" },
            { value: 8, name: "详细调查" },
            { value: 9, name: "修复调查" }
          ],
          lineseries: {
            data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
            markLine: [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }],
            xAxis: [
              "样本一",
              "样本2",
              "样本3",
              "样本4",
              "样本5",
              "样本6",
              "样本7",
              "样本8",
              "样本9",
              "样本10"
            ]
          }
        }
      ], */
      tableData: [],
      temp_tableItems: [],
      temp_lineseries: {
        data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
        markLine: [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }],
        xAxis: [
          "样本一",
          "样本2",
          "样本3",
          "样本4",
          "样本5",
          "样本6",
          "样本7",
          "样本8",
          "样本9",
          "样本10"
        ]
      },
      temp_radarseries: {},
      temp_pieseries: [
        { value: 4, name: "初次调查" },
        { value: 6, name: "详细调查" },
        { value: 9, name: "修复调查" }
      ],
      // SeriesDataForPie: [
      //   { value: 10, name: "初次调查" },
      //   { value: 11, name: "详细调查" },
      //   { value: 12, name: "修复调查" }
      // ],
      pieflag: false
    };
  },
  methods: {
    /* 生成三级选择器的树形数据 */
    async getData() {
      let CasData = await getCascader();
      let ground_name = CasData.data.res;
      console.log("ground_name", ground_name); //普通格式数组，需转化为树形格式

      ground_name.forEach(element => {
        switch (element.project_area) {
          case "0001":
            this.options[0].children.push({
              value: element.project_num,
              label: element.project_name
            });
            break;
          case "0002":
            this.options[1].children.push({
              value: element.project_num,
              label: element.project_name
            });
            break;
          case "0003":
            this.options[2].children.push({
              value: element.project_num,
              label: element.project_name
            });
            break;
          default:
            console.log("没有读取到cascader的第二级目录");
        }
      });
      //初始选项
      this.selectedOptions = [
        this.options[0].value,
        this.options[0].children[0].value
      ];
      this.assessListQuery = this.assessOptions[0].label;
      this.handleCascaderChange(this.selectedOptions);
      
      // console.log("this.selectedOptions", this.selectedOptions)
    },

    /* 级联选择器的触发函数 */
    async handleCascaderChange(options) {
      // let so = options;
      console.log("this.selectedOptions", this.selectedOptions);
      /*       this.$nextTick(async () => {
        //
      }); */
      this.tableData = [];
      this.temp_tableItems = [];
      this.selectTableItemsByPN(options[1]);
      this.handleAssessFilter();
    },
    /* 地块类型选择器的触发函数 */
    handleAssessFilter() {
      console.log("调查类型:", this.assessListQuery + " " + typeof(this.assessListQuery));
      this.selectTableItemsByAT(this.assessListQuery);
      console.log("this.temp_tableItems", this.temp_tableItems);
    },

    /* 通过点位筛选表格数据 */
    async selectTableItemsByPN(project_num) {
      let temp_tableData = await getTableItemsByPN(project_num);
      console.log("我是TableItems的数据", temp_tableData.data.res);
      let res_tableData = temp_tableData.data.res;
      res_tableData.map(element => {
        this.tableData.push({
          point_num: element.point_num,
          tips: element.assess_type,
          lineseries: this.temp_lineseries,
          pieseries: this.temp_pieseries,
          radarseries: this.temp_radarseries
        });
      });
      this.temp_tableData = this.tableData;
    },

    /* 通过类型筛选表格数据 */
    async selectTableItemsByAT(assess_type) {
      if (assess_type == "所有类型") {
        this.temp_tableItems = this.tableData;
        return;
      } else {
        this.temp_tableItems = this.tableData.filter(element => {
          if (
            element.tips == assess_type
          ) {
            return true;
          }
        });
      }
    },

    /* 画饼图 */
    drawPie(pieid, piedatalist) {
      // 基于准备好的dom，初始化echarts实例

      this.$nextTick(async () => {
        console.log(
          "document.getElementById(pieid)",
          document.getElementById(pieid)
        );
        this.myPieChart = echarts3_0.init(document.getElementById(pieid));
        this.setPieOptions(piedatalist);
        /* 将所有charts放入数组，以实现缩放 */
        this.charts.push(this.myPieChart);
        console.log("画饼完毕");
      });

      // console.log("piedatalist", piedatalist);

      // this.pieflag = false
    },
    setPieOptions(seriesvalue) {
      this.myPieChart.setOption({
        title: {
          text: this.$refs["cascaderAddr"].currentLabels[1]+"X元素超标情况",
          //   subtext: "虚拟数据",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
          // orient: "vertical",
          // x2: "5%",
          // y: "150"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "45",
          data: ["初次调查", "详细调查", "修复调查"]
        },
        color: ["#FFCCCC", "#CCCCFF", "#CCFF99"],
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "1%",
          y: "150",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "评估类型",
            type: "pie",
            radius: "55%",
            center: ["50%", "55%"],
            data: seriesvalue
            // data: [
            //   { value: 4, name: "初次调查" },
            //   { value: 6, name: "详细调查" },
            //   { value: 9, name: "修复调查" }
            // ]
          }
        ]
      });
    },

    /* 画折线图 */
    drawLine(lineid, linedatalist) {
      this.$nextTick(async () => {
        this.myLineChart = echarts3_0.init(document.getElementById(lineid));
        this.setLineOptions(linedatalist);
        /* 将所有charts放入数组，以实现缩放 */
        this.charts.push(this.myLineChart);
        console.log("画线完毕");
      });
    },
    setLineOptions(lineseriesvalue) {
      this.myLineChart.setOption({
        title: {
          show: true,
          text: this.$refs["cascaderAddr"].currentLabels[1]+"各采样点X元素分布",
          // subtext: this.selectedOptionsLabel,
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
        // color: ["#CCFF99", "#99CCFF", "#CCCCFF"],
        color: ["#9999cc"],
        legend: {
          data: ["元素值"],
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
            // data: ["样本一", "样本2", "样本3", "样本4", "样本5", "样本6", "样本7", "样本8", "样本9", "样本10"]
            data: lineseriesvalue.xAxis
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
            // data: [11, 11, 15, 13, 12, 13, 10, 12, 13, 10],
            data: lineseriesvalue.data,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#9999CC"
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
                // [{ coord: ["样本1", 10] }, { coord: ["样本10", 10] }] //如何获取grid上侧最大值，目前是写死的
                lineseriesvalue.markLine
              ]
            }
          }
        ]
      });
    },

    /* 画雷达图 */
    drawRadar(radarid, radardatalist) {
      this.$nextTick(async () => {
        this.myRadarChart = echarts.init(document.getElementById(radarid));
        this.setRadarOptions(radardatalist);
        /* 将所有charts放入数组，以实现缩放 */
        this.charts.push(this.myRadarChart);
        console.log("画雷达完毕");
      });
    },
    setRadarOptions(radarserisevalue) {
      this.myRadarChart.setOption({
        title: {
          text: this.$refs["cascaderAddr"].currentLabels[1]+"最新情况",
          // subtext: this.selectedOptionsLabel,s
          x: "center",
          y: "1"
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
            // indicator: radarserisevalue.max,
            indicator: [
              {
                text: "PH值",
                max: 20
              },
              {
                text: "砷",
                max: 20
              },
              {
                text: "镉",
                max: 20
              },
              {
                text: "铬",
                max: 40
              },
              {
                text: "铜",
                max: 40
              },
              {
                text: "铅",
                max: 40
              },
              {
                text: "汞",
                max: 20
              },
              {
                text: "镍",
                max: 40
              },
              {
                text: "锑",
                max: 20
              },
              {
                text: "铍",
                max: 20
              },
              {
                text: "钴",
                max: 20
              },
              {
                text: "锌",
                max: 50
              },
              {
                text: "银",
                max: 40
              },
              {
                text: "铊",
                max: 40
              },
              {
                text: "锡",
                max: 20
              },
              {
                text: "硒",
                max: 40
              },
              {
                text: "钼",
                max: 40
              },
              {
                text: "矾",
                max: 20
              }
            ],
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
                // value: radarserisevalue.threshhold,
                value: [
                  5.01,
                  6.81,
                  0.09,
                  29,
                  27.32,
                  22.2,
                  0.662,
                  21,
                  0.336,
                  1.236,
                  "null",
                  95.3,
                  "null",
                  0.5,
                  2,
                  3.26,
                  "null",
                  0.451,
                  7.26,
                  "null",
                  "null",
                  "null",
                  "null",
                  "null",
                  "null",
                  "null",
                  0.6,
                  "null",
                  "null",
                  "null",
                  "null",
                  "null",
                  2.53,
                  "null",
                  "null",
                  "null"
                ],
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
                // value: radarserisevalue.rt_data,
                value: [
                  6.2,
                  3.65,
                  0.077,
                  23.326,
                  21.23,
                  21.2,
                  0.323,
                  20.132,
                  0.136,
                  1.632,
                  3.21,
                  32.26,
                  13.2,
                  23.23,
                  3.26,
                  21.323,
                  13.2,
                  0.136
                ],
                name: "实际值",
                itemStyle: {
                  normal: {
                    color: "#99CC99",
                    lineStyle: {
                      // type: 'default',
                      // type: "line",
                      opacity: 0.5
                    }
                  }
                }
              }
            ]
          }
        ]
      });
    },

    handlePieFlag() {
      console.log("handlePieFlag has been executed!!");
      this.pieflag = true;
      // return
    }
  },
  mounted() {
    this.getData();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.charts) {
          // console.log("执行到resize")
          this.charts.forEach(item => {
            item.resize();
          });
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
    // if (this.SeriesDataForPie) {
    //   this.pieflag = true;
    // }
  },
  computed: {
    options() {
      let arr = [
        {
          value: "0001",
          label: "静安区",
          children: []
        },
        {
          value: "0002",
          label: "长宁区",
          children: []
        },
        {
          value: "0003",
          label: "宝山区",
          children: []
        },
        {
          value: "0004",
          label: "普陀区",
          children: []
        },
        {
          value: "0005",
          label: "嘉定区",
          children: []
        }
      ];

      return arr;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.project-info-container {
  padding: 30px;
  .chart_contain {
    margin-left: 30px;
  }
}
</style>


