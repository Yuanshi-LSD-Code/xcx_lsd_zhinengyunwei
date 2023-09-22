import Vue from 'vue'
import App from './App'
import vuePro from './library/vuePro.js'
import vueCmp from './library/vueCmp.js'
import * as utils from './library/utils/utils.js'
import api from './library/api.js'
import storage from './library/storage.js'
import config from './library/config.js'
import uView from "uview-ui";
import http from './library/http.js'
import pageLoad from './library/pageLoad.js'
Vue.use(uView);


// import top from './cmp/top/top.vue'
// import top from 'components/top/top.vue'
// Vue.component('top',top)

import copyright from 'components/copyright/copyright.vue'
Vue.component('copyright',copyright)

// import fui-footer from 'components/firstui/fui-footer/fui-footer.vue'
// Vue.component('fui-footer',fui-footer)



import home from 'pages/home/home.vue'
Vue.component('home',home)

import insurance from 'pages/insurance/insurance.vue'
Vue.component('insurance',insurance)

import repair from 'pages/repair/repair.vue'
Vue.component('repair',repair)


import user from 'pages/user/user.vue'
Vue.component('user',user)



//给vue原型链上注册方法
vuePro(Vue);
//给vue注册全局组件
vueCmp(Vue);
App.mpType = 'app'
Vue.config.productionTip = false
Vue.prototype.$utils= utils;
Vue.prototype.$api = api;
Vue.prototype.$http=http;
Vue.prototype.$pageLoad=pageLoad;
Vue.prototype.$storage = storage;
Vue.prototype.$config = config;
Vue.prototype.getBeforePageVm = utils.getBeforePageVm;
const app = new Vue({
    ...App
})
app.$mount()