(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{1006:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("0e8f"));function s(t){return t&&t.__esModule?t:{default:t}}var d={data:function(){return{source:0,addressList:[]}},onLoad:function(t){this.source=t.source,this.selectaddress()},methods:{selectaddress:function(){var e=this,n={url:"/addressApi/selectaddress/",method:"post"},s={};a.default.httpTokenRequest(n,s).then(function(n){0==n.data["code"]?e.addressList=n.data["list"]:t.showToast({title:n.data.msg,icon:"none"})},function(t){console.log(t)})},checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,t.navigateBack())},addAddress:function(e,n){t.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&data=").concat(JSON.stringify(n))})},refreshList:function(t,e){this.selectaddress(),console.log(t,e)}}};e.default=d}).call(this,n("543d")["default"])},1046:function(t,e,n){"use strict";var a=n("8af4"),s=n.n(a);s.a},"39d7":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s})},"6afd":function(t,e,n){"use strict";n.r(e);var a=n("1006"),s=n.n(a);for(var d in a)"default"!==d&&function(t){n.d(e,t,function(){return a[t]})}(d);e["default"]=s.a},"8af4":function(t,e,n){},"980a":function(t,e,n){"use strict";n.r(e);var a=n("39d7"),s=n("6afd");for(var d in s)"default"!==d&&function(t){n.d(e,t,function(){return s[t]})}(d);n("1046");var o=n("2877"),r=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},d6b6:function(t,e,n){"use strict";(function(t){n("8ad5"),n("921b");a(n("66fd"));var e=a(n("980a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["d6b6","common/runtime","common/vendor"]]]);