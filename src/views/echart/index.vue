<template>
  <div>
    <div class="content-head">
      <el-cascader
        expand-trigger="hover"
        :options="options"
        clearable
        v-model="selectedOptions"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="app-container">
      <!-- 树状图 -->
      <div class="chart_contain">
        <div id="myChart2" :style="{width: '450px', height: '350px'}"></div>
      </div>
      <!-- 折线图 -->
      <div class="chart_contain">
        <div id="myChart" :style="{width: '450px', height: '350px'}"></div>
      </div>
      <!-- 饼图 -->
      <div class="chart_contain">
        <!-- <PieChart></PieChart> -->
        <div id="mychart3" :style="{width: '450px', height: '350px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts"); // 引入基本模板
require("echarts/lib/chart/bar"); // 引入柱状图组件
// // 引入提示框和title组件
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

// import dataZoom from "./dataZoom.vue";
// import Depth from "./dataOfDepth.vue";
// import PieChart from "./pieChart.vue";

/* bar图接口 */
import { getAll } from "@/api/project_info";
import { getGroundList, getSpecifiedElementList } from "@/api/ground_info";

/* PieData接口 */
import { getAllPieData, getPieDataName} from "@/api/myecharts";

export default {
  name: "echarts",
  // components: { dataZoom, Depth, PieChart },
  data() {
    return {
      // barData: [],
      selectedOptions: [],
      /* 定义bar图的数据 */
      location: [],
      series: [],
      /* 定义饼图的数据 */
      pieData: []
    };
  },
  mounted() {
    this.getData();
    // this.getPieList();
    
    // this.drawLine();

    this.drawZoom();
  },
  methods: {
    /* 获取数据库的数据 */
    async getBarList() {
      /* 获取bar图所需的信息 */
      let res = await getSpecifiedElementList(this.selectedOptions);
      let arr_res = res.data.res1;
      //selectedOptions返回的是数组信息，如何对应到数据库里面的ground_num，并根据该索引取出数据呢？
      let ground_list = res.data.res;
      this.location.locationnumber = ground_list[0];
      this.location.locationtext = ground_list[1];
      this.location.pelements = ground_list[2];
      this.location.selected_point_num = ground_list[3];
      console.log("this.location.selected_point_num ", this.location.selected_point_num )

      this.series = arr_res;
      // console.log("series", this.series);
      return;
    },
    /* 获取饼图所需的信息 */
    async getPieList(point_num) {
      /* 需要两个参数：this.pieData.name  this.pieData.series */
      let res_point_num = point_num;
      console.log("res_point_num", res_point_num)
      let res = await getAllPieData(res_point_num);
      let res_pieData = res.data.res;
      // console.log("我是饼图的res", res_pieData);
      this.pieData.series = res_pieData;
      console.log("我是饼图的res", this.pieData.series);

      let res1 = await getPieDataName(res_point_num);
      let res_pieDataName = res1.data.req;
      // console.log("我是饼图的res1", res_pieDataName);
      this.pieData.name = res_pieDataName;
      console.log("我是饼图的res1", this.pieData.name);

      

    },
    /* 响应级联选择器的变动 */
    async handleChange(value) {
      if (value.length == 3) {
        console.log("选项值", value);
        await this.getBarList();
        await this.getPieList(this.location.selected_point_num )
        this.drawLine();
        this.drawPie();
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
        this.options[0].children[0].value,
        this.options[0].children[0].children[0].value
      ];
      this.handleChange(this.selectedOptions);
      // console.log("options", this.options); //打印树形数据
    },
    /* bar图的初始化函数 */
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      // console.log("location number in drawline", this.location.locationtext);
      // 绘制图表
      myChart2.setOption({
        title: {
          show: true, //默认为true，可以省略
          text: "项目点各深度元素一览",
          // subtext: "纯属虚构",
          x: "center",
          y: "5"
        },
        tooltip: {
          trigger: "axis",
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
          y: "45",
          data: this.location.pelements
        },
        grid: {
          top: "150", //图表内容距上下左右的距离，可设置top，left，right，bottom
          bottom: "0",
          left: "2%",
          right: "80",
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "5%",
          y: "150",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            // magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            magicType: { show: true, type: ["line", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.location.locationtext
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.series
      });
    },
    /* 饼图的初始化函数 */
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let mychart3 = echarts.init(document.getElementById("mychart3"));
      var option1 = {
        title: {
          text: "项目点1-深度1-元素比例",
          //   subtext: "虚拟数据",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          orient: "vertical",
          x2: "5%",
          y: "150"
        },
        grid: {
          top: "180", //图表内容距上下左右的距离，可设置top，left，right，bottom
          bottom: "0",
          containLabel: true
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "45",
          data: this.pieData.name
          /* [
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
          ] */
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "5%",
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
            name: "元素含量",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
            data: this.pieData.series
            /* [
              { value: 44, name: "PH值" },
              { value: 67, name: "砷" },
              { value: 89, name: "镉" },
              { value: 99, name: "铬" },
              { value: 87, name: "铜" },
              { value: 335, name: "铅" },
              { value: 335, name: "汞" },
              { value: 34, name: "镍" },
              { value: 54, name: "锑" },
              { value: 65, name: "铍" },
              { value: 76, name: "钴" },
              { value: 44, name: "锌" },
              { value: 55, name: "银" },
              { value: 67, name: "铊" },
              { value: 23, name: "锡" },
              { value: 32, name: "硒" },
              { value: 98, name: "钼" },
              { value: 76, name: "矾" }
            ] */
          }
        ]
      };
      // 绘制图表
      mychart3.setOption(option1);
    },
    /* 折线图的初始化函数 */
    drawZoom() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // console.log("location number in drawline", this.location.locationtext);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "150", //图表内容距上下左右的距离，可设置top，left，right，bottom
          bottom: "0",
          left: "2%",
          right: "80",
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x2: "5%",
          y: "150",
          feature: {
            mark: { show: true },
            dataZoom: { show: true },
            dataView: { show: true },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        dataZoom: {
          show: true,
          realtime: true,
          //orient: 'vertical',   // 'horizontal'
          //x: 0,
          y: 36,
          //width: 400,
          height: 20,
          start: 40,
          end: 60
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: (function() {
              var list = [
                "2018/3/12",
                "2018/3/13",
                "2018/3/14",
                "2018/3/15",
                "2018/3/16",
                "2018/3/17",
                "2018/3/18",
                "2018/3/19",
                "2018/3/20",
                "2018/3/21",
                "2018/3/22",
                "2018/3/23",
                "2018/3/24",
                "2018/3/25",
                "2018/3/26",
                "2018/3/27",
                "2018/3/28",
                "2018/3/29",
                "2018/3/30",
                "2018/3/31",
                "2018/4/1 ",
                "2018/4/2 ",
                "2018/4/3 ",
                "2018/4/4 ",
                "2018/4/5 ",
                "2018/4/6 ",
                "2018/4/7 ",
                "2018/4/8 ",
                "2018/4/9 ",
                "2018/4/10"
              ];
              // var n = 0;
              // while (n++ < 150) {
              //   list.push(n);
              // }
              // // console.log("list of hengzuobioa",list)
              return list;
            })()
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "dz",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 30));
              }
              // console.log("list of zongzuobiao", list);
              return list;
            })()
          }
        ],
        calculable: false
      });
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
  },
  created() {
    // this.getPieList();
  }
};
</script>

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #f0f2f5;
  flex-wrap: wrap;
}
.chart_contain {
  height: 500px;
  width: 600px;
  border: 1px solid #eeeeee;
  padding: 5px;
  background: #ffffff;
  margin-bottom: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>