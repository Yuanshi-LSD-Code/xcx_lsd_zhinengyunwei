(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/base-common/main-tab-bar/main-tab-bar"],{"29ec":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"main-tab-bar",props:{navList:{type:Array,default:function(){return[]}},pageCount:Number},data:function(){return{isIphoneX:this.isIphoneX,title:"Hello",navIndex:"",shwoType:!0,swiperCurrent:0,token:t.getStorageSync("token")||null,router:""}},created:function(){this.router=this.$platDiff.tabBarUrl(null,this.pageCount),console.log(55566),console.log(this.router)},watch:{},methods:{navClick:function(t,n){console.log(22222),console.log(t.url),this.$_reLaunch(t.url)}}};n.default=e}).call(this,e("543d")["default"])},"64f0":function(t,n,e){"use strict";var a=e("a9bd"),o=e.n(a);o.a},"74b6":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},o=[]},"851b":function(t,n,e){"use strict";e.r(n);var a=e("29ec"),o=e.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=o.a},a9bd:function(t,n,e){},b6a7:function(t,n,e){"use strict";e.r(n);var a=e("74b6"),o=e("851b");for(var r in o)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(r);e("64f0");var u=e("f0c5"),i=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"78ae0502",null,!1,a["a"],void 0);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base-common/main-tab-bar/main-tab-bar-create-component',
    {
        'components/base-common/main-tab-bar/main-tab-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b6a7"))
        })
    },
    [['components/base-common/main-tab-bar/main-tab-bar-create-component']]
]);
