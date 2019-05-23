<template>
  <div class="project-info-container">
    <div class="project-selector">
      <el-cascader
        :options="ProjectOptions"
        expand-trigger="hover"
        v-model="selectedProject"
        @change="projectChange"
      />
    </div>

    <div class="content">
      <div class="content-head">
        <!-- <div class="content-title">详细数据</div> -->
        <span class="lable">请选择监测点位：</span>
        <el-select
          v-model="selectedPoint"
          placeholder="请选择监测点位"
          @change="pointChange"
        >
          <el-option
            v-for="item in pointOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <span class="lable">请选择调查类型：</span>
        <el-select
          v-model="selectedAssessType"
          placeholder="请选择调查类型"
          @change="assessTypeChange"
        >
          <el-option
            v-for="item in assess_type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-tabs
        v-model="activeName"
        @tab-click="switchTab"
      >
        <el-tab-pane
          label="土壤信息"
          name="first"
        >
          <el-table
            v-loading="listLoading"
            :data="lab_ground_list"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <!-- <div v-if="props.row.labGround_element[0].ispollution==3" class="nodata">今日数据尚未更新</div> -->
                <div class="drop-container">
                  <div class="table2-container">
                    <el-table
                      :data="props.row.labGround_element"
                      :row-class-name="tableRowClassName"
                      class="drop_table"
                    >
                      <el-table-column label="指标">
                        <template slot-scope="scope">
                          <span :class="{pollution: scope.row.ispollution}">{{ element_Map.get(scope.row.element) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="数值">
                        <template slot-scope="scope">
                          <span :class="{pollution: scope.row.ispollution}">{{ handleElementValue(scope.row.value) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="参考值">
                        <template slot-scope="scope">
                          <span>{{ scope.row.reference }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="单位">
                        <template slot-scope="scope">
                          <span>{{ scope.row.unit }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="chart_contain">
                    <ve-histogram
                      :data="handleChartData(props.row.labGround_element)"
                      :settings="chartSettings3"
                      width="450px"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="point_num"
              label="样本编号"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.sample_num }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="point_num"
              label="调查类型"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ assess_type_options[scope.row.assess_type].label }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="位置"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="400"
                  v-if="scope.row.lng"
                  trigger="click"
                >
                  <div class="map_container2">
                    <el-amap
                      ref="map2"
                      :vid="scope.row.sample_num"
                      :center="[scope.row.lng, scope.row.lat]"
                      :zoom="zoom"
                      class="amap-demo"
                    >
                      <el-amap-marker
                        :position="[scope.row.lng, scope.row.lat]"
                        :vid="scope.row.id"
                        animation="AMAP_ANIMATION_DROP"
                      />
                    </el-amap>
                  </div>
                  <el-button
                    slot="reference"
                    size="mini"
                  >查看</el-button>
                </el-popover>
                <div v-else>
                  <el-tag type="info">暂无位置信息</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="深度"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.sample_depth || '\\' }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="污染物"
              align="center"
            >
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.point_element[0].ispollution==3">
                <el-tag>今日数据尚未更新</el-tag>
                </template>-->
                <template v-if="handlePollutionList(scope.row.labGround_element).length">
                  <el-tag
                    v-for="(item,index) in handlePollutionList(scope.row.labGround_element)"
                    type="danger"
                    :key="index"
                  >{{ element_Map.get(item.element) }}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无污染元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              label="采样日期"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ handleTime(scope.row.date) }}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 8, 10]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="total"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="水质信息"
          name="second"
        >
          <el-table
            v-loading="listLoading2"
            :data="lab_water_list"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="drop-container">
                  <div class="table2-container">
                    <el-table
                      :data="props.row.labWater_element"
                      :row-class-name="tableRowClassName"
                      class="drop_table"
                    >
                      <el-table-column label="指标">
                        <template slot-scope="scope">
                          <span :class="{pollution: scope.row.ispollution}">{{ element_Map.get(scope.row.element) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="数值">
                        <template slot-scope="scope">
                          <span :class="{pollution: scope.row.ispollution}">{{ handleElementValue(scope.row.value) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="参考值">
                        <template slot-scope="scope">
                          <span>{{ scope.row.reference }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="单位">
                        <template slot-scope="scope">
                          <span>{{ scope.row.unit }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="chart_contain">
                    <ve-histogram
                      :data="handleChartData(props.row.labWater_element)"
                      :settings="chartSettings3"
                      width="450px"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="point_num"
              label="样本编号"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_num }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="point_num"
              label="调查类型"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ assess_type_options[scope.row.assess_type].label }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="位置"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="400"
                  v-if="scope.row.lng"
                  trigger="click"
                >
                  <div class="map_container2">
                    <el-amap
                      ref="map2"
                      :vid="scope.row.sample_num"
                      :center="[scope.row.lng, scope.row.lat]"
                      :zoom="zoom"
                      class="amap-demo"
                    >
                      <el-amap-marker
                        :position="[scope.row.lng, scope.row.lat]"
                        :vid="scope.row.id"
                        animation="AMAP_ANIMATION_DROP"
                      />
                    </el-amap>
                  </div>
                  <el-button
                    slot="reference"
                    size="mini"
                  >查看</el-button>
                </el-popover>
                <div v-else>
                  <el-tag type="info">暂无位置信息</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="深度"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_depth || '\\' }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="污染物"
              align="center"
            >
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.point_element[0].ispollution==3">
                <el-tag>今日数据尚未更新</el-tag>
                </template>-->
                <template v-if="handlePollutionList(scope.row.labWater_element).length">
                  <el-tag
                    v-for="(item,index) in handlePollutionList(scope.row.labWater_element)"
                    type="danger"
                    :key="index"
                  >{{ element_Map.get(item.element) }}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无污染元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              label="采样日期"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ handleTime(scope.row.date) }}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 8, 10]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="total"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="监测点位分布"
          name="third"
        >
          <div class="map_container">
            <el-amap
              ref="map"
              :center="center"
              vid="amapDemo"
              :zoom="zoom"
              :plugin="plugin"
              :events="events"
              class="amap-demo"
            >
              <el-amap-marker
                v-for="(marker, index) in markers"
                :position="marker.position"
                :visible="marker.visible"
                :vid="index"
                animation="AMAP_ANIMATION_DROP"
                :key="index"
              />
              <!-- <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div class="windows_contain">
          <div class="windows_title">{{window.content}}</div>
          <h1>设备分布：</h1>
          <div class="windows_content" v-for="(item,index) in markerInfo_list" :key="index">
            <p>{{item.info}}</p>
            <p>{{item.value}}</p>
          </div>
        </div>
              </el-amap-info-window>-->
            </el-amap>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getProjectInfo,
  getPointOptions,
  getMarkerList
} from '@/api/table/project_info';
import { getLabGroundList } from '@/api/table/ground_info';
import { getLabWaterList } from '@/api/table/water_info';
import { formatTime, formatTime2 } from '@/utils/time';
window.onload = function() {
  localStorage.clear()
};
export default {
  data() {
    return {
      activeName: 'first',
      ProjectOptions: [],
      selectedProject: [],
      pointOptions: [],
      selectedPoint: '0',
      selectedAssessType: 0,
      lab_ground_list: [],
      lab_water_list: [],
      listLoading: false,
      listLoading2: false,

      currentPage: 1,
      page_size: 5,
      total: 20,

      element_Map: '',
      chartSettings3: {
        showLine: ['reference'],
        labelMap: {
          element: '元素',
          value: '数值',
          reference: '参考值'
        }
      },
      markers: [],
      allMarkers: [],
      zoom: 17,
      center: [121.457624, 31.27586],
      events: {
        // init: o => {
        //   console.log(1, o.getCenter()); //获取地图中心
        //   console.log(2, this.$refs.map.$$getInstance()); //获取地图实例
        //   o.getCity(result => {
        //     console.log(3, result);
        //   });
        // }
      },
      plugin: [
        // "ToolBar", //手动调焦插件
        {
          pName: 'MapType',
          defaultType: 1
          // showRoad:true
        } // 卫星路况插件
      ]
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    /* 点击第三级目录时触发的事件 */
    async projectChange(value) {
      if (value.length == 2) {
        console.log("选项值", value);
        const currentPage = 1; //选择项目体后重置页码为1
        const page_size = this.page_size;
        this.selectedPoint = "0";
        this.selectedAssessType = 0;
        this.getList(currentPage, page_size);
        let res = await getPointOptions(value[1]);
        console.log("PointOptions", res);
        this.pointOptions = res.data.res;

        let res2 = await getMarkerList(value[1]);
        let res_markers = res2.data.res;
        let markers = [];
        res_markers.forEach(item => {
          markers.push({
            id: item.id,
            point_num: item.point_num,
            position: [item.point_lng, item.point_lat],
            visible: true
          });
        });
        if (markers.length) {
          this.center = markers[0].position;
        }

        this.markers = markers;
        this.allMarkers = markers;
        console.log("markers", markers);
      }
    },

    pointChange() {
      this.currentPage = 1; //选择类型后重置页码为1
      const page_size = this.page_size;
      console.log("selectedPoint", this.selectedPoint);
      if (this.selectedPoint !== "0") {
        this.markers = this.allMarkers.filter(item => {
          return item.point_num == this.selectedPoint;
        });
      } else {
        this.markers = this.allMarkers;
      }
      this.getList(this.currentPage, page_size);
    },

    assessTypeChange() {
      this.currentPage = 1; //选择类型后重置页码为1
      const page_size = this.page_size;
      console.log("selectedAssessType", this.selectedAssessType);
      this.getList(this.currentPage, page_size);
    },

    handleTime(time) {
      return formatTime2(time);
    },

    handleElementValue(value) {
      if (value == 0) {
        return "ND";
      } else if (value == "-1") {
        return "-/";
      } else {
        return value;
      }
    },

    handleSizeChange(page_size) {
      this.currentPage = 1;
      this.page_size = page_size;
      this.getList(this.currentPage, page_size);
    },
    handleCurrentChange(currentPage) {
      let page_size = this.page_size;
      this.currentPage = currentPage;
      this.getList(currentPage, page_size);
    },

    switchTab(tabName) {
      this.currentPage = 1;
      if (tabName.name !== "third") {
        console.log("tabName", tabName.name);
        this.getList(this.currentPage, this.page_size);
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.value === "-1") {
        return "notdetector-row";
      } else if (row.value === "0") {
        return "notvalue-row";
      } else {
        if (!row.ispollution) {
          return "";
        } else {
          return "pollution-row";
        }
      }
    },

    /* 根据传递过来的表格参数返回图表的数据格式 */
    handleChartData(params) {
      let params_copy = JSON.parse(JSON.stringify(params));

      let rows_arr = params_copy.map(item => {
        item.element = this.element_Map.get(item.element); //根据element做Map映射获得对应的元素名称
        delete item.ispollution;
        return item;
      });
      return {
        columns: ["element", "value", "reference"],
        rows: rows_arr
      };
    },

    /* 根据传递过来的表格参数返回受污染的元素列表 ，然后v-for遍历数组在table中渲染受污染的元素 */
    handlePollutionList(params) {
      return params.filter(item => {
        return item.ispollution;
      });
    },

    /* 判断是否为污染元素，如果是动态改变class标红显示 */
    isPollutionRow({ row, rowIndex }) {
      if (row.ispollution) {
        return "pollution-row";
      } else {
        return "";
      }
    },

    /* 请求api获取该地块对应的所有监测点位 */
    async getList(currentPage, page_size) {
      let TableOptions = {
        selectedProject: this.selectedProject[1],
        selectedPoint: this.selectedPoint,
        selectedAssessType: this.selectedAssessType,
        currentPage,
        page_size
      };
      console.log("TableOptions", TableOptions);

      if (this.activeName == "first") {
        this.listLoading = true;

        let res = await getLabGroundList(TableOptions);
        console.log("GroundList", res);
        this.lab_ground_list = res.data.res;
        this.total = res.data.count;
        this.element_Map = new Map(res.data.element_Map);
        this.listLoading = false;
      } else {
        this.listLoading2 = true;
        let res = await getLabWaterList(TableOptions);
        console.log("WaterList", res);
        this.lab_water_list = res.data.res;
        this.total = res.data.count;
        this.element_Map = new Map(res.data.element_Map);
        this.listLoading2 = false;
      }
    },

    // /* 点击跳转到地图页面 */
    // getDetailInfo(index, data) {
    //   this.$router.push({ path: "/echart/index", query: { index, data } });
    // },

    /* 请求二级选择器的树形数据 */
    async getData() {
      let res = await getProjectInfo();
      this.ProjectOptions = res.data.res;
      console.log("ProjectOptions", this.ProjectOptions); //树形格式
      this.selectedProject = [
        this.ProjectOptions[0].value,
        this.ProjectOptions[0].children[0].value
      ];
      this.projectChange(this.selectedProject);
    }
  },

  computed: {
    assess_type_options() {
      return [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "初步调查"
        },
        {
          value: 2,
          label: "详细调查"
        },
        {
          value: 3,
          label: "修复调查"
        }
      ];
    }
  },

  watch: {
    // '$route': function(value){
    //   console.log('value', value)
    //   if(value.query){
    //   let transmit_project_num = value.query.transmit_project_num
    //   let ProjectOptions = this.ProjectOptions
    //   for(let i =0;i<=ProjectOptions.length;i++){
    //     let item = ProjectOptions[i]
    //     let res = item.children.find(item=>{
    //       return item.value == transmit_project_num
    //     })
    //     if(res){
    //       this.selectedProject = [res.value, transmit_project_num]
    //       break
    //     }
    //   }
    // }
    // }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.project-info-container {
  .project-selector {
    width: 100%;
    height: 50px;
    background: rgb(153, 204, 204);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > span {
      margin-right: 10px;
    }
  }

  .content {
    padding: 20px;
  }

  .content-head {
    margin-bottom: 15px;

    .content-title {
      border-left: 2px solid #409eff;
      padding: 10px;
      margin-bottom: 15px;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, Arial, sans-serif;
    }

    .lable {
      margin-left: 15px;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, Arial, sans-serif;
    }

    .el-input {
      width: 280px;
    }
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

  .nodata {
    color: rgba(245, 75, 75, 0.933);
  }

  .pollution-row {
    background: rgba(245, 75, 75, 0.933);
  }

  .notdetector-row {
    background: #f0f9eb;
  }

  .notvalue-row {
    background: oldlace;
  }

  .pagination {
    margin-top: 30px;
  }

  .map_container {
    height: 500px;
  }
}
.el-popper {
  .map_container2 {
    height: 300px;
  }
}
</style>
