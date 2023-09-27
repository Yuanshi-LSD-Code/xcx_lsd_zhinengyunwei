(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/base-common/main-tab-bar/main-tab-bar"],{"19cf":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},r=[]},"29ec":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"main-tab-bar",props:{navList:{type:Array,default:function(){return[]}},pageCount:Number,navIndex:""},data:function(){return{isIphoneX:this.isIphoneX,title:"Hello",shwoType:!0,swiperCurrent:0,token:t.getStorageSync("token")||null,router:""}},created:function(){this.router=this.$platDiff.tabBarUrl(null,this.pageCount)},watch:{},methods:{navClick:function(t,n){console.log(22222),console.log(t.url),this.$_reLaunch(t.url)}}};n.default=e}).call(this,e("543d")["default"])},"359b9":function(t,n,e){"use strict";var a=e("8d26"),r=e.n(a);r.a},"851b":function(t,n,e){"use strict";e.r(n);var a=e("29ec"),r=e.n(a);for(var u in a)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},"8d26":function(t,n,e){},b6a7:function(t,n,e){"use strict";e.r(n);var a=e("19cf"),r=e("851b");for(var u in r)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("359b9");var o=e("f0c5"),i=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"2d689852",null,!1,a["a"],void 0);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base-common/main-tab-bar/main-tab-bar-create-component',
    {
        'components/base-common/main-tab-bar/main-tab-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b6a7"))
        })
    },
    [['components/base-common/main-tab-bar/main-tab-bar-create-component']]
]);
