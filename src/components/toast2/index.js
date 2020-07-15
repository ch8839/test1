import vue from 'vue'
import NoticeCompontent from './index.vue'
import { type } from 'os';
// 返回一个 扩展实例构造器
const NoticeConstructor  = vue.extend(NoticeCompontent)

let nId = 1
// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast2(options) {
  // 实例化一个 toast.vue
  let id = 'notice-' + nId++
  let NoticeInstance
  console.log(typeof(options))
  if(typeof(options)=='object'){
    NoticeInstance = new NoticeConstructor ({
    data:  options
  }) // 实例化一个带有content内容的Notice
  }else{
    NoticeInstance = new NoticeConstructor ({
      data:{
        content:options
      }
    })
  }
  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  NoticeInstance.dom = NoticeInstance.vm.$el //组件实例的dom元素
  document.body.appendChild(NoticeInstance.dom) // 将dom插入body
  NoticeInstance.dom.style.zIndex = nId + 1001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
  console.log('NoticeInstance.vm', NoticeInstance.vm)
  return NoticeInstance.vm

}
['success','error'].forEach(type=>{
  showToast2[type] = function(options){
    options.type = type
    return showToast2(options)
  }
})

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast2
}

export default showToast2