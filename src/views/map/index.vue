<template>
  <div class="map_container" id="mapContainer">
    <el-amap
      ref="map"
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      :events="events"
      class="amap-demo"
      :plugin="plugin"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker.position"
        :events="marker.events"
        :visible="projectWindow.visible"
        animation="AMAP_ANIMATION_DROP"
        :vid="index"
        :key="index"
      >
        <!--项目体坐标点位显示 -->
        <div class="marker_contain">
          <div
            class="marker_content"
            @click="Marker_Click(marker.id,marker.ground_num)"
            scope
            :class="[{ marker_style1: marker.count>=20 },{ marker_style2: marker.count< 19 },{ marker_style3: marker.count==0 },
          { marker_style4: marker.ground_type==1 },{ marker_style5: marker.ground_type==2 },{ marker_style6: marker.ground_type==3 },]"
          >
            <div>{{marker.ground_name}}</div>
            <div>{{marker.count}}</div>
          </div>
          <img
            src="../../../static/img/ground_marker.png"
            class="marker_icon"
            @click="show_point(marker.id,marker.ground_num)"
          >
        </div>
      </el-amap-marker>

      <el-amap-polygon
        v-for="item in polygons"
        :vid="item.id"
        :key="item.id"
        :path="item.path"
        strokeColor="#FF0000"
        strokeWeight="3"
        fillOpacity="0"
        :zIndex="50"
        :visible="polygons_window"
      ></el-amap-polygon>
      <!--项目体检测轮廓 -->

      <el-amap-marker
        v-for="item in point_markers"
        :key="item.id"
        :position="item.position"
        :events="item.events"
        :visible="pointWindow.visible"
        animation="AMAP_ANIMATION_DROP"
        :vid="item.id"
      >
        <!--监测点坐标点位显示 -->
        <div class="marker_contain">
          <div
            class="marker_content"
            @click="Point_Click((item.id/10)-1,item.point_num)"
            scope
            :class="[{ marker_style1: item.count>=20 },{ marker_style2: item.count< 19 },{ marker_style3: item.count==0 },
          { marker_style4: item.ground_type==1 },{ marker_style5: item.ground_type==2 },{ marker_style6: item.ground_type==3 }]"
          >
            <div>{{item.point_name}}</div>
            <div>{{item.count}}</div>
          </div>
          <img src="../../../static/img/point_marker.png" class="marker_icon">
        </div>
      </el-amap-marker>

      <el-amap-info-window
        v-if="window"
        :position="window.position"
        :visible="window.visible"
        autoMove="true"
        scope
      >
        <!--项目体点击表格显示 -->
        <div>
          <div class="windows_title" align="center">
            <span style="margin-left: 1px;">{{window.ground_name + "项目体"}}</span>
            <el-button size="small" type="info" icon="el-icon-message" round style="margin-left: 30px;" @click="transfer_table(window.project_num)">
            详细信息
            </el-button>
            </div>
          <!-- <el-button @click="resetGroundFilter">清除地块过滤器</el-button> -->
          <div class="windows_content">

            <!-- <el-button @click="clearFilter">清除所有过滤器</el-button> -->
            <el-table
              :data="groundData"
              height="300"
              size:mimi
              style="width: 100% height: 100%"
              rules="none"
            >
              <el-table-column prop="point_num" label="点位编号" align="center" width="160px" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 1px">{{ scope.row.point_num }}</span>
                  <!-- <i class="el-icon-view el-icon--right" @click="transfer_table(window.project_num,scope.row.point_num)"></i> -->
                </template>
              </el-table-column>
              <el-table-column prop="introduction" label="点位描述" width="95px" align="center">
                <template slot-scope="scope">
                  <span style="margin-left: 1px;">{{ scope.row.introduction }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="assess_type" label="调查类型" width="95px" align="center" 
                :filters="[{text: '初步调查', value: '初步调查'}, {text: '详细调查', value: '详细调查'}, {text: '修复调查', value: '修复调查'}]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.assess_type == '0' ? 'primary' :(scope.row.assess_type == '1'?'danger':'success')" 
                  disable-transitions>{{assess_type_options[scope.row.assess_type].label }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="attention" label="主要污染物" width="135px" align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.attention.length">
                    <el-tag
                      type="danger"
                      v-for="(item,index) in scope.row.attention"
                      :key="index"
                    >{{item}}</el-tag>
                  </template>
                  <template v-else>
                    <el-tag type="success">无污染元素</el-tag>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <el-badge class="badge_style">
            <el-button size="small" type="info" icon="el-icon-message" round>
              <a @click="transfer_table(window.project_num)">详细信息</a>
            </el-button>
          </el-badge> -->
        </div>
      </el-amap-info-window>

      <el-amap-info-window v-if="window1" :position="window1.position" :visible="window1.visible">
        <!--监测位点击表格显示 -->
        <div>
          <div>
            <el-table :data="pointData" height="260px" size:mimi style="width: 100% height: 100%">
              <el-table-column prop="element" label="超标物" width="100px" align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" style="margin-left: 10px">{{ scope.row.element }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="超标次数" width="100px" align="center" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 5px">{{ scope.row.count}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="max_value" label="超标最高值" width="150px" align="center" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 5px">{{ scope.row.max_value}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>

import {
  getMarkerInfo,
  getGroundList,
  getpointMarkerInfo,
  getMoreDataByPointnum,
  getCircleByProjectnum
} from "@/api/map/marker_data";
import axios from "axios";
window.onload = function() {
  localStorage.clear();
};

export default {
  name: "amap-page",

  data: function() {
    return {
      groundData: [],
      pointData: [],
      isnormal: {
        marker_style1: true,
        marker_style2: false,
        marker_style3: false
      },
      markers: [],
      ground_markers: [],
      point_markers: [],
      zoom: 12,
      center: [121.457624, 31.27586],
     selectedAssessType : 0,
      events: {
        init: o => {
          this.$refs.map.$$getInstance().setFitView();
          //console.log(1, o.getCenter()); //获取地图中心
          //console.log(2, this.$refs.map.$$getInstance()); //获取地图实例
          o.getCity(result => {
            // console.log(3, result);
          });
        },
        moveend: () => {},
        zoomstart:() => {
          this.window.visible = false            
          this.window1.visible = false},
        zoomchange: () => {
          
          if (this.$refs.map.$$getInstance().getZoom() > 15) {
            //监控比例尺变化，实现地图缩放
            this.projectWindow.visible = false;
            this.window.visible = false;
            this.pointWindow.visible = true;
            this.polygons_window = true;
          } else {
            this.pointWindow.visible = false;
            this.window1.visible = false;
            this.projectWindow.visible = true;
            this.polygons_window = false;
          }

        },
        click: e => {
          //this.$refs.map.$$getInstance().setFitView()
          let { lng, lat } = e.lnglat;
          this.lng = lng;
          this.lat = lat;
          this.window.visible = false;
          this.window1.visible = false;
          console.log("点击坐标点：" + [lng, lat]);
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], (status, result) => {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                this.address = result.regeocode.formattedAddress;
                console.log(this.address);
                this.$nextTick();
              }
            }
          });
        }
      },
      plugin: [
        //"ToolBar", //手动调焦插件
        {
          pName: "MapType",
          defaultType: 0,
          //showRoad:true,
          events: {
            init(o) {
              //console.log(4, o);
            }
          }
        } //卫星路况插件
      ], //引入插件

      polygons: [], //项目体轮廓
      windows: [],
      point_window: [],
      polygons_window: {
        position: [121.457624, 31.27586],
        content: "",
        event: {},
        visible: true
      },
      window: {
        position: [121.457624, 31.27586],
        content: "",
        event: {},
        visible: false
        //autoMove:true,   //项目体
      },
      window1: {
        position: [121.457624, 31.27586],
        content: "",
        event: {},
        visible: false
        //autoMove:true,   //监测点
      },
      projectWindow: {
        position: [121.457624, 31.27586],
        content: "",
        event: {},
        visible: true //项目体窗体
      },
      pointWindow: {
        position: [121.457624, 31.27586],
        content: "",
        event: {},
        visible: false //监测点窗体
      }
    };
  },

  methods: {
    resetGroundFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
    //表格过滤器
    filterTag(value, row) {
        return this.assess_type_options[row.assess_type].label === value;
      },

    // 转移到陈刚表格详细信息
    transfer_table(project_num){
      console.log("转移测试",project_num)
    },
    async show_point(index, project_number) {
      //显示监测点一级信息
      this.windows.forEach(item => {
        item.visible = true;
      });
      this.window = this.windows[index];
      this.center = this.windows[index].position;
      this.zoom = 15;
      this.projectWindow.visible = true;
      this.pointWindow.visible = true;
      this.$nextTick(() => {
        this.window1.visible = false;
        this.projectWindow.visible = false;
        this.center = this.window.position2;
        this.zoom = 17;
      });

      let res5 = await getCircleByProjectnum(project_number);
      let paths = res5.data.res;
      console.log("path", paths);
      let polygons = [];
      paths.forEach((item, index) => {
        polygons.push({
          id: (index + 3) * 123,
          path: item.path
        });
      });

      this.polygons = polygons;
    },

    async Marker_Click(index, project_number) {
      //点击项目体图标，显示该项目体下信息
      console.log(`id为${index}`);
      this.transmit_project_num = project_number;
      this.windows.forEach(item => {
        item.visible = false;
      });
      this.projectWindow.visible = true;
      this.pointWindow.visible = true;
      // this.$nextTick(() => {
      //   this.currentWindow1.visible = false;
      // })
      this.window.visible = false;
      this.window = this.windows[index];
      this.center = this.windows[index].position;
      this.zoom = 11;
      this.$nextTick(() => {
        this.window.visible = true;
        this.pointWindow.visible = false;
        this.center = this.window.positions;
        console.log("项目体坐标点", this.center);
        this.zoom = 13;
        console.log("zoom", this.$refs.map.$$getInstance().getZoom());
        //console.log("center", this.$refs.map.$$getInstance().target.getPosition());
      });
      let res3 = await getGroundList(project_number);
      console.log("getGroundList",res3);
      let ground_data = res3.data.res;
      let groundData = [];
      ground_data.forEach((item, index) => {
        groundData.push({
          id: index,
          point_num: item.point_num,
          introduction: item.introduction.substring(4),
          attention: item.attention,
          assess_type :item.assess_type-1
        });
      });
      this.groundData = groundData;
      this.window.content = groundData.join("");
    },

    async Point_Click(index, point_num) {
      //点击监测点图标，显示监测点一级信息
      console.log(`id为${index}`);
      this.point_window.forEach(item => {
        item.visible = false;
      });
      console.log(this.$refs.map.$$getInstance().getZoom());
      this.window1 = this.point_window[index];
      this.center = this.window1.position;
      this.zoom=15;
      this.$nextTick(() => {
        this.window1.visible = true;
        this.center = this.window1.position;
        console.log("监测点坐标点", this.center);
        this.zoom=17
      });

      let res4 = await getMoreDataByPointnum(point_num);
      console.log("监测点res4", res4);
      let point_data = res4.data.res;
      console.log("point_data", point_data);
      let pointData = point_data.map((item, index) => {
        item.id = index;
        return item;
      });
      this.pointData = pointData;
    }
  },

  async mounted() {
    let res1 = await getMarkerInfo();
    let res_markers = res1.data.res;
    let ground_markers = [];
    let ground_windows = [];
    console.log("res_markers", res_markers);
    // let arr = JSON.parse(JSON.stringify(res_markers)); //深拷贝取巧方式
    res_markers.forEach((item, index) => {
      let events = {};
      ground_markers.push({
        id: index,
        position: [item.project_lng, item.project_lat],
        ground_name: item.project_name,
        ground_num: item.project_num,
        count: item.all_count,
        ground_type: item.project_type,
        visible: true,
        isGroundMarker: true
      });

      ground_windows.push({
        visible: false,
        position: [item.project_lng + 0.003, item.project_lat + 0.003],
        ground_name: item.project_name,
        project_num: item.project_num,
        positions: [item.project_lng, item.project_lat + 0.015],
        position2: [item.project_lng, item.project_lat]   //地块轮廓中心
      });
    });
    console.log("markers", ground_markers);
    console.log("windows", ground_windows);
    this.markers = ground_markers;
    this.windows = ground_windows;

    let res2 = await getpointMarkerInfo();
    let res2_markers = res2.data.res;
    console.log("测试1111", res2_markers);
    let point_markers = [];
    let point_window = [];
    res2_markers.forEach((item, index) => {
      let events = {};
      point_markers.push({
        id: (index + 1) * 10,
        position: [item.point_lng, item.point_lat],
        // events:{
        //   click:()=> {
        //     return this.Point_Click(index);
        //   }},
        point_name: item.point_intro,
        //ground_num:item.ground_num,
        count: item.count,
        ground_type: item.project_type,
        ground_id: item.project_id,
        project_number: item.project_num,
        point_num: item.point_num,
        visible: true,
        isPointMarker: true
      });
      point_window.push({
        visible: false,
        position: [item.point_lng + 0.00035, item.point_lat + 0.00015],
        point_name: item.point_intro,
        positions: [item.point_lng, item.point_lat]
      });
    });
    this.point_markers = point_markers;
    this.point_window = point_window;
  },
  computed: {
    assess_type_options() {
      return [
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
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.map_container {
  margin: 5px;
}
// .amap-demo {
//   height: 560px;
//   width: 100%;
// }
#mapContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  position: absolute;
}

.prompt {
  border: 1px solid #eee;
  border-radius: 10%;
  background: rgb(149, 143, 238);
  color: #ffffff;
  font-weight: 200;
  padding: 10px;
}

.marker_content {
  display: flex;
  flex-direction: row;
  align-items: center;
  div:first-child {
    white-space: nowrap;
    //background-color: #ffffff;
    //color: #49b9eb;
    font-weight: 800;
    padding: 8px;
    border-radius: 10px 0px 0px 10px;
    font-size: 11px;
  }
  div:nth-child(2) {
    //background-color: #49b9eb;
    //color: #ffffff;
    border: 0px solid #fff;
    font-weight: 800;
    border: 1px solid #49b9eb;
    border-radius: 0px 10px 10px 0px;
    padding: 8px;
    font-size: 11px;
  }
}
.table_style {
  font-size: 11px;
  line-height: 6px;
}
.marker_style1 {
  // div:first-child {
  //   background-color: #ffffff;
  //   color: #F56C6C;
  // }
  div:nth-child(2) {
    background-color: #f56c6c;
    color: #ffffff;
  }
}
.marker_style2 {
  // div:first-child {
  //   background-color: #ffffff;
  //   color: #E6A23C;
  // }
  div:nth-child(2) {
    background-color: #e6a23c;
    color: #ffffff;
  }
}
.marker_style3 {
  // div:first-child {
  //   background-color: #ffffff;
  //   color:#67C23A;
  // }
  div:nth-child(2) {
    background-color: #67c23a;
    color: #ffffff;
  }
}
.marker_style4 {
  div:first-child {
    background-color: #ffffff;
    color: #f56c6c;
  }
  // div:nth-child(2) {
  //   background-color: #F56C6C;
  //   color: #ffffff;
  // }
}
.marker_style5 {
  div:first-child {
    background-color: #ffffff;
    color: #e6a23c;
  }
  // div:nth-child(2) {
  //   background-color: #E6A23C;
  //   color: #ffffff;
  // }
}
.marker_style6 {
  div:first-child {
    background-color: #ffffff;
    color: #67c23a;
  }
  // div:nth-child(2) {
  //   background-color: #67C23A;
  //   color: #ffffff;
  // }
}
.badge_style {
  margin-top: 10px;
  margin-right: 40px;
}
.marker_icon {
  margin-left: 25px;
  height: 32px;
  width: 32px;
}

.point_marker_icon {
  margin-left: 25px;
  height: 32px;
  width: 32px;
}

.windows_title {
  white-space: nowrap;
  background-color:#409EFF;
  padding: 3px 0px;
  width: 100%;
  color: #f8f5f5;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 35px;
}
.windows_content {
  display: flex;
  padding: 1px 0px;
  font-size: 15px;
  p {
    margin: 5px 0;
  }
  p:first-child {
    flex: 1;
  }
}
</style>
