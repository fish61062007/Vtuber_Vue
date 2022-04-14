import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueSession from "vue-session";
import VueCookies from "vue-cookies";


Vue.use(VueSession);
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
   router,
   vuetify,
   store,
   render: h => h(App)
}).$mount('#app')
