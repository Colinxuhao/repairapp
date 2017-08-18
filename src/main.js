// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 

import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

import header from "./components/common/header/header";
Vue.component('header-top', header);

import rentFooter from "@/components/common/rentfooter/rentfooter";
Vue.component('rent-footer', rentFooter);

Vue.config.productionTip = false;
import "./common/flexible.js";
import * as mUtils from "./common/mUtils.js";					//导入公共函数
Vue.prototype.mUtils = mUtils;

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  template: '<App/>',
  components: { App }
})
