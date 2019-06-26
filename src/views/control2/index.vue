<template>
  <div class="control-container">
    <img src="http://192.168.123.200:8080/stream?topic=/vision/usb_image_raw">
    <!-- <img src="http://192.168.199.174:8080/stream?topic=/image_raw"> -->
    <div class="direct-content">
      <div class="card-panel-icon-direction" @click="up">
        <svg-icon icon-class="向上" class-name="card-panel-icon" />
      </div>
      <div class="left-right">
        <div class="card-panel-icon-direction" @click="left">
          <svg-icon icon-class="向左" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-icon-direction" @click="right">
          <svg-icon icon-class="向右" class-name="card-panel-icon" />
        </div>
      </div>
      <div class="card-panel-icon-direction" @click="down">
        <svg-icon icon-class="向下" class-name="card-panel-icon" />
      </div>
    </div>
  </div>
</template>
<script>
  import roslib from "roslib/build/roslib.js";
  export default {
    data() {
      return {};
    },
    methods: {
      up() {
        console.log("前进")
        this.cmdVel.publish(this.twist_up)
      },

      left() {
        console.log("向左")
        this.cmdVel.publish(this.twist_left)
      },

      right() {
        console.log("向右")
        this.cmdVel.publish(this.twist_right)
      },

      down() {
        console.log("向下")
        this.cmdVel.publish(this.twist_down)
      }
    },

    mounted() {
      var ros = new ROSLIB.Ros();
      this.ros = ros
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

      ros.connect("ws://192.168.123.241:9090")
      // ros.connect("ws://192.168.199.174:9090")
    },

    computed: {
      cmdVel() {
        return new ROSLIB.Topic({
          ros: this.ros,
          // name: "/turtle1/cmd_vel",
          name: "/voice/voice_control_topic",
          messageType: "std_msgs/String"
        });
      },

      twist_up() {
        return new ROSLIB.Message('前进');
      },

      twist_down() {
        return new ROSLIB.Message({
          linear: {
            x: -2.0,
            y: 0.0,
            z: 0.0
          },
          angular: {
            x: 0.0,
            y: 0.0,
            z: 0.0
          }
        });
      },

      twist_left() {
        return new ROSLIB.Message({
          linear: {
            x: 0.0,
            y: 0.0,
            z: 0.0
          },
          angular: {
            x: 0.0,
            y: 0.0,
            z: 1.8
          }
        });
      },

      twist_right() {
        return new ROSLIB.Message({
          linear: {
            x: 0.0,
            y: 0.0,
            z: 0.0
          },
          angular: {
            x: 0.0,
            y: 0.0,
            z: -1.8
          }
        });
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  .control-container {
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
   
    .direct-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-panel-icon-direction {
        cursor: pointer;
        font-size: 12px;
        color: #666;
        // background: #fff;
        // box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        // border-color: rgba(0, 0, 0, 0.05);

        &:hover {
          color: #36a3f7;
        }
      }

      .left-right {
        width: 160px;
        display: flex;
        justify-content: space-between;
      }
    }

    .card-panel-icon {
      font-size: 48px;
    }
  }

</style>
