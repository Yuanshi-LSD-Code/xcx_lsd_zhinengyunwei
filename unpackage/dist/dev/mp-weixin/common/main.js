(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!***********************************!*\
  !*** C:/own/temp/testuni/main.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 27));
var _vuePro = _interopRequireDefault(__webpack_require__(/*! ./library/vuePro.js */ 48));
var _vueCmp = _interopRequireDefault(__webpack_require__(/*! ./library/vueCmp.js */ 49));
var utils = _interopRequireWildcard(__webpack_require__(/*! ./library/utils/utils.js */ 37));
var _api = _interopRequireDefault(__webpack_require__(/*! ./library/api.js */ 35));
var _storage = _interopRequireDefault(__webpack_require__(/*! ./library/storage.js */ 34));
var _config = _interopRequireDefault(__webpack_require__(/*! ./library/config.js */ 43));
var _uviewUi = _interopRequireDefault(__webpack_require__(/*! uview-ui */ 50));
var _http = _interopRequireDefault(__webpack_require__(/*! ./library/http.js */ 36));
var _pageLoad = _interopRequireDefault(__webpack_require__(/*! ./library/pageLoad.js */ 172));
var _platDiff = _interopRequireDefault(__webpack_require__(/*! ./library/core/platDiff.js */ 173));
var _index = _interopRequireDefault(__webpack_require__(/*! ./store/index.js */ 175));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
_vue.default.use(_uviewUi.default);

