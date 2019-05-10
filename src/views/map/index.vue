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
        <div class="marker_contain">
          <div class="marker_content" @click="Marker_Click(marker.id,marker.ground_num)"  
          :class="[{ marker_style1: marker.count>=20 },{ marker_style2: marker.count< 19 },{ marker_style3: marker.count==0 },
          { marker_style4: marker.ground_type==1 },{ marker_style5: marker.ground_type==2 },{ marker_style6: marker.ground_type==3 },]">
            <div >{{marker.ground_name}}</div>
            <div >{{marker.count}}</div>
          </div>
          <img
            src="../../../static/img/ground_marker.png"
            class="marker_icon"
            @click="show_point(marker.id,marker.ground_num)" 
          >
        </div>
      </el-amap-marker>

      <el-amap-polygon 
      v-for="item in polygons" :vid="item.id" :key="item.id" 
      :path="item.path"  strokeColor="#FF0000"  strokeWeight=3  
       fillOpacity=0  :zIndex=50 :visible="polygons_window">
      </el-amap-polygon>

      <el-amap-marker
      v-for="item in point_markers" 
      :key="item.id" 
      :position="item.position" 
      :events="item.events" 
      :visible="pointWindow.visible"
      animation="AMAP_ANIMATION_DROP"  
      :vid="item.id"
      >
        <div class="marker_contain" >
          <div class="marker_content" @click="Point_Click((item.id/10)-1,item.point_num)" scope   
          :class="[{ marker_style1: item.count>=20 },{ marker_style2: item.count< 19 },{ marker_style3: item.count==0 },
          { marker_style4: item.ground_type==1 },{ marker_style5: item.ground_type==2 },{ marker_style6: item.ground_type==3 }]">
            <div >{{item.point_name}}</div>
            <div >{{item.count}}</div>
          </div>
          <img
            src="../../../static/img/point_marker.png"
            class="marker_icon"
            @click="Marker_Click(item.ground_id-1,item.ground_number)" scope >
        </div>         
      </el-amap-marker>

      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div>
          <div class="windows_title" align="center" >{{window.ground_name}}</div>             
          <div class="windows_content">
          <el-table 
              :data="groundData"
              height="280"
              size:mimi
              style="width: 100% height: 100%" 
               >
              <el-table-column prop= "point_num" label="点位编号" align="center" width=165px sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 2px">{{ scope.row.point_num }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="introduction" label="点位描述" width=160px align="center">
                <template slot-scope="scope">
                  <span style="margin-left: 1px">{{ scope.row.introduction }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="attention" label="主要污染物" width=95px align="center">
                <template slot-scope="scope">
                  <span style="margin-left: 5px">{{ scope.row.attention }}</span>
                </template>                
              </el-table-column> -->
              <el-table-column prop="attention" label="主要污染物" width=125px align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.attention.length">
                  <el-tag type="danger" v-for="(item,index) in scope.row.attention" :key="index">{{item}}</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success">无污染元素</el-tag>
                </template>
              </template>
            </el-table-column>
            </el-table> 
          </div>
          <el-badge  class="badge_style">
          <el-button size="small" type="info" icon="el-icon-message" round @click="toDetail()">详细信息</el-button>
          </el-badge>
        </div>
      </el-amap-info-window>

      <el-amap-info-window v-if="window1" :position="window1.position" :visible="window1.visible">
        <div>
          <div class="windows_title" align="center" >{{window1.point_name}}</div>             
          <div class="windows_content">
          <el-table 
              :data="pointData"
              height="280"
              size:mimi
              style="width: 60% height: 60%" 
              >
              <el-table-column prop="element" label="超标物" width=100px align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" style="margin-left: 10px">{{ scope.row.element }}</el-tag>
                </template>                
              </el-table-column>
              <el-table-column prop="count" label="超标次数" width=100px align="center" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 5px">{{ scope.row.count}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="max_value" label="超标最高值" width=150px align="center" sortable>
                <template slot-scope="scope">
                  <span style="margin-left: 5px">{{ scope.row.max_value}}</span>
                </template>
              </el-table-column>
            </el-table> 
          </div>
          <!-- <el-badge  class="item">
          <el-button size="small" type="info" icon="el-icon-message" round align="center"><a href="/table/index">详细信息</a></el-button>
          </el-badge> -->
        </div>
      </el-amap-info-window>

    </el-amap>
  </div>
</template>

<script>
    // NPM 方式
//import { AMapManager } from 'vue-amap';
    // CDN 方式
//let amapManager = new VueAMap.AMapManager();
import { getMarkerInfo, getGroundList, getpointMarkerInfo, getMoreDataByPointnum } from "@/api/map/marker_data"
import axios from 'axios'
window.onload = function(){
   localStorage.clear()
 }

export default {
  name: "amap-page",
  // data() {
  data: function() {
    return {
      //AMapManager,
      groundData:[],
      pointData:[],
      isnormal:{marker_style1:true,marker_style2:false,marker_style3:false},
      markers: [],
      ground_markers:[],
      point_markers:[],
      zoom: 12,
      center: [121.457624, 31.27586],
      events: {
        init: o => {
          //console.log(1, o.getCenter()); //获取地图中心
          //console.log(2, this.$refs.map.$$getInstance()); //获取地图实例
          o.getCity(result => {
            console.log(3, result);
          })        
        }, 
        moveend: () => {},
        zoomchange: () => {
          if(this.$refs.map.$$getInstance().getZoom()>15){
            this.projectWindow.visible = false
            this.window.visible=false
            this.pointWindow.visible = true
            this.polygons_window = true
          }else{
            this.pointWindow.visible = false
            this.window1.visible=false
            this.projectWindow.visible = true
            this.polygons_window = false
          }
        },
        click: e => {
          let { lng, lat } = e.lnglat;
          this.lng = lng;
          this.lat = lat;
          this.window.visible=false
          this.window1.visible=false
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
                //console.log(this.address);
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
      polygons: [],
      windows: [],
      point_window:[],
      polygons_window:{
        position:[121.457624, 31.27586],
        content:'',
        event:{},
        visible:true
      },      
      window: {
        position:[121.457624, 31.27586],
        content:'',
        event:{},
        visible:false
      },
      window1: {
        position:[121.457624, 31.27586],
        content:'',
        event:{},
        visible:false
      },  
      projectWindow:{
        position:[121.457624, 31.27586],
        content:'',
        event:{},
        visible:true
      },
      pointWindow:{
        position:[121.457624, 31.27586],
        content:'',
        event:{},
        visible:false
      },  
    };
  },

  methods: {

    toDetail(){
      let transmit_project_num = this.transmit_project_num
      console.log('transmit_project_num', transmit_project_num)
      this.$router.push({path:'/table/detail-table',query: {transmit_project_num}})
    },

    async show_point(index,ground_number){
      this.windows.forEach(item => {
        item.visible = true;
      });
      this.window = this.windows[index]; 
      this.center = this.windows[index].position
      this.zoom=16;
      this.projectWindow.visible = true;
      this.pointWindow.visible=true;
      this.$nextTick(() => {
        this.window.visible = false
        this.projectWindow.visible = false;  
        this.center = this.window.positions;
        console.log("项目体坐标点1",this.center)
        this.zoom=17
      })
      let res5 = await axios.get('https://easy-mock.com/mock/5c8f3becc3ee14532e6031b3/map/polygons');
      console.log("res5",res5)
      let paths = res5.data.data;
      console.log("path",paths)
      let polygons= []
      paths.forEach((item,index) => {
        polygons.push({
          id:(index+3)*123,
          path:item.path,
        });
      });
      this.polygons = polygons;

      // let res5 = await getMarkerList(ground_number)
      // let oneGround_Markers = res5.data.res
      // let arr_temp = []
      // oneGround_Markers.forEach((item,index) => {
      //   let event={}
      //   arr_temp.push({
      //     id: (index+1) * 122,
      //     position: [item.point_lng, item.point_lat],
      //     visible: true,
      //     isGroundMarker:false
      //   });
      // });
      // this.ground_markers = arr_temp
    },

    async Marker_Click(index,ground_number) {
      console.log(`id为${index}`);
      this.transmit_project_num = ground_number
      this.windows.forEach(item => {
        item.visible = false;
      });
      this.projectWindow.visible = true;
      this.pointWindow.visible = true;
      // this.$nextTick(() => {
      //   this.currentWindow1.visible = false;  
      // })
      this.window.visible=false;
      this.window = this.windows[index];
      this.center = this.windows[index].position;
      this.zoom=13;
      this.$nextTick(() => {
        this.window.visible = true;
        this.pointWindow.visible = false;
        this.center = this.window.positions;
        console.log("项目体坐标点",this.center)
        this.zoom=14
        console.log("zoom", this.$refs.map.$$getInstance().getZoom());
      });  
      let res3 = await getGroundList(ground_number);
      console.log(res3)
      let ground_data = res3.data.res;
      let groundData=ground_data.map((item,index) =>{
        item.id=index;
        return item; 
      });
      this.groundData = groundData;
    },
    async Point_Click(index,point_num){
      console.log(`id为${index}`);
      this.point_window.forEach(item => {
        item.visible = false;
      });
      console.log(this.$refs.map.$$getInstance().getZoom());
      this.window1 = this.point_window[index];
      //this.center = this.window1.position;
      //this.zoom=16;
      this.$nextTick(() => {
        this.window1.visible = true;
        //this.center = this.window1.position;
        console.log("监测点坐标点",this.center)
        //this.zoom=17
      });
      //let res4 = await axios.get('https://easy-mock.com/mock/5c8f3becc3ee14532e6031b3/map/tab');
      let res4 = await getMoreDataByPointnum(point_num)
      console.log("监测点res4",res4)
      let point_data = res4.data.res;
      console.log("point_data",point_data)
      let pointData=point_data.map((item,index) =>{
        item.id=index;
        return item; 
      });
      this.pointData = pointData;
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
        position: [item.project_lng, item.project_lat],
        // events:{
        //   click:()=> {
        //     return this.Marker_Click(index,item.project_num);
        //     console.log("project_num",project_num)
        //   }},
        ground_name:item.project_name,
        ground_num:item.project_num,
        count:item.all_count,
        ground_type:item.project_type,
        visible: true,
        isGroundMarker:true
      })

       ground_windows.push({
          visible: false,
          position: [item.project_lng + 0.0010, item.project_lat + 0.0010],
          ground_name:item.project_name, 
          positions:[item.project_lng,item.project_lat]  
      })
    });
    console.log('markers', ground_markers);
    console.log('windows', ground_windows);
    this.markers = ground_markers;
    this.windows = ground_windows;

    //let res2 = await axios.get('https://www.easy-mock.com/mock/5c8f3becc3ee14532e6031b3/map')
    let res2= await getpointMarkerInfo()
    let res2_markers = res2.data.res
    console.log("测试1111",res2_markers)
    let point_markers = []    
    let point_window = []
    res2_markers.forEach((item,index) => {
      let events ={}
      point_markers.push({
        id: (index+1)*10,
        position: [item.point_lng, item.point_lat],
    // events:{
    //   click:()=> {
    //     return this.Point_Click(index);
    //   }},
        point_name:item.point_intro,
        //ground_num:item.ground_num,
        count:item.count,
        ground_type:item.project_type,
        ground_id:item.project_id,
        ground_number:item.project_num,
        point_num:item.point_num,
        visible: true,
        isPointMarker:true
      })
       point_window.push({
          visible: false,
          position: [item.point_lng + 0.00035, item.point_lat + 0.00015],
          point_name:item.point_intro, 
          positions:[item.point_lng,item.point_lat]  
      })
    });
    this.point_markers = point_markers;
    this.point_window = point_window;
 
 },

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

// #mapContainer:after {
//   content: '';
//   display: block;
//   margin-top: 100%; 
// }
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
  background-color: #cccccc;
  padding: 3px 0px;
  width: 100%;
  color: #333333;
  font-size: 15px;
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
