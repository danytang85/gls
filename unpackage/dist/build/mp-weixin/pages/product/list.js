(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/list"],{"35eb":function(t,e,n){"use strict";n.r(e);var o=n("6132"),i=n("3c10");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("70d5");var r=n("2877"),s=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=s.exports},"3c10":function(t,e,n){"use strict";n.r(e);var o=n("82da"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},"3d92":function(t,e,n){"use strict";(function(t){n("8ad5"),n("921b");o(n("66fd"));var e=o(n("35eb"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},6132:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"70d5":function(t,e,n){"use strict";var o=n("cc86"),i=n.n(o);i.a},"82da":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a")),i=a(n("0e8f"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,i,a,r){try{var s=t[a](r),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(o,i)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var a=t.apply(e,n);function s(t){r(a,o,i,s,c,"next",t)}function c(t){r(a,o,i,s,c,"throw",t)}s(void 0)})}}var c=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"19de"))},u={components:{uniLoadMore:c},data:function(){return{server:this.apiServer,cateMaskState:0,headerPosition:"fixed",headerTop:"0px",loadingType:"more",filterIndex:0,cateId:0,priceOrder:0,cateList:[],goodsList:[]}},onLoad:function(t){this.cateId=t.tid,this.loadCateList(t.fid,t.sid),this.loadData()},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData()},methods:{loadCateList:function(){var e=s(o.default.mark(function e(n,a){var r,s,c=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r={url:"/productApi/cateList/",method:"post"},s={},i.default.httpTokenRequest(r,s).then(function(e){if(0==e.data["code"]){var o=e.data["cateList"],i=o.filter(function(t){return t.pid==n});i.forEach(function(t){var e=o.filter(function(e){return e.pid==t.id});t.child=e}),c.cateList=i}else t.showToast({title:e.data["msg"],icon:"none"})},function(t){console.log(t)});case 3:case"end":return e.stop()}},e,this)}));function n(t,n){return e.apply(this,arguments)}return n}(),loadData:function(){var e=s(o.default.mark(function e(){var n,a,r,s,c=this,u=arguments;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=u.length>0&&void 0!==u[0]?u[0]:"add",a=u.length>1?u[1]:void 0,"add"!==n){e.next=8;break}if("nomore"!==this.loadingType){e.next=5;break}return e.abrupt("return");case 5:this.loadingType="loading",e.next=9;break;case 8:this.loadingType="more";case 9:r={url:"/productApi/productlist/",method:"post"},s={cateId:this.cateId},i.default.httpTokenRequest(r,s).then(function(e){if(0==e.data["code"]){var o=e.data["plist"];"refresh"===n&&(c.goodsList=[]),1===c.filterIndex&&o.sort(function(t,e){return e.sales-t.sales}),2===c.filterIndex&&o.sort(function(t,e){return 1==c.priceOrder?t.price-e.price:e.price-t.price}),c.goodsList=c.goodsList.concat(o),c.loadingType=o.length<20?"nomore":"more","refresh"===n&&(1==a?t.hideLoading():t.stopPullDownRefresh())}else t.showToast({title:e.data.msg,icon:"none"})},function(t){console.log(t)});case 12:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),tabClick:function(e){this.filterIndex===e&&2!==e||(this.filterIndex=e,this.priceOrder=2===e?1===this.priceOrder?2:1:0,t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"}))},toggleCateMask:function(t){var e=this,n="show"===t?10:300,o="show"===t?1:0;this.cateMaskState=2,setTimeout(function(){e.cateMaskState=o},n)},changeCate:function(e){this.cateId=e.id,this.toggleCateMask(),t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"})},navToDetailPage:function(e){var n=e.psid;t.navigateTo({url:"/pages/product/product?psid=".concat(n)})},stopPrevent:function(){}}};e.default=u}).call(this,n("543d")["default"])},cc86:function(t,e,n){}},[["3d92","common/runtime","common/vendor"]]]);