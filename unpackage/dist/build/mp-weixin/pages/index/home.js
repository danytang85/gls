(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/home"],{"297d":function(t,e,n){"use strict";n.r(e);var o=n("c69b"),a=n("be6d");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("44c6");var i=n("2877"),u=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=u.exports},"44c6":function(t,e,n){"use strict";var o=n("99b1"),a=n.n(o);a.a},"6eeb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("a34a")),a=r(n("0e8f"));n("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,o,a,r,i){try{var u=t[r](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,a)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(o,a){var r=t.apply(e,n);function u(t){i(r,o,a,u,c,"next",t)}function c(t){i(r,o,a,u,c,"throw",t)}u(void 0)})}}var c={data:function(){return{serverapi:this.apiServer,titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:[],goodsList:[],goodsList2:[]}},onLoad:function(){this.loadData()},methods:{navTo:function(e){t.navigateTo({url:e})},loadData:function(){var t=u(o.default.mark(function t(){return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.getbanner(),this.getproductlist();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getproductlist:function(){var e=this,n={url:"/productApi/getgradeproduct/",method:"post"},o={};a.default.httpTokenRequest(n,o).then(function(n){if(0==n.data["code"]){var o=n.data["goodsList1"],a=n.data["goodsList2"];e.goodsList=o||[],e.goodsList2=a||[]}else t.showToast({title:n.data.msg,icon:"none"})},function(t){console.log(t)})},getbanner:function(){var e=this,n={url:"/base/getbannerlist/",method:"post"},o={};a.default.httpTokenRequest(n,o).then(function(n){if(0==n.data["code"]){var o=n.data["bannerlist"];e.titleNViewBackground=o[0].background,e.swiperLength=o.length,e.carouselList=o}else t.showToast({title:n.data.msg,icon:"none"})},function(t){console.log(t)})},swiperChange:function(t){var e=t.detail.current;this.swiperCurrent=e,this.titleNViewBackground=this.carouselList[e].background},navToDetailPage:function(e){var n=e.psid;t.navigateTo({url:"/pages/product/product?psid=".concat(n)})}}};e.default=c}).call(this,n("543d")["default"])},"76bc":function(t,e,n){"use strict";(function(t){n("8ad5"),n("921b");o(n("66fd"));var e=o(n("297d"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"99b1":function(t,e,n){},be6d:function(t,e,n){"use strict";n.r(e);var o=n("6eeb"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=a.a},c69b:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})}},[["76bc","common/runtime","common/vendor"]]]);