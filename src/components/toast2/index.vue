<template>
  <div class="toast" :class="type? `toast-${type}` : '' ">
      <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast2",
  props: {},
  data() {
    return {
      content: '',
      duration: 2000,
      type:''
    }
  },
  methods: {
    setTimer(){
      setTimeout(() => {
          this.close() // 3000ms之后调用关闭方法
        }, this.duration)
    },

    close() {
        this.visible = false
        console.log('this.$el1', this.$el)
        setTimeout(() => {
          this.$destroy(true)
          console.log('this.$el', this.$el.parentNode)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }, 500)
      }
  },
  mounted(){
      this.setTimer() // 挂载的时候就开始计时
  }

  
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
