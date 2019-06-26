<template>
  <div class="real-time-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="温度2" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">湿度</div>
            <p class="card-panel-num">{{ humi }}</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="湿度" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">温度</div>
            <p class="card-panel-num">{{ temp }}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <div ref="realtime_data_echart" class="realtime_data_echart"></div>

  </div>
</template>

<script>
  import { formatTime } from '../../utils/time.js'
  import axios from "axios";
  import roslib from "roslib/build/roslib.js";
  import echarts from "echarts";
  require("echarts/theme/macarons"); // echarts theme

  export default {
    data() {
      return {
        ros_messsage: "11",
        humi: "/",
        temp: "/",
        chart: null,
        // messages: {
        //   expectedData: [200, 192, 120, 144, 160, 130, 140],
        //   actualData: [180, 160, 151, 106, 145, 150, 130]
        // },
        now: new Date(),
        date:[],
        ros_humi_arr: [],
        ros_temp_arr: []
      };
    },

    methods: {
      handleSetLineChartData() {
        console.log("hh");
      },

      addData(shift) {
        
        var oneDay = 3 * 1000 //递增的时间
        var now = this.now.getTime() //得到number形式的时间戳
        var now_format = formatTime(this.now) //时间格式化

        this.date.push(now_format)
        this.ros_humi_arr.push(this.humi)
        this.ros_temp_arr.push(this.temp)
        // console.log(this.date)
        if (shift) {
            this.date.shift();
            this.ros_humi_arr.shift();
            this.ros_temp_arr.shift();
        }

        this.now = new Date(now + oneDay);
      },


      setOptions() {
     
        this.chart.setOption({
          xAxis: {
            data: this.date,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ["湿度", "温度"]
          },
          series: [{
              name: "湿度",
              itemStyle: {
                normal: {
                  color: "#3888fa",
                  lineStyle: {
                    color: "#3888fa",
                    width: 2
                  },
                  // areaStyle: {
                  //   color: "#f3f8ff"
                  // }
                }               
              },
              smooth: true,
              type: "line",
              data: this.ros_humi_arr,
              animationDuration: 2800,
              animationEasing: "cubicInOut"
            },
            {
              name: "温度",
              smooth: true,
              type: "line",
              itemStyle: {
                 normal: {
                  color: "#FF005A",
                  lineStyle: {
                    color: "#FF005A",
                    width: 2
                  }
                }
              },
              data: this.ros_temp_arr,
              animationDuration: 2800,
              animationEasing: "cubicInOut"
            }
          ]
        });

        setInterval(()=> {
          this.addData(true);
          this.chart.setOption({
            xAxis: {
              data: this.date
            },
            series: [{
              data: this.ros_humi_arr
            },
            {
              data: this.ros_temp_arr
            }]
          });
        }, 2000);
      },

      initChart() {
        this.chart = echarts.init(this.$refs.realtime_data_echart, "macarons");
        this.setOptions()
        for (var i = 1; i < 10; i++) {
          this.addData()
        }
      }
    },

    async mounted() {
      // let res = await axios.get('http://192.168.199.174:8080/steam?topic=/image_raw')
      // console.log('video', res)
      var ros = new ROSLIB.Ros();
      let that = this;
      ros.on("error", function (error) {
        console.log(error);
      });
      ros.on("connection", function () {
        console.log("Connection made!");
      });
      ros.on("close", function () {
        console.log("Connection closed.");
      });

      // ros.connect("ws://192.168.123.241:9090");
      ros.connect("ws://192.168.199.174:9090");
      var listener1 = new ROSLIB.Topic({
        ros: ros,
        name: "/chatter", //订阅的话题
        messageType: "std_msgs/String" //话题数据类型
      });
      var listener2 = new ROSLIB.Topic({
        ros: ros,
        name: "/chatter1", //订阅的话题
        messageType: "std_msgs/Int16" //话题数据类型
      });
      var listener3 = new ROSLIB.Topic({
        ros: ros,
        name: "/chatter2", //订阅的话题
        messageType: "std_msgs/Int16" //话题数据类型
      });

      // Then we add a callback to be called every time a message is published on this topic.
      //表示订阅消息，ROS向web端传递订阅消息
      listener1.subscribe(function (message) {
        console.log(
          "Received message on " + listener1.name + ": " + message.data
        );
        that.ros_messsage = message.data;
      });

      listener2.subscribe(function (message) {
        console.log(
          "Received message on " + listener2.name + ": " + message.data
        );
        that.humi = message.data;
      });

      listener3.subscribe(function (message) {
        console.log(
          "Received message on " + listener3.name + ": " + message.data
        );
        that.temp = message.data;
      });
      this.initChart();
    },

    watch: {},

    computed: {}
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .real-time-container {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .panel-group {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3;
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .realtime_data_echart {
    height: 400px;
    width: 900px;
  }

</style>
