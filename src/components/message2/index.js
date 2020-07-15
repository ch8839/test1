import vue from 'vue'
import MessageCompontent2 from './index.vue'

// 返回一个 扩展实例构造器
const MessageConstructor2 = vue.extend(MessageCompontent2)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showMessage2(options) {
  let MessageInstance2


      if (!MessageInstance2) {
        MessageInstance2 = new MessageConstructor2({
          data: options
        }) // 实例化一个带有content内容的Notice
        MessageInstance2.vm = MessageInstance2.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
        document.body.appendChild(MessageInstance2.vm.$el) // 将dom插入body
        console.log('MessageInstance2.vm', MessageInstance2.vm)
      }
      return MessageInstance2.showMsgBox().then(data => {
        MessageInstance2 = null;
        return Promise.resolve(data);
      }).catch(reject => {
        MessageInstance2 = null
        return Promise.reject(reject)
      })
    

}


// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$showMessage = showMessage2
}

export default showMessage2