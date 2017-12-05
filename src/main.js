import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import 'common/stylus/index.styl';
import store from './store';

Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.use(VueLazyLoad, {
  loading: import('base/loading/loading.gif')
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
