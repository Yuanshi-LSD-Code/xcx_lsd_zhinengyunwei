import Vue from 'vue'
import App from './App'
import vuePro from './library/vuePro.js'
import vueCmp from './library/vueCmp.js'
import utils from './library/utils/utils.js'
import api from './library/api.js'
import storage from './library/storage.js'
import config from './library/config.js'
import uView from "uview-ui";
import http from './library/http.js'
import pageLoad from './library/pageLoad.js'
import platDiff from './library/core/platDiff.js';
import store from './store/index.js';
Vue.use(uView);


// import top from './cmp/top/top.vue'
// import top from 'components/top/top.vue'
// Vue.component('top',top)

import copyright from 'components/copyright/copyright.vue'
Vue.component('copyright',copyright)

import mainLayout from 'components/base-common/main-layout/main-layout.vue'
Vue.component('main-layout',mainLayout)

import mainTabBar from 'components/base-common/main-tab-bar/main-tab-bar.vue'
Vue.component('main-tab-bar',mainTabBar)

import stage_speed_gauge from "@/components/echarts/gauge/stage_speed_gauge";
import stacked_column_chart from "@/components/echarts/bar/stacked_column_chart";
import stacked_column_chart2 from "@/components/echarts/bar/stacked_column_chart2";
import basic_line_chart from "@/components/echarts/line/basic_line_chart";
import wold_population_chart from "@/components/echarts/bar/wold_population_chart";
import basic_line_config_chart from "@/components/echarts/line/basic_line_config_chart";
import basic_line_config_charts from "@/components/echarts/line/basic_line_config_charts";

import basic_line_config_chart_ts from "@/components/echarts/line/basic_line_config_chart_ts";
import base_bar_chart from "@/components/echarts/bar/base_bar_chart";

Vue.component('echarts-stage-speed-gauge', stage_speed_gauge);
Vue.component('echarts-stacked-column-chart', stacked_column_chart);
Vue.component('echarts-stacked-column-chart2', stacked_column_chart2);
Vue.component('echarts-basic-line-chart', basic_line_chart);
Vue.component('echarts-wold-population-chart', wold_population_chart);
Vue.component('echarts-basic-line-config-chart', basic_line_config_chart);
Vue.component('echarts-basic-line-config-charts', basic_line_config_charts);
Vue.component('echarts-basic-line-config-chart-ts', basic_line_config_chart_ts);
Vue.component('echarts-base-bar-chart', base_bar_chart);
// import fui-footer from 'components/firstui/fui-footer/fui-footer.vue'
// Vue.component('fui-footer',fui-footer)

// import home from 'pages/home/home.vue'
// Vue.component('home',home)

// import insurance from 'pages/insurance/insurance.vue'
// Vue.component('insurance',insurance)

// import repair from 'pages/repair/repair.vue'
// Vue.component('repair',repair)


// import user from 'pages/user/user.vue'
// Vue.component('user',user)



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
Vue.prototype.$platDiff = platDiff;
Vue.prototype.getBeforePageVm = utils.getBeforePageVm;
Vue.prototype.$store = store;// 数据池
const app = new Vue({
    ...App
})
app.$mount()