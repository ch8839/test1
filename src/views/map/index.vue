<template>
  <div class="map_container">
    <el-amap
      ref="map"
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      :events="events"
      class="amap-demo"
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
          <div class="marker_content">
            <div>{{marker.content}}</div>
            <div>{{marker.count}}</div>
          </div>
          <img
            src="../../../static/img/building.png"
            class="marker_icon"
          >
        </div>
      </el-amap-marker>
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div class="windows_contain">
          <div class="windows_title">{{window.content}}</div>
          <h1>设备分布：</h1>
          <div class="windows_content" v-for="(item,index) in markerInfo_list" :key="index">
            <p>{{item.info}}</p>
            <p>{{item.value}}</p>
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>
<script>
import { getMarkerInfo } from "@/api/marker_data";
export default {
  name: "amap-page",
  data() {
    return {
      markerInfo_list: [
        {
          info: "G表",
          value: 22
        },
        {
          info: "P表",
          value: 6
        },
        {
          info: "LoRa表",
          value: 18
        },
        {
          info: "Z表",
          value: 3
        }
      ],
      markers: [],
      zoom: 11,
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
        // "ToolBar", //手动调焦插件
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(4, o);
            }
          }
        } //卫星路况插件
      ], //引入插件
      windows: [],
      window: "",
      icons: "../../../static/tinymce4.7.5/skins/lightgray/img/marker3.png"
    };
  },
  methods: {
    Marker_Click(index) {
      console.log(`id为${index}`);
      this.windows.forEach(window => {
        window.visible = false;
      });
      this.window = this.windows[index];
      this.$nextTick(() => {
        this.window.visible = true;
      });
    }
  },
  async mounted() {
    // let res2 = await axios.get('https://www.easy-mock.com/mock/5c8f3becc3ee14532e6031b3/map')
    // let res_markers = res2.data.data
    let res = await getMarkerInfo()
    console.log("mapres", res);
    let res_markers = res.data.res;

    // let res_markers=[
    //   {
    //      position: [121.9973285, 31.30515044],
    //      content:'我是位置1'
    //   },
    //   {
    //      position: [121.5673285, 31.63515044],
    //      content:'我是位置2'
    //   },
    //   {
    //      position: [121.2173285, 31.57515044],
    //      content:'我是位置3'
    //   },
    //   {
    //      position: [121.4173285, 31.18515044],
    //      content:'我是位置4'
    //   }
    // ]
    let arr = JSON.parse(JSON.stringify(res_markers)); //深拷贝取巧方式

    let markers = res_markers.map((item, index) => {
      item.id = index;
      item.position = [item.lng, item.lat];
      item.events = {};
      //  item.events.click=function(){
      //    console.log(`id为${index}`)
      //  } //这样写最然可行，但逻辑复杂时代码会显得繁杂
      // item.events.click=this.Marker_Click(index) //这种方式传递了index,然后直接执行了

      item.events.click = () => {
        return this.Marker_Click(index);
      };
      item.visible = true;
      delete item.lng;
      delete item.lat;
      return item;
      // item.icons="../../../static/tinymce4.7.5/skins/lightgray/img/marker3.png"
    });

    let windows = arr.map((item, index) => {
      item.visible = false;
      item.position = [item.lng + 0.0005, item.lat + 0.0005];
      return item;
    });
    console.log('markers', markers);
    console.log('windows', windows);
    this.markers = markers;
    this.windows = windows;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.map_container {
  margin: 5px;
}
.amap-demo {
  height: 690px;
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
    background-color: #ffffff;
    color: #49b9eb;
    font-weight: 800;
    padding: 8px;
    border-radius: 10px 0px 0px 10px;
    font-size: 11px;
  }
  div:nth-child(2) {
    background-color: #49b9eb;
    color: #ffffff;
    border: 0px solid #fff;
    font-weight: 800;
    border: 1px solid #49b9eb;
    border-radius: 0px 10px 10px 0px;
    padding: 8px;
    font-size: 11px;
  }
}

.marker_icon {
  margin-left: 25px;
}

.windows_contain {
  // p:first-child{
  //   font-size: 18px;
  //   font-weight: bold;
  //   color: #000;
  // }
}

.windows_title {
  white-space: nowrap;
  background-color: #f9f9f9;
  padding: 8px 0px;
  width: 260px;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  line-height: 45px;
}
.windows_content {
  display: flex;
  padding: 10px 0px;
  font-size: 15px;
  p {
    margin: 5px 0;
  }
  p:first-child {
    flex: 1;
  }
}
</style>
