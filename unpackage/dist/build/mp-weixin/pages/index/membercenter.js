(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/membercenter"],{"09d2":function(n,t,e){"use strict";var a=e("8c72"),u=e.n(a);u.a},"09dc":function(n,t,e){"use strict";var a=e("41fd"),u=e.n(a);u.a},3669:function(n,t,e){"use strict";e.r(t);var a=e("75aa"),u=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);t["default"]=u.a},"41fd":function(n,t,e){},"5f1d":function(n,t,e){"use strict";(function(n){e("8ad5"),e("921b");a(e("66fd"));var t=a(e("69a6"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"69a6":function(n,t,e){"use strict";e.r(t);var a=e("fa58"),u=e("3669");for(var i in u)"default"!==i&&function(n){e.d(t,n,function(){return u[n]})}(i);e("09d2"),e("09dc");var o=e("2877"),c=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,"60180fa9",null);t["default"]=c.exports},"75aa":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=u(e("0e8f"));function u(n){return n&&n.__esModule?n:{default:n}}var i={data:function(){return{title:"Hello",bigIdx:2,vips:[],tasks:[],welfare:[{icon:"icon-fenxiang1",name:"分享邀请"},{icon:"icon-zhekou1",name:"享受折扣"},{icon:"icon-cu",name:"促销活动"},{icon:"icon-shi",name:"0元试用"}]}},onLoad:function(){var n=this,t={url:"/base/getusertypelist/",method:"post"},e={};a.default.httpTokenRequest(t,e).then(function(t){0==t.data["code"]&&(n.bigIdx=t.data["bigIdx"]-1,n.vips=t.data["vips"])},function(n){console.log(n)})},methods:{swiperChange:function(n){this.bigIdx=n.detail.current},navTo:function(t){n.navigateTo({url:t})}}};t.default=i}).call(this,e("543d")["default"])},"8c72":function(n,t,e){},fa58:function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return u})}},[["5f1d","common/runtime","common/vendor"]]]);