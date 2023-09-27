(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/echarts/bar/stacked_column_chart"],{

/***/ 798:
/*!***************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/bar/stacked_column_chart.vue ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stacked_column_chart.vue?vue&type=template&id=e8b05c0e& */ 799);
/* harmony import */ var _stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stacked_column_chart.vue?vue&type=script&lang=js& */ 801);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 47);

var renderjs




/* normalize component */

var component = Object(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/echarts/bar/stacked_column_chart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 799:
/*!**********************************************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/bar/stacked_column_chart.vue?vue&type=template&id=e8b05c0e& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./stacked_column_chart.vue?vue&type=template&id=e8b05c0e& */ 800);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_template_id_e8b05c0e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 800:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/components/echarts/bar/stacked_column_chart.vue?vue&type=template&id=e8b05c0e& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 801:
/*!****************************************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/bar/stacked_column_chart.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./stacked_column_chart.vue?vue&type=script&lang=js& */ 802);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_stacked_column_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 802:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/components/echarts/bar/stacked_column_chart.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var echarts = _interopRequireWildcard(__webpack_require__(/*! echarts */ 245));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//
//
//
//
//维修状态
var _default2 = {
  name: 'stacked_column_chart',
  props: {
    refresh: {
      type: Number,
      default: null
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    marginTop: {
      type: String,
      default: '10px'
    },
    //标点数据
    legendData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    //横轴坐标
    xAxisData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    //纵轴坐标值
    series: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    color: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
    //   chartData: {
    //     type: Object,
    //     required: true
    //   }
  },
  data: function data() {
    return {
      myChart: null,
      option: {
        color: this.color,
        fontStyle: "italic",
        //italic斜体  oblique倾斜
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: '5%',
          // right: 'center',
          // icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 8,
          // 设置宽度
          itemHeight: 8,
          // 设置高度
          // itemGap: 40, // 设置两个legend之间的间距
          data: this.legendData
          // data: [
          // 	{
          // 		name: '高风险',  // 这个name需要和 series 里面的 name 对应起来
          // 		// textStyle: {
          // 		// 	color: '#2DC3FB' // 单独设置某一个图列的颜色
          // 		// }
          // 	},
          // 	{
          // 		name: '关注',  // 这个name需要和 series 里面的 name 对应起来
          // 		// textStyle: {
          // 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
          // 		// }
          // 	},
          // 	{
          // 		name: '正常',  // 这个name需要和 series 里面的 name 对应起来
          // 		// textStyle: {
          // 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
          // 		// }
          // 	},
          // 	{
          // 		name: '良好',  // 这个name需要和 series 里面的 name 对应起来
          // 		// textStyle: {
          // 		// 	color: '#FDD43C' // 单独设置某一个图列的颜色
          // 		// }
          // 	}
          // ]
        },

        radius: '90%',
        grid: {
          top: '15px',
          // 图形距离容器上边界的距离

          // right: '4%',
          bottom: '25%',
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            padding: [20, 20, 5, 5]
          }
        }],
        xAxis: [{
          type: 'category',
          fontSize: 10,
          data: ['定子', '转子', '轴承', '松动', '负载', '不平衡不对中'],
          axisLabel: {
            rotate: -45,
            // 设置标签倾斜角度，单位为度
            padding: [20, 20, 5, 5]
          }
        }],
        series: this.series
        // series: [
        // 	{
        // 		name: '高风险',
        // 		type: 'bar',
        // 		stack: 'Ad',
        // 		barWidth: 25,
        // 		emphasis: {
        // 			focus: 'series'
        // 		},
        // 		data: [2, 2, 2, 2, 1]
        // 	},
        // 	{
        // 		name: '关注',
        // 		type: 'bar',
        // 		stack: 'Ad',
        // 		barWidth: 25,
        // 		emphasis: {
        // 			focus: 'series'
        // 		},
        // 		data: [1, 2, 2, 2, 2]
        // 	},
        // 	{
        // 		name: '正常',
        // 		type: 'bar',
        // 		stack: 'Ad',
        // 		barWidth: 25,
        // 		emphasis: {
        // 			focus: 'series'
        // 		},
        // 		data: [2, 1, 2, 2, 2]
        // 	},
        // 	{
        // 		name: '良好',
        // 		type: 'bar',
        // 		stack: 'Ad',
        // 		barWidth: 25,
        // 		emphasis: {
        // 			focus: 'series'
        // 		},
        // 		data: [2, 1, 2, 2, 2]
        // 	},
        // ]
      }
    };
  },
  mounted: function mounted() {
    var _this = this;
    // console.log(this.legendData);
    // console.log(this.series);
    console.log(33344);
    this.$nextTick(function () {
      _this.initChart();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    // series: {
    // 	handler(newValue, oldValue) {
    // 		console.log(444);
    // 		console.log(newValue);

    // 		this.goChart()

    // 	},

    // 	immediate: true,
    // 	deep: true,
    // },
  },
  methods: {
    initChart: function initChart() {
      if (this.myChart == null) {
        this.myChart = echarts.init(this.$el, 'macarons');
      }

      // this.myChart = echarts.init(chartDom);
      if (this.option.color && this.option.color.length <= 0) {
        delete this.option['color'];
      }
      this.goChart();
    },
    goChart: function goChart() {
      console.log(this.myChart);
      if (this.myChart) {
        this.option && this.myChart.setOption(this.option);
        //用于使chart自适应高度和宽度
        var that = this;
        this.myChart.on('click', function (params) {
          var index = params.dataIndex;
          that.$emit('djBarClick', index);
        });
        window.addEventListener('resize', function () {
          that.myChart.resize();
        });
      }
    }
  }
};
exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/echarts/bar/stacked_column_chart.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/echarts/bar/stacked_column_chart-create-component',
    {
        'components/echarts/bar/stacked_column_chart-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(798))
        })
    },
    [['components/echarts/bar/stacked_column_chart-create-component']]
]);
