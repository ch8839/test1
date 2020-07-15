<template>
  <div class="toast" :class="type ? `toast-${type}` : '' " v-show="show">
      <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {},
  data() {
    return {
      text:'',
      show: false,
      type:''
    };
  },
  methods: {
 
  },
  // mounted(){
  //     setTimeout(()=>{
  //         this.show = false
  //     },3000)
  // }

  
}
</script>

<style lang="scss" scoped>
.toast{
    display: inline-block;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    z-index: 9999;
    background: transparent;
    >p{
        padding: 12px 22px;
        font-size: 18px;
        border-radius: 4px;
        background: rgba(17, 17, 17, 0.7);
    };
    &-error >p{
       background: rgba(255, 0, 0, 0.5); 
    };
    &-success >p{
       background:  rgba(0, 255, 0, 0.5); 
    }
}
</style>
