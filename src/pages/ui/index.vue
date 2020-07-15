<template>
  <div class="contain">
    <button @click="showToast1_p">toast1局部调用</button>
    <button @click="showToast1_g">toast1全局调用</button>

    <button @click="showToast2_g">toast2全局调用</button>
    <button @click="showToast2_success">toast2成功</button>

    <button @click="showMessage">message</button>
    <button @click="showMessage2">message2</button>

    <button @click="showDialog">dialog</button>
    <button @click="showDialog2">dialog2</button>
    <!-- <toast v-show="toastShow"></toast> -->

    <dialog1 :dialogShow="dialogShow" @close="closeDialog"></dialog1>
    <dialog2 :visible.sync="visible" :title="title">
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
      <template v-slot:footer>
        <h1>Here might be a page title</h1>
      </template>
    </dialog2>
  </div>
</template>
 
<script>
import toast from "@/components/toast1/index.js";
import toast2 from "@/components/toast2/index.js";
import dialog1 from "@/components/dialog/index.vue";
import dialog2 from "@/components/dialog2/index.vue";

export default {
  data() {
    return {
      toastShow: false,
      dialogShow: false,
      title: "提示",
      visible: false
    };
  },
  components: { toast, dialog1, dialog2 },
  methods: {
    showToast1_p() {
      toast("hhh");
    },
    showToast1_g() {
      this.$toast("操作成功", 3000);
    },

    showMessage() {
      this.$message1({
        content: "你好"
      });
    },

    showMessage2() {
      this.$message2({
        title: "提示",
        content: "确定吗"
      })
        .then(data => {
          console.log("确定");
        })
        .catch(rej => {
          console.log("取消");
        });
    },

    showDialog() {
      this.dialogShow = true;
    },

    closeDialog() {
      this.dialogShow = false;
    },

    showDialog2() {
      this.visible = true;
    },

    showToast2_g() {
      //  this.$toast2({
      //    content: "操作成功",
      //    duration: 2000
      //    })
      this.$toast2("操作成功");
    },
    showToast2_success() {
      this.$toast2.error({
        content: "操作失败",
        duration: 2000
      });
    }
  }
};
</script>
 
<style scoped>
.contain {
  width: 80%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
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
</style>