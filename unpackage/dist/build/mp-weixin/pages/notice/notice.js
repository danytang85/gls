(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notice/notice"],{"354e":function(t,n,e){"use strict";e.r(n);var o=e("425b"),u=e("997d");for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);e("8b6f");var a=e("2877"),c=Object(a["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},"425b":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},"8b6f":function(t,n,e){"use strict";var o=e("f094"),u=e.n(o);u.a},"8d19":function(t,n,e){"use strict";(function(t){e("8ad5"),e("921b");o(e("66fd"));var n=o(e("354e"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"997d":function(t,n,e){"use strict";e.r(n);var o=e("b2fe"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=u.a},b2fe:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=u(e("0e8f"));function u(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{nlist:[],serverapi:this.apiServer}},onLoad:function(){this.getnoticelist()},methods:{navTo:function(n){t.navigateTo({url:"./noticeshow?id="+n})},getnoticelist:function(){var n=this,e={url:"/Noticeapi/getlist/",method:"post"},u={};o.default.httpTokenRequest(e,u).then(function(e){0==e.data["code"]?n.nlist=e.data["list"]:t.showToast({title:e.data.msg,icon:"none"})},function(t){console.log(t)})}}};n.default=i}).call(this,e("543d")["default"])},f094:function(t,n,e){}},[["8d19","common/runtime","common/vendor"]]]);