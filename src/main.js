import Vue from 'vue'
import App from './App'
import './assets/fonts/iconfont.css'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
