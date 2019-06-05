<template>
  <div class="project-info-container2">
    <div class="project-selector">
      <el-cascader
        expand-trigger="hover"
        :options="ProjectOptions"
        v-model="selectedProject"
        @change="projectChange"
      ></el-cascader>
    </div>

    <div class="content">
      <div class="content-head">
        <span class="lable">请选择监测点位：</span>
        <el-select v-model="selectedPoint" placeholder="请选择监测点位" @change="pointChange">
          <el-option
            v-for="item in pointOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <span class="lable">请选择调查类型：</span>
        <el-select v-model="selectedAssessType" placeholder="请选择调查类型" @change="assessTypeChange">
          <el-option
            v-for="item in assess_type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-tabs v-model="activeName" @tab-click="switchTab">
        <el-tab-pane label="土壤信息" name="first">
          <el-table
            v-loading="listLoading"
            :data="det_ground_list"
            border
            stripe
            style="width: 100%"
            @expand-change="expandChange"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="drop-container">
                  <div class="table2-container">
                    <el-table
                      :data="det_ground_reference"
                      class="drop_table"
                      :row-class-name="tableRowClassName"
                    >
                      <el-table-column label="指标">
                        <template slot-scope="scope">
                          <span>{{ element_Map.get(scope.row.element) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="数值">
                        <template slot-scope="scope">
                          <span>{{ handleElementValue(scope.row.value) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="背景数据参考值">
                        <template slot-scope="scope">
                          <span>{{ handleElementValue(scope.row.lab_reference) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="差值平方">
                        <template slot-scope="scope">
                          <span>{{ scope.row.difference }}</span>
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
                      :data="handleChartData(det_ground_reference)"
                      :settings="chartSettings3"
                      width="450px"
                    ></ve-histogram>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="point_num" label="样本编号" align="center" sortable>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_num }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="point_num" label="调查类型" align="center" sortable>
              <template slot-scope="scope">
                <span
                  style="margin-left: 10px"
                >{{ assess_type_options[scope.row.assess_type].label }}</span>
              </template>
            </el-table-column>
            <el-table-column label="位置" align="center">
              <template slot-scope="scope">
                <el-popover placement="right" width="400" trigger="click" v-if="scope.row.lng">
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
                        animation="AMAP_ANIMATION_DROP"
                        :vid="scope.row.id"
                      ></el-amap-marker>
                    </el-amap>
                  </div>
                  <el-button size="mini" slot="reference">查看</el-button>
                </el-popover>
                <div v-else>
                  <el-tag type="info">暂无位置信息</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="深度" width="120" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_depth || '\\' }}</span>
              </template>
            </el-table-column>

            <el-table-column label="污染物" align="center">
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.point_element[0].ispollution==3">
                <el-tag>今日数据尚未更新</el-tag>
                </template>-->
                <template v-if="handlePollutionList(scope.row.detGround_element).length">
                  <el-tag
                    type="danger"
                    v-for="(item,index) in handlePollutionList(scope.row.detGround_element)"
                    :key="index"
                  >{{element_Map.get(item.element)}}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无污染元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="采样日期" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ handleTime(scope.row.date)}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 5, 8, 10]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="水质信息" name="second">
          <el-table
            v-loading="listLoading2"
            :data="det_water_list"
            border
            stripe
            style="width: 100%"
            @expand-change="expandChange2"
          >
            <el-table-column type="expand">
              <template>
                <div class="drop-container">
                  <div class="table2-container">
                    <el-table
                      :data="det_water_reference"
                      class="drop_table"
                      :row-class-name="tableRowClassName"
                    >
                      <el-table-column label="指标">
                        <template slot-scope="scope">
                          <span>{{ element_Map.get(scope.row.element) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="数值">
                        <template slot-scope="scope">
                          <span>{{ handleElementValue(scope.row.value) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="背景数据参考值">
                        <template slot-scope="scope">
                          <span>{{ handleElementValue(scope.row.lab_reference) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="差值平方">
                        <template slot-scope="scope">
                          <span>{{ scope.row.difference }}</span>
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
                      :data="handleChartData(det_water_reference)"
                      :settings="chartSettings3"
                      width="450px"
                    ></ve-histogram>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="point_num" label="样本编号" align="center" sortable>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_num }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="point_num" label="调查类型" align="center" sortable>
              <template slot-scope="scope">
                <span
                  style="margin-left: 10px"
                >{{ assess_type_options[scope.row.assess_type].label }}</span>
              </template>
            </el-table-column>
            <el-table-column label="位置" align="center">
              <template slot-scope="scope">
                <el-popover placement="right" width="400" trigger="click" v-if="scope.row.lng">
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
                        animation="AMAP_ANIMATION_DROP"
                        :vid="scope.row.id"
                      ></el-amap-marker>
                    </el-amap>
                  </div>
                  <el-button size="mini" slot="reference">查看</el-button>
                </el-popover>
                <div v-else>
                  <el-tag type="info">暂无位置信息</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="深度" width="120" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sample_depth || '\\' }}</span>
              </template>
            </el-table-column>

            <el-table-column label="污染物" align="center">
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.point_element[0].ispollution==3">
                <el-tag>今日数据尚未更新</el-tag>
                </template>-->
                <template v-if="handlePollutionList(scope.row.detWater_element).length">
                  <el-tag
                    type="danger"
                    v-for="(item,index) in handlePollutionList(scope.row.detWater_element)"
                    :key="index"
                  >{{element_Map.get(item.element)}}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无污染元素</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="采样日期" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ handleTime(scope.row.date)}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 5, 8, 10]"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="监测点位分布" name="third">
          <div class="map_container">
            <el-amap
              ref="map"
              vid="amapDemo"
              :center="center"
              :zoom="zoom"
              :plugin="plugin"
              :events="events"
              class="amap-demo"
            >
              <el-amap-marker
                v-for="(marker, index) in markers"
                :position="marker.position"
                :visible="marker.visible"
                animation="AMAP_ANIMATION_DROP"
                :vid="index"
                :key="index"
              ></el-amap-marker>
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
} from '@/api/table/project_info'
import {
  getDetGroundList,
  getLabGroundReference
} from '@/api/table/ground_info'
import { getDetWaterList, getLabWaterReference } from '@/api/table/water_info'
import { formatTime, formatTime2 } from '@/utils/time'
window.onload = function() {
  localStorage.clear()
}
export default {
  data() {
    return {
      activeName: 'first',
      ProjectOptions: [],
      selectedProject: [],
      pointOptions: [],
      selectedPoint: '0',
      selectedAssessType: 0,

      det_ground_list: [],
      det_water_list: [],
      listLoading: false,
      listLoading2: false,

      currentPage: 1,
      page_size: 5,
      total: 20,
      element_Map: '',
      det_ground_reference: [],
      det_water_reference: [],
      chartSettings3: {
        showLine: ['lab_reference'],
        labelMap: {
          element: '元素',
          value: '数值',
          lab_reference: '实验数据参考值'
        }
      },
      markers: [],
      allMarkers: [],
      zoom: 14,
      center: [121.457624, 31.27586],
      events: {},
      plugin: [
        {
          pName: 'MapType',
          defaultType: 1
        } //卫星路况插件
      ]
    }
  },
  methods: {
    /* 点击第三级目录时触发的事件 */
    async projectChange(value) {
      if (value.length == 2) {
        console.log('选项值', value)
        const currentPage = 1 //选择项目体后重置页码为1
        const page_size = this.page_size
        this.selectedPoint = '0'
        this.selectedAssessType = 0
        this.getList(currentPage, page_size)
        let res = await getPointOptions(value[1])
        console.log('PointOptions', res)
        this.pointOptions = res.data.res

        let res2 = await getMarkerList(value[1])
        let res_markers = res2.data.res
        let markers = []
        res_markers.forEach(item => {
          markers.push({
            id: item.id,
            point_num: item.point_num,
            position: [item.point_lng, item.point_lat],
            visible: true
          })
        })
        if (markers.length) {
          this.center = markers[0].position
        }

        this.markers = markers
        this.allMarkers = markers
        console.log('markers', markers)
      }
    },

    pointChange() {
      this.currentPage = 1 //选择类型后重置页码为1
      const page_size = this.page_size
      console.log('selectedPoint', this.selectedPoint)
      if (this.selectedPoint !== '0') {
        this.markers = this.allMarkers.filter(item => {
          return item.point_num == this.selectedPoint
        })
      } else {
        this.markers = this.allMarkers
      }
      this.getList(this.currentPage, page_size)
    },

    assessTypeChange() {
      this.currentPage = 1 //选择类型后重置页码为1
      const page_size = this.page_size
      console.log('selectedAssessType', this.selectedAssessType)
      this.getList(this.currentPage, page_size)
    },

    handleTime(time) {
      return formatTime2(time)
    },

    handleElementValue(value) {
      if (value == 0) {
        return 'ND'
      } else if (value == '-1') {
        return '-/'
      } else {
        return value
      }
    },

    handleSizeChange(page_size) {
      this.currentPage = 1
      this.page_size = page_size
      this.getList(this.currentPage, page_size)
    },
    handleCurrentChange(currentPage) {
      let page_size = this.page_size
      this.currentPage = currentPage
      this.getList(currentPage, page_size)
    },

    switchTab(tabName) {
      this.currentPage = 1
      if (tabName.name !== 'third') {
        console.log('tabName', tabName.name)
        this.getList(this.currentPage, this.page_size)
      }
    },

    async expandChange(row, expandedRows) {
      if (expandedRows.length) {
        console.log('row', row)
        let res = await getLabGroundReference(row.sample_num)
        console.log('det_reference', res)
        this.det_ground_reference = res.data.res
        // console.log('expandedRows', expandedRows)
      }
    },

    async expandChange2(row, expandedRows) {
      if (expandedRows.length) {
        console.log('row', row)
        let res = await getLabWaterReference(row.sample_num)
        console.log('det_reference', res)
        this.det_water_reference = res.data.res
        // console.log('expandedRows', expandedRows)
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.value === '-1') {
        return 'notdetector-row'
      } else if (row.value === '0') {
        return 'notvalue-row'
      } else {
        if (!row.ispollution) {
          return ''
        } else {
          return 'pollution-row'
        }
      }
    },

    /* 根据传递过来的表格参数返回图表的数据格式 */
    handleChartData(params) {
      let params_copy = JSON.parse(JSON.stringify(params))

      let rows_arr = params_copy.map(item => {
        item.element = this.element_Map.get(item.element) //根据element做Map映射获得对应的元素名称
        delete item.ispollution
        return item
      })
      return {
        columns: ['element', 'value', 'lab_reference'],
        rows: rows_arr
      }
    },

    /* 根据传递过来的表格参数返回受污染的元素列表 ，然后v-for遍历数组在table中渲染受污染的元素 */
    handlePollutionList(params) {
      return params.filter(item => {
        return item.ispollution
      })
    },

    /* 判断是否为污染元素，如果是动态改变class标红显示 */
    isPollutionRow({ row, rowIndex }) {
      if (row.ispollution) {
        return 'pollution-row'
      } else {
        return ''
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
      }
      console.log('TableOptions', TableOptions)

      if (this.activeName == 'first') {
        this.listLoading = true
        let res = await getDetGroundList(TableOptions)
        console.log('GroundList', res)
        this.det_ground_list = res.data.res
        this.total = res.data.count
        this.element_Map = new Map(res.data.element_Map)
        this.listLoading = false
      } else {
        this.listLoading2 = true
        let res = await getDetWaterList(TableOptions)
        console.log('WaterList', res)
        this.det_water_list = res.data.res
        this.total = res.data.count
        this.element_Map = new Map(res.data.element_Map)
        this.listLoading2 = false
      }
    },

    // /* 点击跳转到地图页面 */
    // getDetailInfo(index, data) {
    //   this.$router.push({ path: "/echart/index", query: { index, data } });
    // },

    /* 请求二级选择器的树形数据 */
    async getData() {
      let res = await getProjectInfo()
      this.ProjectOptions = res.data.res
      console.log('ProjectOptions', this.ProjectOptions) //树形格式
      this.selectedProject = [
        this.ProjectOptions[0].value,
        this.ProjectOptions[0].children[0].value
      ]
      this.projectChange(this.selectedProject)
    }
  },

  mounted() {
    this.getData()
  },

  computed: {
    assess_type_options() {
      return [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '初步调查'
        },
        {
          value: 2,
          label: '详细调查'
        },
        {
          value: 3,
          label: '修复调查'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.project-info-container2 {

  .project-selector {
    width: 100%;
    height: 50px;
    background: rgb(153, 204, 204);
    margin-bottom: 10px;
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
    height: 480px;  
  }
  
}
</style>
