import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueNoty from 'vuejs-noty'
import i18n from './i18n'
Vue.use(VueNoty)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
