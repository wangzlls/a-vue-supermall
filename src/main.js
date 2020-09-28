import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

//因为是直接export default导出的，所以这个能够取别名
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()

//安装自己封装的toast插件
Vue.use(toast)

//解决移动端300毫秒延时问题,可以百度（移动端300毫秒延时问题）
FastClick.attach(document.body)

//使用vue的懒加载
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
