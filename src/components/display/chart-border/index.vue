<template>
  <div class="data-box" :class="{ noborder: !boxb }">
    <!--左上边框-->
    <div class="line-box" v-if="boxb">
      <i class="t-l-line"></i>
      <i class="l-t-line"></i>
    </div>
    <!--右上边框-->
    <div class="line-box" v-if="boxb">
      <i class="t-r-line"></i>
      <i class="r-t-line"></i>
    </div>
    <!--左下边框-->
    <div class="line-box" v-if="boxb">
      <i class="l-b-line"></i>
      <i class="b-l-line"></i>
    </div>
    <!--右下边框-->
    <div class="line-box" v-if="boxb">
      <i class="r-b-line"></i>
      <i class="b-r-line"></i>
    </div>
    <!--<div class="main-title" v-if="topt">
           <icon :type="icon"></icon> {{title}}
        </div>-->
    <div class="in-title" v-if="title.length > 0">
      <div class="line-box2" v-if="boxb">
        <i class="t-l-line2"></i>
        <i class="l-t-line2"></i>
      </div>
      <!--右上边框-->
      <div class="line-box2" v-if="boxb">
        <i class="t-r-line2"></i>
        <i class="r-t-line2"></i>
      </div>
      <!--左下边框-->
      <div class="line-box2" v-if="boxb">
        <i class="l-b-line2"></i>
        <i class="b-l-line2"></i>
      </div>
      <!--右下边框-->
      <div class="line-box2" v-if="boxb">
        <i class="r-b-line2"></i>
        <i class="b-r-line2"></i>
      </div>
      <p class="title-content">{{ title }}</p>
    </div>
    <div class="chart">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chartbox",
    props: {
      title: String,
      // dheight: Number,
      icon: String,
      boxb: {
        type: Boolean,
        default: true
      }
    }
  };

</script>

<style lang="scss">
  @import "./index";

</style>
