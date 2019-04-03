<template>
  <div class="project-info-container">
    <div class="content-head">
    <el-cascader
      expand-trigger="hover"
      :options="options"
      clearable 
      v-model="selectedOptions"
      @change="handleChange"
    ></el-cascader>
  </div>

     <el-table v-loading="listLoading" :data="ground_list" border stripe style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
      <div class="drop-container">
        <div class="table2-container">
        <el-table
      :data="pollutionList"
      class="drop_table">
      <el-table-column
        prop="pollution"
        label="指标">
      </el-table-column>
      <el-table-column
        prop="value"
        label="数值">
      </el-table-column>
      <el-table-column
        prop="reference"
        label="参考值">
      </el-table-column>
    </el-table>
        </div>
    <div class="chart_contain">
      <ve-histogram :data="chartData_h" :settings="chartSettings3" :extend="extend2" width="450px"></ve-histogram>
    </div>
    </div>
      </template>
    </el-table-column>
      <el-table-column prop='point_num' label="点位编号" align="center" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.point_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="深度" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.point_depth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="具体位置" width="180" align="center">
        <template slot-scope="scope">
          <router-link :to="{ path: '/map/index', params: { data:scope.row }}"><i class="el-icon-location-outline"></i>
          </router-link>
          <span style="margin-left: 10px">{{ scope.row.point_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="污染物" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column label="检测值" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sampling_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参考值" width="100" align="center">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reference||'2' }}</span>       
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="getHistory(scope.$index, scope.row)">历史数据</el-button>
          <el-button size="mini" type="danger" @click="getDetailInfo(scope.$index, scope.row)">详情信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogHistoryVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" ></el-table-column>
    <el-table-column property="name" label="姓名" ></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>

<script>
import { getAll} from "@/api/project_info"
import { getGroundList} from "@/api/ground_info"

export default {
  data() {
    return {
      selectedOptions: [],
      ground_list:[],
      listLoading: false,
      dialogHistoryVisible:false,
      element_list:['PH值','砷','镉','铬','铜','铅','汞','镍','锑','铍','钴','锌','银','铊','锡','硒','钼','矾'],

       gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],

        chartData_h: {
        columns: ["元素", "数值", "参考值"],
        rows: [
          { 元素: 'PH值', 数值: 8.01, 参考值: 6},
          { 元素: '铬', 数值: 20.6, 参考值: 5},
          { 元素: '汞', 数值: 3.6, 参考值: 4},
          { 元素: '镍', 数值: 8.95, 参考值: 9},
          { 元素: '锑', 数值: 36.5, 参考值: 16}
        ]
      },

      chartSettings3: {
        //  metrics: ['访问用户', '下单用户'],
        showLine: ["参考值"],
        // axisSite: { right: ["下单率"] }, //设置右y轴指标
        // yAxisType: ["KMB", "percent"], //数据格式
        // yAxisName: ["数值", "比率"] //设置双y轴
      },

       extend2: {
        // series: {
        //   label: { show: true, position: "top" }
        // }
      },
    };
  },
  methods: {
    handleChange(value) {   
      if(value.length==3){
        console.log("选项值", value)
        this.getList()
      }
    },

    async getList(){
      this.listLoading = true
      let res = await getGroundList(this.selectedOptions)
      let res2 = await getGroundList(this.selectedOptions)
      this.listLoading = false
      this.ground_list = res.data.res
      console.log(res)
    },

    async getHistory(){
      this.dialogHistoryVisible = true
    },

    getPollutionList(){
     
    },

    getDetailInfo(index, data){
      this.$router.push({path:'/echart/index', query:{index, data}})
    },

    async getData() {
      // let res = [{
      //   value: '31010720190001',
      //   label: '桃浦601',
      //  }]
      let Alldata = await getAll()
      let project_Info = Alldata.data.res
      console.log(project_Info)
     
      // var test_data = [
      //   {
      //     area: "0001",
      //     assess_type: 1,
      //     ground_name: "桃浦601",
      //     ground_num: "21212"
      //   },
      //   {
      //     area: "0001",
      //     assess_type: 1,
      //     ground_name: "桃浦602",
      //     ground_num: "34213123"
      //   },
      //   {
      //     area: "0002",
      //     assess_type: 2,
      //     ground_name: "桃浦603",
      //     ground_num: "435345"
      //   },
      //   {
      //     area: "0003",
      //     assess_type: 2,
      //     ground_name: "桃浦604",
      //     ground_num: "654645"
      //   },
      //   {
      //     area: "0005",
      //     assess_type: 3,
      //     ground_name: "桃浦605",
      //     ground_num: "654645"
      //   }
      // ];

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
        let secondOptions_copy = JSON.parse(JSON.stringify(secondOptions_temp));
        this.options[i].children.push(secondOptions_copy);

        for (let j = 0; j < secondOptions_copy.length; j++) {
          let value_1 = this.options[i].value;
          let value_2 = secondOptions_copy[j].value;

          let res = project_Info.filter(item => {
            return item.area == value_1 && item.assess_type == value_2;
          });
          console.log(res);

          let tree_data = [];

          if (res.length) {
            for (let z = 0; z < res.length; z++) {
              tree_data.push({
                value: res[z].ground_num,
                label: res[z].ground_name
              });
            }
          }
          secondOptions_copy[j].children = tree_data

        }
        this.options[i].children = secondOptions_copy
      }
      this.selectedOptions = [this.options[0].value, this.options[0].children[0].value, this.options[0].children[0].children[0].value]
      console.log(this.options);
      
    }
  },

  mounted() {
    console.log(this.options)
    this.getData()
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
    },

    pollutionList(){
       let list = [
        {
          pollution_element:0,
          value:8.01,
          reference:6
        },
        {
          pollution_element:3,
          value:20.6,
          reference:1
        },
        {
          pollution_element:6,
          value:3.6,
          reference:3
        },
        {
          pollution_element:7,
          value:8.95,
          reference:5
        },
        {
          pollution_element:8,
          value:36.5,
          reference:1
        },
      ]

      return list.map((item)=>{
          item.pollution=this.element_list[item.pollution_element]
          return item
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
 .project-info-container{
   padding: 30px;
   .content-head{
     margin-bottom: 30px
   }
   .el-input{
     width: 280px
   }
  
  .drop_table{
    width:100%;
  }
  .drop_table td, .drop_table th{ 
      border-right:none !important
  }
  .drop-container{
    display: flex;
    justify-content: space-around;
    align-items: center
    
  }
  .table2-container{
    flex: 1
  }
  .chart_contain{
    margin-left: 30px
  }
 }
</style>

