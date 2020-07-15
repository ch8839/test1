<template>
 <div class="message">
    <transition name="msgbox-fade">
  <div class="message_container">
      <div class="message_content">
          <div class="message_head">
              <p>{{content}}</p>
          </div>
         
          <div class="message_foot">
              <button @click="confirm">确定</button>
          </div>
      </div>
  </div>
    </transition>
</div>
</template>

<script>
export default {
  name: "Message1",
  props: {
    
  },
  data() {
    return {
      content: ''
    }
  },

  methods: {


    confirm(e) {
       
          this.$destroy(true)
          console.log('this.$el', this.$el.parentNode)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }
      
  },
  mounted(){
     
  }

  
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
.message_container{
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
    .message_content{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 200px;
        width: 300px;
        background: #fff
        
    };
    p{
        padding: 12px 22px;
        font-size: 18px;
        color: #1ba386
        // border-radius: 4px;
        // background: rgba(17, 17, 17, 0.7);
    };
     button{
    display: inline-block;
    text-align: center;
    padding: 10px 0;
    width: 110px;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    border: none 0;
    /* cursor: pointer; */
    line-height: normal;
    outline: 0;
    white-space: nowrap;
    background: #25bb9b;
    margin: 10px 20px
  }
  button:hover{
    background: #1ba386;
  }
}

</style>
