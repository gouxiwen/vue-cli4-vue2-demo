import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(ElementUi);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
