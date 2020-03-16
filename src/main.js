import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import { routes } from './routes.js'

import { store } from './store/store'

Vue.use(VueRouter);
Vue.use(VueCookies);

Vue.filter('formatingCustomDate', function(obj){
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const splited = obj.split('-');
  return splited[2]+' '+months[parseInt(splited[1])]+' '+splited[0]
});

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
