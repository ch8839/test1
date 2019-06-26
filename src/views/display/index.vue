<template>
  <div class="display-container">

    <header class="display-head">
      <p class="display-time">{{time}}</p>
      <p class="display-title">环宇慧物联网公共服务平台大屏展示</p>
      <p class="display-time">{{time}}</p>
    </header>
    <div class="display-content">
      <div class="left">
        <dleft></dleft>
      </div>
      <div class="center">
        <dcenter></dcenter>
      </div>
      <div class="right">
        <dright></dright>
      </div>
    </div>
  </div>
</template>

<script>
import dleft from "./dleft"
import dcenter from "./dcenter"
import dright from "./dright"
import { formatTime3 } from "../../utils/time.js"
export default {
  name: "Display",
  components: {
    dleft,
    dcenter,
    dright
  },
  data: function() {
    return {
      time:''
    };
  },

  methods: {},

  mounted() {
    this.time = setInterval(()=>{
      this.time = formatTime3(new Date())
    }, 1000)
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.display-container {
  background: url('../../assets/display_images/bg-4.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  color: #ffffff;
  .display-head {
    height: 10%;
    display: flex;
    justify-content: center;
    // font-family: 'Microsoft YaHei ';
    .display-time {
      font-size: 15px;
      color: #86c8e3;
      letter-spacing: 1px;
      &:first-child {
        margin-top: 3px;
        margin-right: 8%;     
      }
      &:last-child {
        margin-top: 3px;
        margin-left: 8%;
      }
    }
    .display-title {
      font-size: 22px;
      font-weight: 550;
      margin-top: 15px;
      letter-spacing: 2px;
      background: -webkit-linear-gradient(top, #ffffff,#1987c8, #191d46);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .display-content {
    display: flex;
    height: 90%;
    
    .left {
      flex: 1;
      // border: 1px solid red;
      padding: 10px 1px 10px 15px
    }
    .center {
      flex: 1;
      // border: 1px solid red;
      padding: 0px 10px
    }
    .right {
      flex: 1;
      // border: 1px solid red;
      padding: 10px 15px 10px 1px
    }
  }
}
</style>
