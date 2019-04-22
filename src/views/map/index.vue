<template>
  <div class="map_container">
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
        :visible="marker.visible"
        animation="AMAP_ANIMATION_DROP"
        :vid="index"
        :key="index"
      >
        <div class="marker_contain">
          <div class="marker_content" 
          :class="[{ marker_style1: marker.count>20 },{ marker_style2: marker.count< 19 },{ marker_style3: marker.count==0 },
          { marker_style4: marker.ground_type==1 },{ marker_style5: marker.ground_type==2 },{ marker_style6: marker.ground_type==3 },]">
            <div>{{marker.ground_name}}</div>
            <div>{{marker.count}}</div>
          </div>
          <img
            src="../../../static/img/building.png"
            class="marker_icon"
          >

        </div>
      </el-amap-marker>
      <el-amap-marker v-for="item in ground_markers" :key="item.id" :position="item.position" :events="item.events" :visible="item.visible"  :vid="item.id">
        <!-- <div>
          <img
            src="../../../static/img/point_marker.png"
            class="point_marker_icon"
          >
        </div>
         -->
      </el-amap-marker>
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div>
          <div class="windows_title" align="center">{{window.ground_name}}</div>            
          
          <div class="windows_content">
          <el-table 
              :data="tableData"
              height="300"
              border
              size:mimi
              style="width: 60% height: 60%" 
               >
              <el-table-column
                prop= "point_number"
                label="监测点位"
                align="center"
                width=155px>
              </el-table-column>
              <el-table-column
                prop="depth"
                label="深度"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="element"
                label="污染物"
                align="center">
              </el-table-column>
               <el-table-column
                prop="value"
                label="污染值"
                align="center">
              </el-table-column>
            </el-table> 
          </div>
          <el-badge  class="item">
          <el-button size="small" type="info" icon="el-icon-message" round align="center" @click="toTablePage">详细信息</el-button>
          </el-badge>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>
<script>

import { getMarkerInfo, getMapPhByID, getMarkerList } from "@/api/map/marker_data"
import axios from 'axios'
window.onload = function(){
   localStorage.clear()
 }
export default {
  name: "amap-page",
  // data() {
  data: function() {
    return {
      tableData:[],
      isnormal:{marker_style1:true,marker_style2:false,marker_style3:false},
      markers: [],
      ground_markers:[],
      zoom: 12,
      center: [121.457624, 31.27586],
      events: {
        init: o => {
          console.log(1, o.getCenter()); //获取地图中心
          console.log(2, this.$refs.map.$$getInstance()); //获取地图实例
          o.getCity(result => {
            console.log(3, result);
          })
        
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          let { lng, lat } = e.lnglat;
          this.lng = lng;
          this.lat = lat;
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
          showRoad:true,
          events: {
            init(o) {
              console.log(4, o);
            }
          }
        } //卫星路况插件
      ], //引入插件
      windows: [],
      window: "",
      //icons: "../../../static/tinymce4.7.5/skins/lightgray/img/marker3.png"
    };
  },

  methods: {
    async Marker_Click(index,ground_number) {
      console.log(`id为${index}`);
      this.windows.forEach(window => {
        window.visible = false;
      });
      this.zoom=16;
      this.window = this.windows[index];
      this.$nextTick(() => {
        this.window.visible = true;
        this.center = this.window.position
        this.zoom=17
      });  
      
      let res2 = await getMapPhByID(ground_number);
      let table_data = res2.data.res;
      let tableData=table_data.map((item,index) =>{
        item.id=index;
        return item; 
      });
      console.log("地图项目体表格",table_data);
      this.tableData = tableData;

      let res3 = await getMarkerList(ground_number)
      let oneGround_Markers = res3.data.res
      console.log("res3",res3)
      let arr_temp = []
      oneGround_Markers.forEach((item,index) => {
        arr_temp.push({
          id: (index+1) * 122,
          position: [item.point_lng, item.point_lat],
          visible: true,
          isGroundMarker:false
        });
      });
      this.ground_markers = arr_temp
    },

    toTablePage(){
    this.$router.push({ name:'ProjectInfo', params:"hahah" })
    
  }
  },

  

  async mounted() {
  let res1= await getMarkerInfo()
    let res_markers = res1.data.res
    let ground_markers = []
    let ground_windows = []
    console.log('res_markers', res_markers)
    // let arr = JSON.parse(JSON.stringify(res_markers)); //深拷贝取巧方式
    res_markers.forEach((item,index) => {
      let events ={}
      ground_markers.push({
        id: index,
        position: [item.ground_lng, item.ground_lat],
        events:{
          click:()=> {
            console.log('ground_number',item.ground_num);
            console.log('ground_name',item.ground_name);
            return this.Marker_Click(index,item.ground_num);
          }},
        ground_name:item.ground_name,
        count:item.count,
        ground_type:item.ground_type,
        visible: true,
        isGroundMarker:true

      })

       ground_windows.push({
          visible: false,
          position: [item.ground_lng + 0.0005, item.ground_lat + 0.0005],
          ground_name:item.ground_name
      })

    });
    console.log('markers', ground_markers);
    console.log('windows', ground_windows);
    this.markers = ground_markers;
    this.windows = ground_windows;
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.map_container {
  margin: 5px;
}
.amap-demo {
  height: 560px;
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

.marker_style1{
  // div:first-child {
  //   background-color: #ffffff;
  //   color: #F56C6C;
  // }
  div:nth-child(2) {
    background-color: #F56C6C;
    color: #ffffff;
  }
}
.marker_style2{
  // div:first-child {
  //   background-color: #ffffff;
  //   color: #E6A23C;
  // }
  div:nth-child(2) {
    background-color: #E6A23C;
    color: #ffffff;
  }
}
.marker_style3{
  // div:first-child {
  //   background-color: #ffffff;
  //   color:#67C23A;
  // }
  div:nth-child(2) {
    background-color: #67C23A;
    color: #ffffff;
  }
}
.marker_style4{
  div:first-child {
    background-color: #ffffff;
    color: #F56C6C;
  }
  // div:nth-child(2) {
  //   background-color: #F56C6C;
  //   color: #ffffff;
  // }
}
.marker_style5{
  div:first-child {
    background-color: #ffffff;
    color: #E6A23C;
  }
  // div:nth-child(2) {
  //   background-color: #E6A23C;
  //   color: #ffffff;
  // }
}
.marker_style6{
  div:first-child {
    background-color: #ffffff;
    color:#67C23A;
  }
  // div:nth-child(2) {
  //   background-color: #67C23A;
  //   color: #ffffff;
  // }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.marker_icon {
  margin-left: 25px;
}

.point_marker_icon {
  margin-left: 25px;
  height: 16px;
  width: 16px;
}

.windows_title {
  white-space: nowrap;
  background-color: #cccccc;
  padding: 6px 0px;
  width: 100%;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  line-height: 45px;
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
