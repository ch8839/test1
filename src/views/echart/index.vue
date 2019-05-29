<template>
  <div class="project-info-container-echart">
    <div>
      <div class="filter-container">
        <p class="p-item">请选择项目：</p>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          ref="cascaderAddr"
          clearable
          v-model="selectedOptions"
          class="filter-item"
          @change="handleCascaderChange"
        ></el-cascader>

        <P class="p-item">请选择调查类型：</P>
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
            :value="item.value"
          />
        </el-select>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="土壤" name="earth">
          <el-table
            :data="temp_tableItems"
            @expand-change="handleEarthLineElementData"
            border
            stripe
            style="width:100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <!-- 雷达图div -->
                    <div
                      :id="'myEarthRadarChart'+props.row.point_num"
                      :class="className"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>

                  <el-col :xs="24" :sm="24" :lg="12">
                    <!-- 折线图div -->
                    <el-select
                      v-model="lineElementListQuery"
                      placeholder="请选择元素"
                      class="filter-item"
                      @change="handleEarthLineElementSelect(props.row.point_num)"
                    >
                      <el-option
                        v-for="(item,index) in props.row.listQueryOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <div
                      :id="'myEarthLineChart'+props.row.point_num"
                      :class="className"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="point_name" label="监测点位名称" align="center"></el-table-column>
            <el-table-column prop="point_num" label="监测点位编号" align="center"></el-table-column>
            <el-table-column prop="attention" label="超标元素" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.attention[0]!=='无'">
                  <el-tag
                    type="danger"
                    v-for="(item, index) in scope.row.attention"
                    :key="index"
                  >{{scope.row.attention[index]}}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无超标元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="点位情况" align="center"></el-table-column>
            <el-table-column label="详细信息" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="getDetailInfo(scope.row.attention, scope.row.listQueryOptions, scope.row.point_num)"
                >详情信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="水" name="water">
          <el-table
            :data="temp_water_tableItems"
            @expand-change="handleWaterLineElementData"
            border
            stripe
            style="width:100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-row :gutter="32">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <!-- 雷达图div -->
                    <div
                      :id="'myWaterRadarChart'+props.row.point_num"
                      :class="className"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>

                  <el-col :xs="24" :sm="24" :lg="12">
                    <!-- 折线图div -->
                    <el-select
                      v-model="lineElementListQuery"
                      placeholder="请选择元素"
                      class="filter-item"
                      @change="handleWaterLineElementSelect(props.row.point_num)"
                    >
                      <el-option
                        v-for="(item,index) in props.row.listQueryOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <div
                      :id="'myWaterLineChart'+props.row.point_num"
                      :class="className"
                      :style="{height:height,width:width}"
                    ></div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="point_name" label="监测点位名称" align="center"></el-table-column>
            <el-table-column prop="point_num" label="监测点位编号" align="center"></el-table-column>
            <el-table-column prop="attention" label="超标元素" align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.attention[0]!=='无'">
                  <el-tag
                    type="danger"
                    v-for="(item, index) in scope.row.attention"
                    :key="index"
                  >{{scope.row.attention[index]}}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无超标元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="点位情况" align="center"></el-table-column>
            <el-table-column label="详细信息" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="getDetailInfo(scope.row.attention, scope.row.listQueryOptions, scope.row.point_num)"
                >详情信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <!-- 柱状图div -->
      <el-select
        v-model="barElementListQuery"
        placeholder="请选择元素"
        class="filter-item"
        @change="handleBarElementSelect"
      >
        <el-option
          v-for="(item,index) in temp_barElementOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div id="myDialogChart" :class="className" :style="{height:height, width:width}"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script >
