import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChalkboard, faShoppingCart, faBoxOpen, faUser, faChartPie} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000' 

library.add(faChalkboard,faShoppingCart,faBoxOpen, faUser, faChartPie)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VueElementLoading', VueElementLoading)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BootstrapVue)




new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
//faWindowFrameOpen, faShoppingCart, 