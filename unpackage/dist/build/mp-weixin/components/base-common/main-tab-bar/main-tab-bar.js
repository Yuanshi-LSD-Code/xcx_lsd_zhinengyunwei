(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/base-common/main-tab-bar/main-tab-bar"],{"0030":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},r=[]},2711:function(t,n,e){"use strict";var a=e("e05a"),r=e.n(a);r.a},"5b4c":function(t,n,e){"use strict";e.r(n);var a=e("9997"),r=e.n(a);for(var u in a)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},9380:function(t,n,e){"use strict";e.r(n);var a=e("0030"),r=e("5b4c");for(var u in r)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("2711");var o=e("f0c5"),i=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"6c9e2398",null,!1,a["a"],void 0);n["default"]=i.exports},9997:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"main-tab-bar",props:{navList:{type:Array,default:function(){return[]}},pageCount:Number,navIndex:""},data:function(){return{isIphoneX:this.isIphoneX,title:"Hello",shwoType:!0,swiperCurrent:0,token:t.getStorageSync("token")||null,router:""}},created:function(){this.router=this.$platDiff.tabBarUrl(null,this.pageCount)},watch:{},methods:{navClick:function(t,n){console.log(22222),console.log(t.url),this.$_reLaunch(t.url)}}};n.default=e}).call(this,e("543d")["default"])},e05a:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base-common/main-tab-bar/main-tab-bar-create-component',
    {
        'components/base-common/main-tab-bar/main-tab-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9380"))
        })
    },
    [['components/base-common/main-tab-bar/main-tab-bar-create-component']]
]);
