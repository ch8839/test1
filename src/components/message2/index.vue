<template>
  <transition name="msgbox-fade">
    <div
      class="message"
      v-show="isShowMessageBox"
    >
      <div class="message_container">
        <div class="message_content">
          <div class="message_head">
            <p>{{title}}</p>
          </div>
          <div class="message_body">
            <p>{{content}}</p>
          </div>
          <div class="message_foot">
            <button @click="cancel">{{cancelButtonText}}</button>
            <button @click="confirm">{{confirmButtonText}}</button>
          </div>

        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "Message1",
  props: {},
  data() {
    return {
      isShowMessageBox: false,
      title: "",
      content: "",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      resolve: "",
      reject: "",
      promise: "" // 保存promise对象
    };
  },

  methods: {
    // 确定,将promise断定为resolve状态
    confirm: function() {
      this.isShowMessageBox = false;
      if (this.isShowInput) {
        this.resolve(this.inputValue);
      } else {
        this.resolve("confirm");
      }
      this.remove();
    },

    cancel() {
      this.isShowMessageBox = false;
      this.reject("cancel");
      this.remove();
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox() {
      this.isShowMessageBox = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      // 返回promise对象
      return this.promise;
    },

    remove() {
      setTimeout(() => {
        this.destroy();
      }, 300);
    },

    destroy() {
      this.$destroy();
      document.body.removeChild(this.$el);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}

@keyframes msgbox-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.message_container {
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
  background: rgba(0, 0, 0, 0.35);
  height: 100%;
  width: 100%;
  .message_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 300px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    .message_head {
      align-self: flex-start;
    }
    .message_foot {
      display: flex;
      justify-content: center;
      align-self: flex-end;
    }
  }

  p {
    padding: 12px 22px;
    font-size: 18px;
    color: #1ba386;
    // border-radius: 4px;
    // background: rgba(17, 17, 17, 0.7);
  }
  button {
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
    margin: 10px 20px;
  }
  button:hover {
    background: #1ba386;
  }
}
</style>
