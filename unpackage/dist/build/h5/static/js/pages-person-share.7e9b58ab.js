(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-person-share"],{"70f8":function(n,e,t){"use strict";t.r(e);var r=t("adf1"),u=t.n(r);for(var o in r)"default"!==o&&function(n){t.d(e,n,function(){return r[n]})}(o);e["default"]=u.a},adf1:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={components:{},data:function(){return{}},onLoad:function(e){var t=e.vcode,r=decodeURIComponent(e.backurl);"undefined"!=t&&uni.setStorage({key:"vcode",data:t}),n.islogon()?"undefined"!=r?uni.redirectTo({url:r}):uni.redirectTo({url:"../index/home"}):uni.redirectTo({url:"../person/reg?backurl="+encodeURIComponent(r)})},methods:{}};e.default=t}).call(this,t("c8ba"))},f468:function(n,e,t){"use strict";var r=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-uni-view",{staticClass:"content"})},u=[];t.d(e,"a",function(){return r}),t.d(e,"b",function(){return u})},f6d7:function(n,e,t){"use strict";t.r(e);var r=t("f468"),u=t("70f8");for(var o in u)"default"!==o&&function(n){t.d(e,n,function(){return u[n]})}(o);var a=t("2877"),i=Object(a["a"])(u["default"],r["a"],r["b"],!1,null,"da6e43a6",null);e["default"]=i.exports}}]);