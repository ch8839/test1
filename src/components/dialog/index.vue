<template>
  <div class="message" v-if="dialogShow2"  @click="cancel()">
      <div class="container" @click.stop="clickContain">
      <p>确定删除</p>
      <p @click="cancel()">取消</p>
      <p>确定</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
      dialogShow:{
        type: Boolean,
        default: false
      }},
  data() {
    return {
      dialogShow2: this.dialogShow
    }
  },
  methods: {
      cancel(){
          this.dialogShow2 = false
          this.$emit('close')
      },
    //阻止单击事件继续传播
      clickContain(e){
          // console.log(1,e)
      }
  },
  mounted(){
     
  },
  watch:{
      dialogShow(val){
          this.dialogShow2 = val
      }
  }

  
}
</script>

<style lang="scss" scoped>
.message{
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
    background: rgba(0,0,0,.35);
    height: 100%;
    width: 100%;
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 500px;
        width: 300px;
        background: #fff
        
    };
    p{
        padding: 12px 22px;
        font-size: 18px;
        border-radius: 4px;
        background: rgba(17, 17, 17, 0.7);
    }
}
</style>
