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
          <div v-if="props.row.point_element[0].ispollution==3" class="nodata">今日数据尚未更新</div>
          <div class="drop-container" v-else>
            <div class="table2-container">
              <el-table :data="props.row.point_element" class="drop_table">
                <el-table-column label="指标">
                  <template slot-scope="scope">
                    <span :class="{pollution: scope.row.ispollution}">{{ element_Map.get(scope.row.element) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="数值">
                  <template slot-scope="scope">
                    <span :class="{pollution: scope.row.ispollution}">{{ scope.row.value||'ND'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参考值">
                  <template slot-scope="scope">
                    <span>{{ scope.row.reference }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="chart_contain">
              <ve-histogram
                :data="handleChartData(props.row.point_element)"
                :settings="chartSettings3"
                width="450px"
              ></ve-histogram>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="point_num" label="点位编号" align="center" sortable>
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
          <router-link :to="{ path: '/map/index', params: { data:scope.row }}">
            <i class="el-icon-location-outline"></i>
          </router-link>
          <span style="margin-left: 10px">{{ scope.row.point_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点位描述" width="160" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.point_intro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="污染物" align="center">
        <template slot-scope="scope">
           <template  v-if="scope.row.point_element[0].ispollution==3">
            <el-tag >今日数据尚未更新</el-tag>
          </template>
          <template v-else>
            <el-tag type="danger" v-for="(item,index) in handlePollutionList(scope.row.point_element)" :key="index">{{element_Map.get(item.element)}}</el-tag>
          </template>        
        </template>
      </el-table-column>
     
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="getAllHistory(scope.row.point_num)">历史数据</el-button>
          <el-button size="mini" type="danger" @click="getDetailInfo(scope.$index, scope.row)">详情信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="历史数据" :visible.sync="dialogHistoryVisible" >

      <el-select v-model="fliter_element" multiple placeholder="请选择">
        <el-option
          v-for="(item,index) in element_options"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-date-picker
        v-model="fliter_date"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy.MM.dd">
      </el-date-picker>

      <el-button type="primary" @click="fliterElement" size="medium">查询</el-button>

      <el-table :data="HistoryList2" :row-class-name="isPollutionRow"  height="350">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="date" label="日期"></el-table-column>
        <el-table-column label="元素">
          <template slot-scope="scope">
          <span>{{ element_Map.get(scope.row.element) }}</span>
        </template>
        </el-table-column>
        <el-table-column property="value" label="数值"></el-table-column>
        <el-table-column property="reference" label="参考值"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getAll } from "@/api/project_info";
import { getGroundList, getAllHistoryData } from "@/api/ground_info";


export default {
  data() {
    return {
      selectedOptions: [],
      ground_list: [],
      listLoading: false,
      dialogHistoryVisible: false,
      // element_list:['PH值','砷','镉','铬','铜','铅','汞','镍','锑','铍','钴','锌','银','铊','锡','硒','钼','矾'],
      element_Map: new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead','铅']
    , ['mercury','汞'], ['nickel','镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
  ['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']]),
      HistoryList: [],
      HistoryList2: [],
      element_options: [],
      fliter_element: [],
      fliter_date:'',
      chartSettings3: {
        showLine: ["reference"],
        labelMap: {
          element: "元素",
          value: "数值",
          reference: "参考值"
        } 
      },
    };
  },
  methods: {
    /* 点击第三级目录时触发的事件 */
    handleChange(value) {
      if (value.length == 3) {
        console.log("选项值", value);
        this.getList();
      }
    },

     /* 根据传递过来的表格参数返回图表的数据格式 */
    handleChartData(params){
      let params_copy = JSON.parse(JSON.stringify(params))
      
      let rows_arr = params_copy.map(item=>{
        item.element = this.element_Map.get(item.element) //根据element做Map映射获得对应的元素名称
        delete item.ispollution
        return item
      })
      console.log('rows_arr', rows_arr)
      return {
        columns: ["element", "value", "reference"],
        rows: rows_arr
      }
    },

    /* 根据传递过来的表格参数返回受污染的元素列表 ，然后v-for遍历数组在table中渲染受污染的元素 */
    handlePollutionList(params){
      return params.filter(item=>{
        return item.ispollution
      })
    },

     /* 判断是否为污染元素，如果是动态改变class标红显示 */
    isPollutionRow({row, rowIndex}) {
        if (row.ispollution) {
          return 'pollution-row';
        } else{
          return '';
        }
      },

     /* 历史数据筛选 */
    fliterElement(){
      console.log('fliter_element', this.fliter_element)
      let options1 = this.fliter_element //元素筛选项，数组形式
      let options2 = this.fliter_date //时间间隔筛选项，数组形式
  
      this.HistoryList2 = this.HistoryList.filter(item=>{
        if(options1.length&&!options1.includes('all')&&!options1.includes(item.element)){
          return false //判断元素筛选项有值且不为all(全部)，再判断历史列表中的元素中有哪些包含在选项元素中，不包含就返回false,过滤掉该数据
        }
        if(options2.length){
          let res1 = item.date.split('.').join('')
          let res2 = options2[0].split('.').join('')
          let res3 = options2[1].split('.').join('')
          let isSelectedDate = res1>=res2&&res1<=res3 //将形式为2019.04.08这样的时间格式转化为20180408,通过判断数字大小来筛选对应时间间隔的数据
          if(!isSelectedDate){
            return false
          }else{
            return true
          }
        }
        return true //选项1或选项2为空，表示无筛选项，返回对应的全部数据
        
      })
      
    },

    /* 请求api获取该地块对应的所有监测点位 */
    async getList() {
      this.listLoading = true;
      let res = await getGroundList(this.selectedOptions)
      this.listLoading = false
      this.ground_list = res.data.res
      console.log("ground_list", res)
    },

    /* 请求api获取该监测点位的所有历史数据，并清空上次查询留下的查询条件 */
    async getAllHistory(point_num) {
      this.dialogHistoryVisible = true
      let res = await getAllHistoryData(point_num)
      this.HistoryList = res.data.res
      this.HistoryList2 = res.data.res
      this.fliter_element = []
      this.fliter_date = []
      console.log('HistoryList', this.HistoryList)

      //返回的数据是所有的历史纪录，需要对数组去重生成该监测点位具有的元素筛选项，并转换为element-ui选择器的格式
      let element_options_arr = res.data.res.filter((item,index,self)=>{
        return index==self.indexOf(item)
      }) 
      this.element_options = element_options_arr.map(item=>{
        return item = {value:item.element,label:this.element_Map.get(item.element)}
      })
      this.element_options.unshift({value:'all',label:'全部'}) //在选项头部添加一条全部
    },

    /* 点击跳转到地图页面 */
    getDetailInfo(index, data) {
      this.$router.push({ path: "/echart/index", query: { index, data } });
    },
    
    /* 生成三级选择器的树形数据 */
    async getData() {
      let Alldata = await getAll()
      let project_Info = Alldata.data.res
      console.log("project_Info", project_Info) //普通格式数组，需转化为树形格式

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
        ]
        // 因为secondOptions_temp后续将作不同修改，需要深拷贝防止对其引用地址造成干扰
        let secondOptions_copy = JSON.parse(JSON.stringify(secondOptions_temp)) 
        this.options[i].children.push(secondOptions_copy);

        //第二层for循环遍历第二层选择器选项
        for (let j = 0; j < secondOptions_copy.length; j++) {
          let value_1 = this.options[i].value;
          let value_2 = secondOptions_copy[j].value

          //把前两级选项的值赋值给变量，再对之前请求到的普通格式数组筛选出对应的数据
          let res = project_Info.filter(item => {
            return item.area == value_1 && item.assess_type == value_2
          })

          let tree_data = [];

          //转换为需要的chilren数据格式
          if (res.length) {
            for (let z = 0; z < res.length; z++) {
              tree_data.push({
                value: res[z].ground_num,
                label: res[z].ground_name
              })
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
      ]
      this.handleChange(this.selectedOptions)
      console.log("options", this.options)   //打印树形数据
    }
  },

  mounted() {
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.project-info-container {
  padding: 30px;
  .content-head {
    margin-bottom: 30px;
  }
  .el-input {
    width: 280px;
  }

  .drop_table {
    width: 100%;
  }
  .drop_table td,
  .drop_table th {
    border-right: none !important;
  }
  .drop-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .table2-container {
    flex: 1;
  }
  .chart_contain {
    margin-left: 30px;
  }
  .pollution,.nodata{
    color: rgba(245, 75, 75, 0.933)

  }
  .pollution-row{
    background: rgba(245, 75, 75, 0.933)
  }
}
</style>

