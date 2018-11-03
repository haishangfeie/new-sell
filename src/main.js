import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'common/stylus/index.styl';
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
