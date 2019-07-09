// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)

import {getRequest, postRequest, putRequest, deleteRequest} from "./utils/api"

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest

import {setTableH, setContainerH} from "./utils/setHight"

Vue.prototype.setTableH = setTableH
Vue.prototype.setContainerH = setContainerH
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