// import top from './cmp/top/top.vue'
// import top from 'components/top/top.vue'
// Vue.component('top',top)
var copyright = function copyright() {
  __webpack_require__.e(/*! require.ensure | components/copyright/copyright */ "components/copyright/copyright").then((function () {
    return resolve(__webpack_require__(/*! components/copyright/copyright.vue */ 217));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('copyright', copyright);
var mainLayout = function mainLayout() {
  __webpack_require__.e(/*! require.ensure | components/base-common/main-layout/main-layout */ "components/base-common/main-layout/main-layout").then((function () {
    return resolve(__webpack_require__(/*! components/base-common/main-layout/main-layout.vue */ 224));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('main-layout', mainLayout);
var mainTabBar = function mainTabBar() {
  __webpack_require__.e(/*! require.ensure | components/base-common/main-tab-bar/main-tab-bar */ "components/base-common/main-tab-bar/main-tab-bar").then((function () {
    return resolve(__webpack_require__(/*! components/base-common/main-tab-bar/main-tab-bar.vue */ 231));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('main-tab-bar', mainTabBar);
var stage_speed_gauge = function stage_speed_gauge() {
  Promise.all(/*! require.ensure | components/echarts/gauge/stage_speed_gauge */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/gauge/stage_speed_gauge")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/gauge/stage_speed_gauge */ 238));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var stacked_column_chart = function stacked_column_chart() {
  Promise.all(/*! require.ensure | components/echarts/bar/stacked_column_chart */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/bar/stacked_column_chart")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/bar/stacked_column_chart */ 796));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var basic_line_chart = function basic_line_chart() {
  Promise.all(/*! require.ensure | components/echarts/line/basic_line_chart */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/line/basic_line_chart")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/line/basic_line_chart */ 801));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var wold_population_chart = function wold_population_chart() {
  Promise.all(/*! require.ensure | components/echarts/bar/wold_population_chart */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/bar/wold_population_chart")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/bar/wold_population_chart */ 806));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var basic_line_config_chart = function basic_line_config_chart() {
  Promise.all(/*! require.ensure | components/echarts/line/basic_line_config_chart */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/line/basic_line_config_chart")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/line/basic_line_config_chart */ 811));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var basic_line_config_chart_ts = function basic_line_config_chart_ts() {
  Promise.all(/*! require.ensure | components/echarts/line/basic_line_config_chart_ts */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/line/basic_line_config_chart_ts")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/line/basic_line_config_chart_ts */ 816));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var base_bar_chart = function base_bar_chart() {
  Promise.all(/*! require.ensure | components/echarts/bar/base_bar_chart */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/echarts/bar/base_bar_chart")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/echarts/bar/base_bar_chart */ 821));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('echarts-stage-speed-gauge', stage_speed_gauge);
_vue.default.component('echarts-stacked-column-chart', stacked_column_chart);
_vue.default.component('echarts-basic-line-chart', basic_line_chart);
_vue.default.component('echarts-wold-population-chart', wold_population_chart);
_vue.default.component('echarts-basic-line-config-chart', basic_line_config_chart);
_vue.default.component('echarts-basic-line-config-chart-ts', basic_line_config_chart_ts);
_vue.default.component('echarts-base-bar-chart', base_bar_chart);

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
(0, _vuePro.default)(_vue.default);
//给vue注册全局组件
(0, _vueCmp.default)(_vue.default);
_App.default.mpType = 'app';
_vue.default.config.productionTip = false;
_vue.default.prototype.$utils = utils;
_vue.default.prototype.$api = _api.default;
_vue.default.prototype.$http = _http.default;
_vue.default.prototype.$pageLoad = _pageLoad.default;
_vue.default.prototype.$storage = _storage.default;
_vue.default.prototype.$config = _config.default;
_vue.default.prototype.$platDiff = _platDiff.default;
_vue.default.prototype.getBeforePageVm = utils.getBeforePageVm;
_vue.default.prototype.$store = _index.default; // 数据池
var app = new _vue.default(_objectSpread({}, _App.default));
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"]))

/***/ }),

/***/ 27:
/*!***********************************!*\
  !*** C:/own/temp/testuni/App.vue ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 28);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 45);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 47);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 28:
/*!************************************************************!*\
  !*** C:/own/temp/testuni/App.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 29);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 29:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _appInit = _interopRequireDefault(__webpack_require__(/*! ./library/appInit.js */ 33));
var _storage = _interopRequireDefault(__webpack_require__(/*! library/storage.js */ 34));
var _api = _interopRequireDefault(__webpack_require__(/*! ./library/api.js */ 35));
var _default = {
  globalData: {
    isFirstInApp: uni.getStorageSync("isFirstInApp") === '' ? true : false,
    isLogin: false,
    //是否登陆,全局的登陆状态
    isShowUpdate: false,
    mobileType: '',
    //平台标识
    clientId: '',
    // 推送相关的cid
    uuid: '',
    //设备唯一标识 
    server_tel: '',
    //设备唯一标识 
    copyright: '',
    downTask: function downTask(url) {
      console.log(url);
      return new Promise(function (resolve, reject) {
        // 创建下载任务
        var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
          console.log(d, status);
          if (status == 200) {
            plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function (error) {
              uni.showToast({
                title: '安装失败',
                icon: 'none',
                mask: false,
                duration: 1500
              });
            });
          } else {
            uni.showToast({
              title: '更新失败',
              icon: 'none',
              mask: false,
              duration: 1500
            });
          }
        });
        try {
          // 开始下载
          dtask.start();
          var prg = 0;
          var showLoading = plus.nativeUI.showWaiting("正在下载", {
            back: "none"
          }); //创建一个showWaiting对象 
          dtask.addEventListener('statechanged', function (task, status) {
            // 给下载任务设置一个监听 并根据状态  做操作
            switch (task.state) {
              case 1:
                showLoading.setTitle("正在下载");
                break;
              case 2:
                showLoading.setTitle("已连接到服务器");
                break;
              case 3:
                prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) * 100);
                showLoading.setTitle("  正在下载" + prg + "%  ");
                break;
              case 4:
                plus.nativeUI.closeWaiting();
                //下载完成
                resolve(true);
                break;
            }
          });
        } catch (e) {
          plus.nativeUI.closeWaiting();
          uni.showToast({
            title: '更新失败',
            icon: "none",
            mask: false,
            duration: 1500
          });
          resolve(false);
        }
      });
      console.log('创建下载任务');
    }
  },
  onLaunch: function onLaunch() {
    var _this = this;
    console.log('App Launch');

    // var info = plus.push.getClientInfo();
    // console.log(info);
    // let clientId = info.clientid;
    // console.log(info.clientid);
    // 获取手机屏幕高度
    uni.getSystemInfo({
      success: function success(e) {
        _vue.default.prototype.screenHeight = e.windowHeight;
        _vue.default.prototype.screenWidth = e.windowWidth;
        _vue.default.prototype.header_height = uni.getSystemInfoSync().statusBarHeight * (750 / uni.getSystemInfoSync().windowWidth) + 100 + 'rpx';
        _vue.default.prototype.header_h = uni.getSystemInfoSync().statusBarHeight * (750 / uni.getSystemInfoSync().windowWidth) + 100;
        var model = e.model;
        var modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX", "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro MAX"];
        console.log(444);
        console.log(_vue.default.prototype);
        var flag = false;
        for (var i = 0; i < modelInclude.length; i++) {
          //模糊判断是否是modelInclude 中的机型,因为真机上测试显示的model机型信息比较长无法一一精确匹配
          if (model.indexOf(modelInclude[i]) != -1) {
            flag = true;
          }
        }
        if (flag) {
          _vue.default.prototype.isIphoneX = flag;
        }
      }
    });
    var base = this.base();
    var res = this.login();
    console.log(777777);
    // if (res.code == 200) {
    // 	console.log(77788887);
    // 	this.globalData.token = res.data.token
    // 	this.globalData.platform = res.data.platform
    // 	this.globalData.id = res.data.id
    // 	this.globalData.uid = res.data.uid
    // 	this.globalData.tel = res.data.tel
    // 	this.globalData.nickname = res.data.nickname
    // 	this.globalData.avatar = res.data.avatar

    // 	uni.setStorageSync('token', res.data.token)
    // 	uni.setStorageSync('platform', res.data.platform)
    // 	uni.setStorageSync('id', res.data.id)
    // 	uni.setStorageSync('uid', res.data.uid)
    // 	uni.setStorageSync('tel', res.data.tel)
    // 	uni.setStorageSync('nickname', res.data.nickname)
    // 	uni.setStorageSync('avatar', res.data.avatar)
    // 	uni.setStorageSync('isLogin', true)
    // 	this.globalData.isLogin = true
    // 	console.log(6666666666)
    // 	console.log(this.globalData.isLogin)
    // 	uni.$emit('app', {
    // 		msg: '更新了'
    // 	})
    // } else {
    // 	uni.setStorageSync('isLogin', false)
    // 	this.globalData.isLogin = false
    // }
    console.log(77779999977);
    console.log(this.globalData);
    //app初始化
    (0, _appInit.default)();
    //初始化登陆状态
    this.initIsLogin();
    uni.getSystemInfo({
      success: function success(res) {
        // console.log(res);
        if (res.platform == 'android') {
          // this.checkUpdate('android')
          _this.globalData.mobileType = 'android';
        } else if (res.platform == 'ios') {
          // this.checkUpdate('ios') 
          _this.globalData.mobileType = 'ios';
        }
      }
    });
  },
  onShow: function onShow() {
    // console.log('App Show')
  },
  onHide: function onHide() {
    // console.log('App Hide')
  },
  methods: {
    getDeveiceCode: function getDeveiceCode() {},
    createMsg: function createMsg(msg) {
      // console.log(msg);
      var dataStr = JSON.stringify(msg);
      plus.push.createMessage(msg.content, dataStr);
    },
    handlePush: function handlePush(msg) {
      var _msg$payload$data = msg.payload.data,
        type = _msg$payload$data.type,
        chatroom_id = _msg$payload$data.chatroom_id,
        uid1 = _msg$payload$data.uid1,
        uid2 = _msg$payload$data.uid2;
      uni.navigateTo({
        url: "/pages/chatInfo/chatInfo?type=".concat(type, "&chatroom_id=").concat(chatroom_id, "&uid1=").concat(uid1, "&uid2=").concat(uid2)
      });
    },
    // 判断是否登陆，当有token的时候为登陆状态
    initIsLogin: function initIsLogin() {
      var token = _storage.default.getTokenData();
      var flag = false;
      if (token) {
        flag = true;
      }
      this.set_isLogin(flag);
      this.getDeveiceCode();
    },
    set_isLogin: function set_isLogin() {
      var boll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fasle;
      this.globalData.isLogin = boll;
      if (this.globalData.isLogin == false) {
        uni.removeStorageSync("tokenData");
        uni.removeStorageSync("userInfo");
      }
    },
    get_isLogin: function get_isLogin() {
      return this.globalData.isLogin;
    },
    login: function login() {
      var _this2 = this;
      return new Promise(function (r, j) {
        uni.login({
          success: function () {
            var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(loginInfo) {
              var res;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _this2.$http('loginCode', {
                        code: loginInfo.code
                      });
                    case 2:
                      res = _context.sent;
                      if (res.code == 200) {
                        console.log(88888);
                        _this2.globalData.token = res.data.token;
                        _this2.globalData.platform = res.data.platform;
                        _this2.globalData.id = res.data.id;
                        _this2.globalData.uid = res.data.uid;
                        _this2.globalData.tel = res.data.tel;
                        _this2.globalData.nickname = res.data.nickname;
                        _this2.globalData.avatar = res.data.avatar;
                        _this2.globalData.wx_mini_openid = res.data.wx_mini_openid;
                        uni.setStorageSync('token', res.data.token);
                        uni.setStorageSync('platform', res.data.platform);
                        uni.setStorageSync('id', res.data.id);
                        uni.setStorageSync('uid', res.data.uid);
                        uni.setStorageSync('tel', res.data.tel);
                        uni.setStorageSync('nickname', res.data.nickname);
                        uni.setStorageSync('avatar', res.data.avatar);
                        uni.setStorageSync('wx_mini_openid', res.data.wx_mini_openid);
                        uni.setStorageSync('isLogin', true);
                        _this2.globalData.isLogin = true;
                        _this2.$storage.setTokenData(res.data);
                        uni.$emit('app', {
                          msg: '更新了'
                        });
                        _this2.$store.dispatch('user/info', res.data);
                        // this.$isResolve();
                      } else {
                        uni.setStorageSync('isLogin', false);
                        _this2.globalData.isLogin = false;
                      }
                      r(res);
                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            function success(_x) {
              return _success.apply(this, arguments);
            }
            return success;
          }()
        });
      });
    },
    base: function base() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this3.$http('base', {
                  'type': 'copyright,server_tel'
                });
              case 2:
                res = _context2.sent;
                if (res.code == 200) {
                  _this3.globalData.copyright = res.data.copyright;
                  _this3.globalData.server_tel = res.data.server_tel;
                }
                return _context2.abrupt("return", res);
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 45:
/*!*********************************************************************!*\
  !*** C:/own/temp/testuni/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 46);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 46:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map