<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#99CCCC;padding:16px 16px 16px; margin-bottom: 32px">
      <el-cascader
        ref="cascaderAddr"
        expand-trigger="hover"
        :options="options"
        clearable
        class="filter-item"
        v-model="selectedOptions"
        @change="handleChange"
      ></el-cascader>
    </el-row>
    <!-- 折线图 -->

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart ref='linechild'></LineChart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <BarChart ref="barchild" v-on:barEvent="getMsgFromBar"></BarChart>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <RadarChart ref="radarchild"></RadarChart>
      </el-col>
    </el-row>
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
// import { getAll } from "@/api/echarts";
import { getAll, getGroundList } from "@/api/echarts";
import {
  getSpecifiedElementList,
  getRadarRealTimeValue,
  getRadarData
} from "@/api/echarts";

/* 导入组件 */
import RadarChart from './radarChart'
import BarChart from './barChart'
import LineChart from './lineChart'

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
  name: "echarts",
  components: {
    RadarChart,
    BarChart,
    LineChart
  },
  data() {
    return {
      selectedOptions: [],
      selectedOptionsLabel: [],
      /* 定义bar图的数据 */
      location: [],
      // radarSeries: [],
      series: [],
      /* 定义饼图的数据 */
      listQuery1: { element: "PH值" },
      listQuery2: { element: "PH值" },
      listQuery3: { depth: "深度1" },
      depthOptions: ["深度1", "深度2", "深度3"],
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
    this.getData();
  },
  methods: {
    /* 获取bar传过来的location和series */
    getMsgFromBar(params1,params2){
      this.location = params1
      console.log("this.location in getMsgFromBar", params1)
      this.series = params2
    },

    /* 响应级联选择器的变动 */
    async handleChange(value) {
      if (value.length == 3) {
        console.log("选项值", value);
        // console.log(this.listQuery1);
        /* 获取标题名称 */
        this.selectedOptionsLabel = this.$refs["cascaderAddr"].currentLabels;
        this.$nextTick(async () => {
          await this.$refs.barchild.getBarList(this.selectedOptions, this.$refs["cascaderAddr"].currentLabels);
          // await this.getRadarList();
          console.log("this.location.selected_point_num", this.location)
          await this.$refs.radarchild.getRadarList(this.location.selected_point_num);
          this.$refs.barchild.drawLine();
          this.$refs.linechild.drawZoom();
          this.$refs.radarchild.drawRadar();
          // this.drawRadar();
        });
      }
    },

    /* 获取树形表格的数据 */
    async getData() {
      let Alldata = await getAll();
      let project_Info = Alldata.data.res;
      // console.log("project_Info", project_Info); //普通格式数组，需转化为树形格式

      //第一层for循环遍历第一级选择器选项，由于第二级选项为固定，本项目采取静态数据，然后把第二级选项数据循环push到每个第一级chilren下
      for (let i = 0; i < this.options.length; i++) {
        let secondOptions_temp = [
          {
            value: "1",
            label: "初步调查",
            children: []
          },
          {
            value: "2",
            label: "详细调查",
            children: []
          },
          {
            value: "3",
            label: "治理修复",
            children: []
          }
        ];
        // 因为secondOptions_temp后续将作不同修改，需要深拷贝防止对其引用地址造成干扰
        let secondOptions_copy = JSON.parse(JSON.stringify(secondOptions_temp));
        this.options[i].children.push(secondOptions_copy);
        // console.log("this Options", this.options);

        //第二层for循环遍历第二层选择器选项
        for (let j = 0; j < secondOptions_copy.length; j++) {
          let value_1 = this.options[i].value;
          let value_2 = secondOptions_copy[j].value;

          //把前两级选项的值赋值给变量，再对之前请求到的普通格式数组筛选出对应的数据
          let res = project_Info.filter(item => {
            return item.area == value_1 && item.assess_type == value_2;
          });

          let tree_data = [];

          //转换为需要的chilren数据格式
          if (res.length) {
            for (let z = 0; z < res.length; z++) {
              tree_data.push({
                value: res[z].ground_num,
                label: res[z].ground_name
              });
            }
          }
          //push给第二级的chilren
          secondOptions_copy[j].children = tree_data;
        }
        //令第一级的children等于已经处理好的（已push children的）第二级目录
        this.options[i].children = secondOptions_copy;
      }
      //初始选项
      this.selectedOptions = [
        this.options[0].value,
        this.options[0].children[2].value,
        this.options[0].children[2].children[0].value
      ];
      this.handleChange(this.selectedOptions);
      // console.log("options", this.options); //打印树形数据
    },
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
  },

};
</script>

<style  rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);

  .filter-container {
    // display: flex;
    display: block;
    // justify-content: flex-start;
    justify-content: space-between;
    margin: 20px;
    .filter-item {
      margin-left: 20px;
      margin-top: 20px;
      width: 70px;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  // }
}
.chart-item {
  width: 450px;
  height: 350px;
  margin: 10%;
}

.chart_contain {
  height: 500px;
  width: 600px;
  border: 1px solid #eeeeee;
  padding: 5px;
  background: #ffffff;
  margin-bottom: 32px;
  margin-left: 10px;
  // display: flex;
  display: block;
  justify-content: center;
  // align-items: center;
  .filter-item {
    margin-left: 20px;
    margin-top: 12px;
    width: 100px;
  }
  .chart-item {
    width: 450px;
    height: 350px;
    margin: 10%;
  }
}
.chart_contain1 {
  height: 600px;
  width: 1200px;
  border: 1px solid #eeeeee;
  padding: 50px;
  background: #ffffff;
  margin-bottom: 32px;
  margin-left: 10px;
  // display: flex;
  display: block;
  justify-content: center;
  // align-items: center;
  .filter-item {
    margin-left: 20px;
    margin-top: 12px;
    width: 100px;
  }
}
</style>