// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()。
//然而在像 CommonJS 这样的模块环境中，应该始终显式地调用 Vue.use()：
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import toast from '@/components/toast1/index.js'
import toast2 from '@/components/toast2/index.js'
import message1 from '@/components/message/index.js'
import message2 from '@/components/message2/index.js'
// import '@/styles/index.scss' // global css

Vue.config.productionTip = false
Vue.prototype.$toast = toast
Vue.prototype.$toast2 = toast2
Vue.prototype.$message1 = message1
Vue.prototype.$message2 = message2
Vue.use(ElementUI)
/* eslint-disable no-new */

//当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。
//你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。
new Vue({
  //Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项
  //或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
  el: '#app', //在实例挂载之后，元素可以用 vm.$el 访问。
  //如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
  router,
  store,
  render: h => h(App)
})
