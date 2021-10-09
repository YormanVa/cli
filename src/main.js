import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


import BootstrapVue from 'bootstrap-vue'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
