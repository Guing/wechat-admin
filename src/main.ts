import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element'
import './plugins/v-charts'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