let echarts3_0 = require("echarts/lib/echarts"); // 引入基本模板
require("echarts/lib/chart/bar"); // 引入柱状图组件
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import {
  getCascader,
  getTableItemsByPN,
  getAssessData,
  // 水数据
  getWaterTableItemsByPN
} from "@/api/echarts/echarts";
import {
  getHistogramData,
  getRadarEachDepthValue,
  getRadarWaterEachDepthValue,
  GroundRadarThresholdData,
  WaterRadarThresholdData,
  getWaterHistogramData,
  getAllFoldData,
  getAllWaterFoldData
} from "@/api/echarts/echarts";

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
      assessOptions: [],
      assessListQuery: null,
      charts: [],
      myDialogChart: null,
      dialogFormVisible: false,
      barElementListQuery: null,
      lineElementListQuery: null,
      barElementOptions: [
        { label: "PH值", value: "PH" },
        { label: "砷", value: "arsenic" },
        { label: "镉", value: "cadmium" },
        { label: "铬", value: "chromium" },
        { label: "铜", value: "copper" },
        { label: "铅", value: "lead" },
        { label: "汞", value: "mercury" },
        { label: "镍", value: "nickel" },
        { label: "锑", value: "antimony" },
        { label: "铍", value: "beryllium" },
        { label: "钴", value: "cobalt" },
        { label: "锌", value: "zinc" },
        { label: "银", value: "silver" },
        { label: "铊", value: "thallium" },
        { label: "锡", value: "tin" },
        { label: "硒", value: "selenium" },
        { label: "矾", value: "molybdenum" },
        { label: "钼", value: "Alum" }
      ],
      temp_barElementOptions: [],
      barSeries: [],
      temp_barPointnum: [], //用来服务于bar图的选择器
      tableData: [],
      water_tableData: [],
      temp_tableItems: [],
      temp_water_tableItems: [],
      temp_lineseries: {},
      temp_radarseries: [],
      temp_barseries: [],
      element_Map: []
    };
  },
  methods: {
    /* 生成三级选择器的树形数据 */
    async getData() {
      // 获取级联选择器的第三级
      let CasData = await getCascader();
      let ground_name = CasData.data.res;

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
          case "0004":
            this.options[3].children.push({
              value: element.project_num,
              label: element.project_name
            });
            break;
          default:
            console.log("没有读取到cascader的第二级目录");
        }
        this.element_Map = new Map([
          ["PH", "PH值"],
          ["arsenic", "砷"],
          ["cadmium", "镉"],
          ["chromium", "铬"],
          ["copper", "铜"],
          ["lead", "铅"],
          ["mercury", "汞"],
          ["nickel", "镍"],
          ["antimony", "锑"],
          ["beryllium", "铍"],
          ["cobalt", "钴"],
          ["zinc", "锌"],
          ["silver", "银"],
          ["thallium", "铊"],
          ["tin", "锡"],
          ["selenium", "硒"],
          ["molybdenum", "钼"],
          ["Alum", "矾"]
        ]);
      });
      //初始选项
      this.selectedOptions = [
        this.options[0].value,
        this.options[0].children[0].value
      ];

      this.handleCascaderChange(this.selectedOptions);
    },

    /* 生成类型选择器的数据 */
    async getATData() {
      // 获取类型选择器
      let assessData = await getAssessData(this.selectedOptions[1]); //用project_num来获取assess_type
      let temp_assessData = assessData.data.res;
      switch (temp_assessData.length) {
        case 1:
          this.assessOptions = [{ label: "初次调查", value: 1 }];
          break;
        case 2:
          this.assessOptions = [
            { label: "初次调查", value: 1 },
            { label: "详细调查", value: 2 }
          ];
          break;
        case 3:
          this.assessOptions = [
            { label: "初次调查", value: 1 },
            { label: "详细调查", value: 2 },
            { label: "修复调查", value: 3 }
          ];
          break;
        default:
          this.assessOptions = [{ label: "无数据", value: -1 }];
          console.log("没有调查类型");
      }
      this.assessListQuery = this.assessOptions[0].value;
    },

    /* 级联选择器的触发函数 */
    async handleCascaderChange(options) {
      console.log("this.selectedOptions", this.selectedOptions);
      this.tableData = [];
      this.water_tableData = [];
      this.temp_tableItems = [];
      this.temp_water_tableItems = [];
      await this.selectTableItemsByPN(options[1]);
      await this.getATData();
      this.handleAssessFilter();
    },
    /* 调查类型选择器的触发函数 */
    async handleAssessFilter() {
      this.selectTableItemsByAT(this.assessListQuery);
      console.log("当前页面显示的temp_tableItems", this.temp_tableItems);
      console.log(
        "当前页面显示的temp_water_tableItems",
        this.temp_water_tableItems
      );
    },

    /* 通过项目体筛选表格数据 */
    async selectTableItemsByPN(project_num) {
      let api_tableData = await getTableItemsByPN(project_num);
      let res_tableData = api_tableData.data.res;
      res_tableData.map(element => {
        let templistquery1 = [];
        if (element.attention[0] == "无") {
          templistquery1 = [
            {
              label: "无超标元素",
              value: -1
            }
          ];
        } else {
          for (let i of element.attention) {
            this.barElementOptions.map(item => {
              if (item.label == i) {
                templistquery1.push(item);
                return;
              }
            });
          }
        }
        this.tableData.push({
          point_name: element.point_name,
          point_num: element.point_num,
          assess_type: element.assess_type,
          status: element.status,
          attention: element.attention,
          lineseries: this.temp_lineseries,
          listQueryOptions: templistquery1,
          barseries: this.temp_barseries,
          radarseries: this.temp_radarseries
        });
      });
      this.temp_tableData = this.tableData;
      // console.log("我是暂时的tableData", this.temp_tableData);

      let api_water_tableData = await getWaterTableItemsByPN(project_num);
      let res_water_tableData = api_water_tableData.data.res;
      res_water_tableData.map(element => {
        let templistquery2 = [];
        if (element.attention[0] == "无") {
          templistquery2 = [
            {
              label: "无超标元素",
              value: -1
            }
          ];
        } else {
          for (let i of element.attention) {
            this.barElementOptions.map(item => {
              if (item.label == i) {
                templistquery2.push(item);
                return;
              }
            });
          }
        }

        this.water_tableData.push({
          point_name: element.point_name,
          point_num: element.point_num,
          assess_type: element.assess_type,
          status: element.status,
          attention: element.attention,
          lineseries: this.temp_lineseries,
          listQueryOptions: templistquery2,
          barseries: this.temp_barseries,
          radarseries: this.temp_radarseries
        });
      });
      this.temp_water_tableData = this.water_tableData;
      // console.log("我是暂时的water_tableData", this.temp_water_tableData);
    },

    /* 通过类型筛选表格数据 */
    async selectTableItemsByAT(assess_type) {
      this.temp_tableItems = this.tableData.filter(element => {
        if (element.assess_type == assess_type) {
          return true;
        }
      });
      this.temp_water_tableItems = this.water_tableData.filter(element => {
        if (element.assess_type == assess_type) {
          return true;
        }
      });

      // }
    },

    /* 处理 */
    async handleBarElementSelect() {
      this.getBarOptions(this.temp_barPointnum);
    },

    /* 获取监测点位_ground_柱状图的详细数据 */
    async getDetailInfo(attention, listqueryoptions, pointnum) {
      this.handleElementSelector("bar", attention, listqueryoptions, pointnum);
      this.barElementListQuery = this.temp_barElementOptions[0].value;
      // 获取柱状图的选择器数据
      // this.barElementOptions
      if (this.temp_barElementOptions[0].value !== -1) {
        this.dialogFormVisible = true;
      }
      this.temp_barPointnum = pointnum; //存储点位编号以便选择器传参使用
      this.handleBarElementSelect();
      // this.getBarOptions(pointnum);
    },

    /* 画柱状图 */
    drawBar(bardatalist) {
      // 基于准备好的dom，初始化echarts实例

      this.$nextTick(async () => {
        this.myBarChart = echarts3_0.init(
          document.getElementById("myDialogChart")
        );
        this.setBarOptions(bardatalist);
        /* 将所有charts放入数组，以实现缩放 */
        this.charts.push(this.myBarChart);
      });
    },
    setBarOptions(seriesvalue) {
      this.myBarChart.setOption({
        title: {
          show: true,
          text:
            // this.$refs["cascaderAddr"].currentLabels[1]
            "阶段治理情况：" + seriesvalue[5].elementname,
          x: "center",
          y: "10"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "2%",
          y: "120",
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          top: "100", //图表内容距上下左右的距离，可设置top，left，right，bottom
          bottom: "5%",
          left: "12%",
          right: "12%",
          containLabel: true
        },
        legend: {
          data: seriesvalue[1].mean_value,
          x: "center",
          y: "55"
        },

        color: ["#CCCC66", "#99CC99"],
        xAxis: [
          {
            type: "category",
            // data: ["初次调查", "详细调查", "修复调查"],
            data: seriesvalue[0].assess_type,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位:" + seriesvalue[4].unit,
            min: 0,
            // max: 15,
            // interval: '5%',
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          // {
          //   name: "深度1",
          //   type: "bar",
          //   data: [2.0, 4.9, 7.0]
          // },
          {
            name: seriesvalue[2].mean_value,
            type: "bar",
            // barWidth: 80,
            data: seriesvalue[2].value
          },
          {
            name: seriesvalue[3].max,
            type: "bar",
            // barWidth: 80,
            data: seriesvalue[3].value
          }
        ]
      });
    },
    /* 获取this.table_Data的barseries */
    async getBarOptions(pointnum) {
      if (this.temp_barElementOptions[0].value !== -1) {
        let elementname = this.barElementListQuery;
        let combined_pn_en = {
          point_num: pointnum,
          element: elementname
        };
        let res = null;
        if (this.activeName == "earth") {
          res = await getHistogramData(combined_pn_en);
        } else {
          res = await getWaterHistogramData(combined_pn_en);
        }
        let res_barseries = res.data.res;
        this.barSeries = res_barseries;
        //把选中的元素的单位push到barSeries[3]
        if (this.barElementListQuery == "PH") {
          this.barSeries.push({ unit: "PH" });
        } else {
          this.barSeries.push({ unit: "mg" });
        }
        //把选中的元素的中文名称push到barSeries[4]
        this.barElementOptions.find(item => {
          if (item.value === this.barElementListQuery) {
            this.barSeries.push({ elementname: item.label });
          }
        });
        this.drawBar(this.barSeries);
      } else {
        alert("无超标元素");
      }
    },

    /* 画折线图 */
    drawLine(lineid, linedatalist) {
      this.$nextTick(async () => {
        if (document.getElementById(lineid) !== null) {
          if (this.activeName == "earth") {
            this.myLineChart = echarts3_0.init(document.getElementById(lineid));
            this.setLineOptions(linedatalist);
            this.charts.push(this.myEarthLineChart);
          } else {
            this.myLineChart = echarts3_0.init(document.getElementById(lineid));
            this.charts.push(this.myWaterLineChart);
          }
          this.setLineOptions(linedatalist);
          /* 将所有charts放入数组，以实现缩放 */
        }
        /* 将所有charts放入数组，以实现缩放 */
        // this.charts.push(this.myLineChart);
      });
    },
    setLineOptions(lineseriesvalue) {
      this.myLineChart.setOption({
        title: {
          show: true,
          text: "各采样处" + lineseriesvalue.elementname + "变化",
          // subtext: this.selectedOptionsLabesl,
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
        color: ["#CCCC99", "#9999CC"],
        // color: ["#9999cc"],
        legend: {
          data: ["样本值", "平均值"],
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
            data: lineseriesvalue.xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}" + lineseriesvalue.unit
            }
          }
        ],
        series: [
          {
            name: "样本值",
            type: "line",
            data: lineseriesvalue.data,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#CCCC99"
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
                [
                  {
                    coord: [
                      lineseriesvalue.xAxis[0],
                      lineseriesvalue.Threshold17
                    ]
                  },
                  {
                    coord: [
                      lineseriesvalue.xAxis[lineseriesvalue.xAxis.length - 1],
                      lineseriesvalue.Threshold17
                    ]
                  }
                ] //如何获取grid上侧最大值，目前是写死的
              ]
            }
          },
          {
            name: "平均值",
            type: "line",
            // data: [4, 5, 6, 16, 3, 1, 20, 12, 12, 11],
            data: lineseriesvalue.mean_value,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#9999CC"
                }
              }
            }
          }
        ]
      });
    },
    async getEarthLineOptions(listquery, pointnum) {
      //getAllFoldData
      if (listquery == -1 || listquery == null) {
        let p = this.temp_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        // this.temp_tableItems[p].lineseries = {};
        this.temp_tableItems[p].lineseries["xAxis"] = [];
        this.temp_tableItems[p].lineseries["data"] = [];
        this.temp_tableItems[p].lineseries["Threshold17"] = null;
        this.temp_tableItems[p].lineseries["mean_value"] = [];
        this.temp_tableItems[p].lineseries["unit"] = null;
      } else {
        let combined_pn_at_e = {
          point_num: pointnum,
          assess_type: this.assessListQuery,
          element: listquery
        };
        let res = await getAllFoldData(combined_pn_at_e);
        if (typeof res.data.res[0] == "undefined") {
          //如果数据库不含雷达图的数据——很有可能
          let p = this.temp_tableItems.findIndex(
            item => item.point_num == pointnum
          );
          // this.temp_tableItems[p].lineseries = {};
          this.temp_tableItems[p].lineseries["xAxis"] = [];
          this.temp_tableItems[p].lineseries["data"] = [];
          this.temp_tableItems[p].lineseries["Threshold17"] = null;
          this.temp_tableItems[p].lineseries["mean_value"] = [];
          this.temp_tableItems[p].lineseries["unit"] = null;
        } else {
          let p = this.temp_tableItems.findIndex(
            item => item.point_num == pointnum
          );
          let temp_res = res.data.res[0];
          // this.temp_tableItems[p].lineseries = {};
          //把选中的元素的中文名称push到barSeries[4]
          let elementname = null;
          this.barElementOptions.find(item => {
            if (item.value === this.lineElementListQuery) {
              elementname = item.label;
            }
          });
          this.temp_tableItems[p].lineseries["xAxis"] = temp_res.sample;
          this.temp_tableItems[p].lineseries["data"] = temp_res.data1;
          this.temp_tableItems[p].lineseries["Threshold17"] =
            temp_res.reference_value;
          this.temp_tableItems[p].lineseries["mean_value"] =
            temp_res.mean_value;
          this.temp_tableItems[p].lineseries["unit"] = temp_res.unit;
          this.temp_tableItems[p].lineseries["elementname"] = elementname;
        }
      }
    },
    async getWaterLineOptions(listquery, pointnum) {
      //getAllWaterFoldData
      if (listquery == -1 || listquery == null) {
        let p = this.temp_water_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        // this.temp_tableItems[p].lineseries = {};
        this.temp_water_tableItems[p].lineseries["xAxis"] = [];
        this.temp_water_tableItems[p].lineseries["data"] = [];
        this.temp_water_tableItems[p].lineseries["Threshold17"] = null;
        this.temp_water_tableItems[p].lineseries["mean_value"] = [];
        this.temp_water_tableItems[p].lineseries["unit"] = null;
      } else {
        let combined_pn_at_e = {
          point_num: pointnum,
          assess_type: this.assessListQuery,
          element: listquery
        };
        let res = await getAllWaterFoldData(combined_pn_at_e);
        if (typeof res.data.res[0] == "undefined") {
          //如果数据库不含雷达图的数据——很有可能
          let p = this.temp_water_tableItems.findIndex(
            item => item.point_num == pointnum
          );
          // this.temp_water_tableItems[p].lineseries = {};
          this.temp_water_tableItems[p].lineseries["xAxis"] = [];
          this.temp_water_tableItems[p].lineseries["data"] = [];
          this.temp_water_tableItems[p].lineseries["Threshold17"] = null;
          this.temp_water_tableItems[p].lineseries["mean_value"] = [];
          this.temp_water_tableItems[p].lineseries["unit"] = null;
          this.temp_water_tableItems[p].lineseries["elementname"] = null;
        } else {
          let p = this.temp_water_tableItems.findIndex(
            item => item.point_num == pointnum
          );
          let temp_res = res.data.res[0];
          let elementname = null;
          this.barElementOptions.find(item => {
            if (item.value === this.lineElementListQuery) {
              elementname = item.label;
            }
          });
          // this.temp_water_tableItems[p].lineseries = {};
          this.temp_water_tableItems[p].lineseries["xAxis"] = temp_res.sample;
          this.temp_water_tableItems[p].lineseries["data"] = temp_res.data1;
          this.temp_water_tableItems[p].lineseries["Threshold17"] =
            temp_res.reference_value;
          this.temp_water_tableItems[p].lineseries["mean_value"] =
            temp_res.mean_value;
          this.temp_water_tableItems[p].lineseries["unit"] = temp_res.unit;
          this.temp_water_tableItems[p].lineseries["elementname"] = elementname;
        }
      }
    },

    /* 土壤表格折线图的选择器响应 */
    async handleEarthLineElementSelect(pointnum) {
      if (this.lineElementListQuery !== -1) {
        //如果有超标元素
        await this.getEarthLineOptions(this.lineElementListQuery, pointnum);
        let p = this.temp_tableItems.findIndex(
          earthitems => earthitems.point_num == pointnum
        );
        this.drawLine(
          "myEarthLineChart" + pointnum,
          this.temp_tableItems[p].lineseries
        );
      } else {
        //如果没有超标元素，则不执行
        alert("没有超标元素");
        // this.drawLine("myEarthLineChart" + pointnum, null);
      }
    },

    /* 水表格折线图的选择器响应 */
    async handleWaterLineElementSelect(pointnum) {
      if (this.lineElementListQuery !== -1) {
        await this.getWaterLineOptions(this.lineElementListQuery, pointnum);
        let p = this.temp_water_tableItems.findIndex(
          wateritems => wateritems.point_num == pointnum
        );
        this.drawLine(
          "myWaterLineChart" + pointnum,
          this.temp_water_tableItems[p].lineseries
        );
      } else {
        alert("没有超标元素");
        // this.drawLine("myWaterLineChart" + pointnum, null);
      }
    },

    /* 画雷达图 */
    drawRadar(radarid, radardatalist) {
      this.$nextTick(async () => {
        if (document.getElementById(radarid) !== null) {
          if (this.activeName == "earth") {
            this.myRadarChart = echarts.init(document.getElementById(radarid));
            this.charts.push(this.myEarthRadarChart);
          } else {
            this.myRadarChart = echarts.init(document.getElementById(radarid));
            this.charts.push(this.myWaterRadarChart);
          }

          this.setRadarOptions(radardatalist);
          /* 将所有charts放入数组，以实现缩放 */
          // this.charts.push(this.myRadarChart);
        }
      });
    },
    async getEarthRadarOptions(pointnum) {
      let combined_pn_at = {
        point_num: pointnum,
        assess_type: this.assessListQuery,
        // reference_num: "max",
        type: "ground"
      };

      let res1 = await getRadarEachDepthValue(combined_pn_at);
      if (typeof res1.data.res == "undefined") {
        //如果数据库不含雷达图的数据——很有可能
        let p = this.temp_water_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        this.temp_tableItems[p].radarseries = {};
        this.temp_tableItems[p].radarseries["legend"] = [];
        this.temp_tableItems[p].radarseries["max"] = [];
        this.temp_tableItems[p].radarseries["data"] = [];
      } else {
        let res1_radarseries = res1.data.res[0];
        let p = this.temp_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        let legend = [];
        let combined_data = [];
        if (
          res1_radarseries.hasOwnProperty("depth3") == true &&
          res1_radarseries.hasOwnProperty("depth4") == false
        ) {
          legend = ["17国标", "18国标", "深度一", "深度二", "深度三"];
          combined_data = [
            {
              value: res1_radarseries.Threshold17,
              name: "17国标",
              itemStyle: {
                normal: {
                  color: "#FE7979",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.Threshold18,
              name: "18国标",
              itemStyle: {
                normal: {
                  color: "#000000",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.depth1,
              name: "深度一"
            },
            {
              value: res1_radarseries.depth2,
              name: "深度二"
            },
            {
              value: res1_radarseries.depth3,
              name: "深度三"
            }
          ];
        } else if (res1_radarseries.hasOwnProperty("depth4") == true) {
          legend = ["17国标", "18国标", "深度一", "深度二", "深度三", "深度四"];
          combined_data = [
            {
              value: res1_radarseries.Threshold17,
              name: "17国标",
              itemStyle: {
                normal: {
                  color: "#FE7979",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.Threshold18,
              name: "18国标",
              itemStyle: {
                normal: {
                  color: "#000000",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.depth1,
              name: "深度一"
            },
            {
              value: res1_radarseries.depth2,
              name: "深度二"
            },
            {
              value: res1_radarseries.depth3,
              name: "深度三"
            },
            {
              value: res1_radarseries.depth4,
              name: "深度四"
            }
          ];
        } else {
          legend = ["17国标", "18国标", "深度一"];
          combined_data = [
            {
              value: res1_radarseries.Threshold17,
              name: "17国标",
              itemStyle: {
                normal: {
                  color: "#FE7979",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.Threshold18,
              name: "18国标",
              itemStyle: {
                normal: {
                  color: "#000000",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.depth1,
              name: "深度一"
            }
          ];
        }
        this.temp_tableItems[p].radarseries = {};
        this.temp_tableItems[p].radarseries["legend"] = legend; //0——作为雷达图的legend
        this.temp_tableItems[p].radarseries["max"] = res1_radarseries.max;
        this.temp_tableItems[p].radarseries["data"] = combined_data;
      }
    },
    async getWaterRadarOptions(pointnum) {
      let combined_pn_at = {
        point_num: pointnum,
        assess_type: this.assessListQuery,
        type: "water"
      };
      let res1 = await getRadarWaterEachDepthValue(combined_pn_at);
      // console.log("数据库原始数据", res1.data.res) //雷达图测试
      if (typeof res1.data.res == "undefined") {
        //如果数据库不含雷达图的数据——很有可能
        let p = this.temp_water_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        this.temp_water_tableItems[p].radarseries = {};
        this.temp_water_tableItems[p].radarseries["legend"] = [];
        this.temp_water_tableItems[p].radarseries["max"] = [];
        this.temp_water_tableItems[p].radarseries["data"] = [];
      } else {
        let res1_radarseries = res1.data.res["0"];
        let p = this.temp_water_tableItems.findIndex(
          item => item.point_num == pointnum
        );
        let combined_data = [];
        let legend = [];
        if (
          res1_radarseries.hasOwnProperty("depth2") &&
          res1_radarseries.hasOwnProperty("depth1")
        ) {
          legend = ["17国标", "18国标", "深度一", "深度二"];
          combined_data = [
            {
              value: res1_radarseries.Threshold17,
              name: "17国标",
              itemStyle: {
                normal: {
                  color: "#FE7979",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.Threshold18,
              name: "18国标",
              itemStyle: {
                normal: {
                  color: "#000000",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.depth1,
              name: "深度一"
            },
            {
              value: res1_radarseries.depth2,
              name: "深度二"
            }
          ];
        } else {
          legend = ["17国标", "18国标", "深度一"];
          combined_data = [
            {
              value: res1_radarseries.Threshold17,
              name: "17国标",
              itemStyle: {
                normal: {
                  color: "#FE7979",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.Threshold18,
              name: "18国标",
              itemStyle: {
                normal: {
                  color: "#000000",
                  lineStyle: {
                    type: "dashed"
                  }
                }
              }
            },
            {
              value: res1_radarseries.depth1,
              name: "深度一"
            }
          ];
        }
        this.temp_water_tableItems[p].radarseries = {};
        this.temp_water_tableItems[p].radarseries["legend"] = legend; //0——作为雷达图的legend
        this.temp_water_tableItems[p].radarseries["max"] = res1_radarseries.max;
        this.temp_water_tableItems[p].radarseries["data"] = combined_data;
      }
    },
    setRadarOptions(radarserisevalue) {
      this.myRadarChart.setOption({
        title: {
          // text: this.$refs["cascaderAddr"].currentLabels[1] + "最新情况",
          text: "lab数据",
          x: "center",
          y: "50"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          hideDelay: 2000
        },
        legend: {
          // orient: "vertical",
          x: "center",
          y: 100,
          data: radarserisevalue.legend
        },
        toolbox: {
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
            indicator: radarserisevalue.max,
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
            center: ["50%", "65%"],
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
        color: ["#FE7979", "#000000", "#CCCC66", "#9999CC", "#99CCCC"],
        series: [
          {
            name: "17国标 vs 实际值",
            type: "radar",
            symbol: "rect", // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 4, // 拐点的大小
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.9
              }
            },
            data: radarserisevalue.data
          }
        ]
      });
    },

    async handleEarthLineElementData(row) {
      this.handleElementSelector(
        "expand",
        row.attention,
        row.listQueryOptions,
        row.point_num
      );
      await this.getEarthRadarOptions(row.point_num);
      await this.getEarthLineOptions(this.lineElementListQuery, row.point_num);
      let p = this.temp_tableItems.findIndex(
        earthitems => earthitems.point_num == row.point_num
      );
      // :data="drawRadar('myRadarChart'+props.row.point_num, props.row.radarseries)"
      this.drawRadar(
        "myEarthRadarChart" + row.point_num,
        this.temp_tableItems[p].radarseries
      );
      this.drawLine(
        "myEarthLineChart" + row.point_num,
        this.temp_tableItems[p].lineseries
      );
    },
    async handleWaterLineElementData(row) {
      this.handleElementSelector(
        "expand",
        row.attention,
        row.listQueryOptions,
        row.point_num
      );
      await this.getWaterRadarOptions(row.point_num);
      await this.getWaterLineOptions(this.lineElementListQuery, row.point_num);
      let p = this.temp_water_tableItems.findIndex(
        earthitems => earthitems.point_num == row.point_num
      );
      this.drawRadar(
        "myWaterRadarChart" + row.point_num,
        this.temp_water_tableItems[p].radarseries
      );
      this.drawLine(
        "myWaterLineChart" + row.point_num,
        this.temp_water_tableItems[p].lineseries
      );
    },

    handleElementSelector(expand, attention, listqueryoptions, pointnum) {
      this.temp_barElementOptions = [];
      if (attention[0] == "无") {
        this.temp_barElementOptions = [
          {
            label: "无超标元素",
            value: -1
          }
        ];
      } else {
        for (let i of attention) {
          this.barElementOptions.map(item => {
            if (item.label == i) {
              this.temp_barElementOptions.push(item);
              return;
            }
          });
        }
        if (expand == "expand") {
          this.lineElementListQuery = listqueryoptions[0].value;
        } else {
          //如果expand 等于bar
          this.barElementListQuery = listqueryoptions[0].value;
        }
      }
    }
  },
  mounted() {
    this.getData();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.charts) {
          this.charts.forEach(item => {
            item.resize();
          });
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
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
.project-info-container-echart {
  padding: 30px;
  .chart_contain {
    margin-left: 30px;
  }
  .filter-container {
    display: flex;
    justify-content: flex-start;
    // margin-bottom: 30px;
    margin: 8px 0px 30px 0px;
    border-radius: 8px;
    background-color: #339999;
    .filter-item {
      margin: 5px 0px 0px 8px;
      // margin-left: 20px;
      width: 130px;
    }
    .p-item {
      padding-left: 10px;
      padding-right: 5px;
      color: #cccc99;
    }
  }
}
</style>


