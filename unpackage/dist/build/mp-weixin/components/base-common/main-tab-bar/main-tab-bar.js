(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/base-common/main-tab-bar/main-tab-bar"],{"5b4c":function(t,n,e){"use strict";e.r(n);var o=e("9997"),a=e.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=a.a},9380:function(t,n,e){"use strict";e.r(n);var o=e("cd10"),a=e("5b4c");for(var r in a)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("c1c1");var u=e("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"78ae0502",null,!1,o["a"],void 0);n["default"]=c.exports},9997:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"main-tab-bar",props:{navList:{type:Array,default:function(){return[]}},pageCount:Number},data:function(){return{isIphoneX:this.isIphoneX,title:"Hello",navIndex:"",shwoType:!0,swiperCurrent:0,token:t.getStorageSync("token")||null,router:""}},created:function(){this.router=this.$platDiff.tabBarUrl(null,this.pageCount),console.log(55566),console.log(this.router)},watch:{},methods:{navClick:function(t,n){console.log(22222),console.log(t.url),this.$_reLaunch(t.url)}}};n.default=e}).call(this,e("543d")["default"])},c1c1:function(t,n,e){"use strict";var o=e("f39a"),a=e.n(o);a.a},cd10:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var o=function(){var t=this.$createElement;this._self._c},a=[]},f39a:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base-common/main-tab-bar/main-tab-bar-create-component',
    {
        'components/base-common/main-tab-bar/main-tab-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9380"))
        })
    },
    [['components/base-common/main-tab-bar/main-tab-bar-create-component']]
]);
