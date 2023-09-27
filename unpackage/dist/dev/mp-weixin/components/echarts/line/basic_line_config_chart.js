(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/echarts/line/basic_line_config_chart"],{

/***/ 813:
/*!*******************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/line/basic_line_config_chart.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic_line_config_chart.vue?vue&type=template&id=19bedf60& */ 814);
/* harmony import */ var _basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic_line_config_chart.vue?vue&type=script&lang=js& */ 816);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 47);

var renderjs




/* normalize component */

var component = Object(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["render"],
  _basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/echarts/line/basic_line_config_chart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 814:
/*!**************************************************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/line/basic_line_config_chart.vue?vue&type=template&id=19bedf60& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./basic_line_config_chart.vue?vue&type=template&id=19bedf60& */ 815);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_template_id_19bedf60___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 815:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/components/echarts/line/basic_line_config_chart.vue?vue&type=template&id=19bedf60& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 816:
/*!********************************************************************************************************!*\
  !*** C:/own/temp/testuni/components/echarts/line/basic_line_config_chart.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../app/HBuilderX.3.8.12.20230817/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./basic_line_config_chart.vue?vue&type=script&lang=js& */ 817);
/* harmony import */ var _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_app_HBuilderX_3_8_12_20230817_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_basic_line_config_chart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 817:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/own/temp/testuni/components/echarts/line/basic_line_config_chart.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
//全部电机状态统计
var _default2 = {
  name: 'basic_line_config_chart',
  props: {
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
    dayMonth: {
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: '5%',
          right: 5,
          // icon: 'rect',//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 8,
          // 设置宽度
          itemHeight: 8 // 设置高度
          // itemGap: 40, // 设置两个legend之间的间距
        },

        grid: {
          top: '10px',
          // 图形距离容器上边界的距离
          bottom: '20px',
          // 图形距离容器下边界的距离
          left: '45px',
          // 图形距离容器左边界的距离
          right: '10px' // 图形距离容器右边界的距离
        },

        xAxis: {
          type: 'category',
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false //y轴线消失
          },

          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgb(210, 219, 238, 0.2)", "rgb(210, 219, 238, 0.2)", "rgb(252, 223, 68, 0.5)", "rgb(253, 127, 128)"]
            }
          },
          min: 0,
          // y轴最小值
          max: 80,
          // y轴最大值
          splitNumber: 4,
          // boundaryGap:[0,1], //boundaryGap是坐标轴两端空白策略，数组内数值代表百分比
          axisTick: {
            show: false
          },
          // 刻度
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#8fBC8F', '##eeeeee', '#FFFF00', '#FD7F80', '#FD7F80'],
              width: 0.5,
              type: [5, 10],
              dashOffset: '5'
            }
          },
          // 分隔线
          // splitLine: { show: false, lineStyle: { color: '#eeeeee' } }, // 分隔线
          axisLabel: {
            fontSize: 10,
            padding: [0, 0, -15, -120],
            formatter: function formatter(value) {
              // console.log(222)
              // console.log(value)
              if (value === 20) {
                var str = '良好';
                return str.split("");
              } else if (value === 40) {
                var str = '正常';
                return str.split("");
              } else if (value === 60) {
                var str = '关注';
                return str.split("");
              } else if (value === 80) {
                var str = '高风险';
                return str.split("");
              }
              return '';
            },
            // y轴1%-100%格式化
            color: '#666666'
          }
        },
        radius: '95%',
        series: this.series

        // series: [
        // 	{
        // 		// name: '高风险',
        // 		data: [30, 20, 23, 21, 20, 20, 20],
        // 		type: 'line'
        // 	},

        // ]
      }
    };
  },
  mounted: function mounted() {
    var _this = this;
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
  methods: {
    initChart: function initChart() {
      this.myChart = echarts.init(this.$el, 'macarons');
      // this.myChart = echarts.init(chartDom);
      this.option && this.myChart.setOption(this.option);
      //用于使chart自适应高度和宽度
      var that = this;
      this.myChart.on('click', function (params) {
        var index = params.dataIndex;
        var time = that.dayMonth[index];
        // console.log(7777)
        // console.log(that.dayMonth)
        // console.log(time)

        that.$emit('djTimeClick', time);
        // this.
      });

      window.addEventListener('resize', function () {
        that.myChart.resize();
      });
    }
  }
};
exports.default = _default2;

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/echarts/line/basic_line_config_chart.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/echarts/line/basic_line_config_chart-create-component',
    {
        'components/echarts/line/basic_line_config_chart-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(813))
        })
    },
    [['components/echarts/line/basic_line_config_chart-create-component']]
]);
