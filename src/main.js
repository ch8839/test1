import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import VeGauge from 'v-charts/lib/gauge.common'
import 'v-charts/lib/style.css'

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

import VueAMap from 'vue-amap'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '41566098d1f6cc04ff44f5c827379950',
  plugin: ['AMap.MapType','AMap.Geocoder'],
  v: '1.4.9'
})

Vue.use(ElementUI, { locale })
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)
Vue.component(VeGauge.name, VeGauge)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) //const h = this.$createElement(App)
})
