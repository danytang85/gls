(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-person-growthlogs"],{1053:function(t,e,i){"use strict";i.r(e);var a=i("f2fb"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},"19de":function(t,e,i){"use strict";i.r(e);var a=i("7132"),n=i("1053");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("9457");var r=i("2877"),s=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"6c55e322",null);e["default"]=s.exports},"214b":function(t,e,i){"use strict";i.r(e);var a=i("ba1c"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},"285f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("cu-custom",{attrs:{bgColor:"bg-gradual-orange",isBack:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("我的成长值")])],2),i("v-uni-view",{staticClass:"padding bg-white"},[i("v-uni-view",{staticClass:"solid-bottom"},[i("v-uni-view",{staticClass:"flex  p-xs margin-bottom-sm mb-sm "},[i("v-uni-view",{staticClass:"flex-treble   margin-xs radius"},[t._v("订单")]),i("v-uni-view",{staticClass:"flex-sub  margin-xs radius text-center"},[i("v-uni-text",{},[t._v("成长值")])],1)],1)],1),t._l(t.growth,function(e,a){return i("v-uni-view",{key:a,staticClass:"solid-bottom"},[i("v-uni-view",{staticClass:"flex  p-xs margin-bottom-sm mb-sm "},[i("v-uni-view",{staticClass:"flex-treble   margin-xs radius"},[i("v-uni-view",[t._v(t._s(e.create_time))]),i("v-uni-view",[t._v("订单号:"+t._s(e.oid))])],1),i("v-uni-view",{staticClass:"flex-sub  margin-xs radius text-center "},[i("v-uni-text",{},[t._v(t._s(e.growth))])],1)],1)],1)}),i("uni-load-more",{attrs:{status:t.loadingType}})],2)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"467f":function(t,e,i){"use strict";i.r(e);var a=i("285f"),n=i("214b");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);var r=i("2877"),s=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"24740438",null);e["default"]=s.exports},7132:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-load-more"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.status&&t.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"uni-load-more__img"},[i("v-uni-view",{staticClass:"load1"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load2"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load3"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1)],1),i("v-uni-text",{staticClass:"uni-load-more__text",style:{color:t.color}},[t._v(t._s("more"===t.status?t.contentText.contentdown:"loading"===t.status?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},9457:function(t,e,i){"use strict";var a=i("cd47"),n=i.n(a);n.a},ba1c:function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("0e8f")),o=a(i("19de")),r={components:{uniLoadMore:o.default},data:function(){return{page:1,growth:[],loadingType:"more"}},onLoad:function(){this.getgrowth(this.page,this.gid)},onPullDownRefresh:function(){this.getgrowth("refresh")},onReachBottom:function(){this.page=this.page+1,this.getgrowth()},methods:{getgrowth:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add",i=arguments.length>1?arguments[1]:void 0;uni.showLoading({title:"数据加载中"});var a=this,o={url:"/base/getgrowth/",method:"post"},r={page:a.page};n.default.httpTokenRequest(o,r).then(function(n){if(uni.hideLoading(),0==n.data["code"]){var o=n.data["growthlist"];"refresh"===e&&(a.growth=[]),a.growth=a.growth.concat(o),a.loadingType=o.length<20?"nomore":"more","refresh"===e&&(1==i?uni.hideLoading():uni.stopPullDownRefresh())}else t.$api.msg(n.data.msg)},function(t){console.log(t)})}}};e.default=r},cd47:function(t,e,i){var a=i("f6c4");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("38c63b55",a,!0,{sourceMap:!1,shadowMode:!1})},f2fb:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"uni-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=a},f6c4:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-load-more[data-v-6c55e322]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.uni-load-more__text[data-v-6c55e322]{font-size:%?28?%;color:#999}.uni-load-more__img[data-v-6c55e322]{height:24px;width:24px;margin-right:10px}.uni-load-more__img>uni-view[data-v-6c55e322]{position:absolute}.uni-load-more__img>uni-view uni-view[data-v-6c55e322]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-6c55e322 1.56s ease infinite;animation:load-data-v-6c55e322 1.56s ease infinite}.uni-load-more__img>uni-view uni-view[data-v-6c55e322]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-6c55e322]:nth-child(2){-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.uni-load-more__img>uni-view uni-view[data-v-6c55e322]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-6c55e322]:nth-child(4){top:11px;left:0}.load1[data-v-6c55e322],.load2[data-v-6c55e322],.load3[data-v-6c55e322]{height:24px;width:24px}.load2[data-v-6c55e322]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-6c55e322]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.load1 uni-view[data-v-6c55e322]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-6c55e322]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-6c55e322]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-6c55e322]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-6c55e322]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-6c55e322]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-6c55e322]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-6c55e322]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-6c55e322]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-6c55e322]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-6c55e322]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-6c55e322]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-6c55e322{0%{opacity:1}to{opacity:.2}}",""])}}]);