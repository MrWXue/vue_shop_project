import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
