import vue from 'vue'
import MessageCompontent from './index.vue'
// 返回一个 扩展实例构造器
const MessageConstructor  = vue.extend(MessageCompontent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showMessage(options={content:''}) {

  const MessageInstance = new MessageConstructor ({
    data:  options
  }) // 实例化一个带有content内容的Notice
  
  MessageInstance.vm = MessageInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  document.body.appendChild(MessageInstance.vm.$el) // 将dom插入body
  console.log('MessageInstance.vm', MessageInstance.vm)
  return MessageInstance.vm

}


// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$showMessage = showMessage
}

export default showMessage