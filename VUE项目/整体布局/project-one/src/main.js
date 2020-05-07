import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css

import router from './router'
import Vuex from 'vuex'

// 使用vuex时，一般不用事件总线
import Bus from './utils/bus';

// icon 引入自定义的iconfont.js中svg 和 单个svg
import './icons/svg/iconfont'
import './icons'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Bus)

Vue.config.productionTip = false

// 4. 创建和挂载根实例。(序号4承接于route.js)
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
