<template>
<div class="dialog">
    <transition name="msgbox-fade">
  <div class="dialog_container" v-if="visible"  @click="closeDialog">
      <div class="dialog_content">
          <div class="dialog_head">
              <p>{{title}}</p>
          </div>
          <div class="dia_body">
              <slot></slot>
          </div>
          <div class="foot">
              <slot name="footer"></slot>
          </div>
      </div>
  </div>
    </transition>
</div>
</template>

<script>
export default {
  name: "Dialog2",
  props: {
      title: String,
      visible:{
        type: Boolean,
        default: false
      }},
  data() {
    return {
    
    };
  },
  methods: {
      close(){
          this.$emit('update:visible',false)
      },

      closeDialog(e){
          if(this.visible){
              console.log('e.target', e.target)
              document.querySelector('.dialog_content').contains(e.target)? '': this.close()
          }
      }
  },
  mounted(){
     
  },

  
}
</script>

<style lang="scss" scoped>
.msgbox-fade-enter-active {
  animation: msgbox-fade-in .3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out .3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
.dialog_container{
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0,0,0,.35);
    height: 100%;
    width: 100%;
    .dialog_content{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 300px;
        width: 500px;
        background: #fff;
        .dialog_head{
         align-self:flex-start;
         margin-top: -100px;
         margin-left: 10px
        }
        
    };
    p{
        font-size: 18px;
    }
}

</style>
