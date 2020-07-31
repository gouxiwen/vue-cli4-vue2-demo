import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";

import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
// locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua', 'no, 'no-nn'
Vue.use(vueEventCalendar, { locale: 'zh', color: 'green' })
// {
//   locale: 'en',
//   color: 'black', //Set main color
//   className: 'Custom className for current clicked date', // (default: 'selected-day')
//   weekStartOn: 'week Start on which day'  // Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)
// }
Vue.config.productionTip = false

Vue.use(Router);
Vue.use(ElementUi);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
