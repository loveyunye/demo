import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './components/globalRegister.js';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/index.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
