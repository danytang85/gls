(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-person-upload"],{"19a3":function(t,e,n){var o=n("90cd");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("763086b4",o,!0,{sourceMap:!1,shadowMode:!1})},"2f43":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"cropper-wrapper",staticStyle:{height:"617px"}},[n("v-uni-canvas",{staticClass:"cropper",style:{width:t.cropperOpt.width,height:t.cropperOpt.height},attrs:{"disable-scroll":"true","canvas-id":"cropper"},on:{touchstart:function(e){e=t.$handleEvent(e),t.touchStart(e)},touchmove:function(e){e=t.$handleEvent(e),t.touchMove(e)},touchend:function(e){e=t.$handleEvent(e),t.touchEnd(e)}}})],1),n("v-uni-view",{staticClass:"cu-bar btn-group foot"},[n("v-uni-button",{staticClass:"cu-btn bg-green shadow-blur ",on:{click:function(e){e=t.$handleEvent(e),t.uploadTap(e)}}},[t._v("重新选择")]),n("v-uni-button",{staticClass:"cu-btn bg-orange shadow ",on:{click:function(e){e=t.$handleEvent(e),t.getCropperImage(e)}}},[t._v("确定")])],1)],1)},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"4cc6":function(t,e,n){"use strict";var o=n("19a3"),i=n.n(o);i.a},"6c7b":function(t,e,n){var o=n("5ca1");o(o.P,"Array",{fill:n("36bd")}),n("9c6c")("fill")},"90cd":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".content[data-v-7e343392]{background:#fff}.head-list[data-v-7e343392]{height:43px;width:100%;background:#fff;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid #f4f4f4}.head-info[data-v-7e343392]{text-align:center;font-size:18px;color:#000;font-weight:700}.save-box[data-v-7e343392]{position:absolute;right:0;width:50px;height:43px;line-height:43px}.save[data-v-7e343392]{color:#626ffc;font-size:16px;font-weight:400}.icon-back[data-v-7e343392]{margin-top:11px;width:10px;height:18px;color:#000;margin-left:6px}.icon-back-box[data-v-7e343392]{display:block;position:absolute;left:6px;height:43px;width:30px;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.cropper[data-v-7e343392]{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-buttons[data-v-7e343392]{background-color:rgba(0,0,0,.95);color:#04b00f}.cropper-wrapper[data-v-7e343392]{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;background-color:#f0f0f0}.cropper-buttons[data-v-7e343392]{width:100vw;height:50px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:fixed;bottom:0;left:0;line-height:50px}.cropper-buttons .getCropperImage[data-v-7e343392],.cropper-buttons .upload[data-v-7e343392]{width:50%;text-align:center}",""])},bd58:function(t,e,n){"use strict";var o=n("288e"),i=o(n("5176")),a=o(n("a4bb"));n("ac6a"),n("6c7b");var c=o(n("f499")),r=o(n("c8bb")),u=o(n("a745")),l=o(n("5d73")),s=o(n("85f2")),d=o(n("5d58")),f=o(n("67bb")),h=o(n("d847"));(function(e,n){t.exports=n()})(0,function(){var t=void 0,e=["touchstarted","touchmoved","touchended"];function n(t){return t.charAt(0).toUpperCase()+t.slice(1)}function o(t){for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];e.forEach(function(e,n){void 0!==o[n]&&(t[e]=o[n])})}function p(t,e){(0,h.default)(t,e)}function g(){return t||(t=wx.getSystemInfoSync()),t}"function"===typeof f.default&&d.default;var v=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},b=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,s.default)(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),x=function(){function t(t,e){var n=[],o=!0,i=!1,a=void 0;try{for(var c,r=(0,l.default)(t);!(o=(c=r.next()).done);o=!0)if(n.push(c.value),e&&n.length===e)break}catch(u){i=!0,a=u}finally{try{!o&&r["return"]&&r["return"]()}finally{if(i)throw a}}return n}return function(e,n){if((0,u.default)(e))return e;if((0,r.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w={},y={id:{default:"cropper",get:function(){return w.id},set:function(t){w.id=t}},width:{default:750,get:function(){return w.width},set:function(t){w.width=t}},height:{default:750,get:function(){return w.height},set:function(t){w.height=t}},scale:{default:2.5,get:function(){return w.scale},set:function(t){w.scale=t}},zoom:{default:5,get:function(){return w.zoom},set:function(t){w.zoom=t}},src:{default:"cropper",get:function(){return w.src},set:function(t){w.src=t}},cut:{default:{},get:function(){return w.cut},set:function(t){w.cut=t}},onReady:{default:null,get:function(){return w.ready},set:function(t){w.ready=t}},onBeforeImageLoad:{default:null,get:function(){return w.beforeImageLoad},set:function(t){w.beforeImageLoad=t}},onImageLoad:{default:null,get:function(){return w.imageLoad},set:function(t){w.imageLoad=t}},onBeforeDraw:{default:null,get:function(){return w.beforeDraw},set:function(t){w.beforeDraw=t}}};function m(){var t=this,e=g(),n=e.windowWidth;t.attachPage=function(){var e=getCurrentPages(),n=e[e.length-1];n.wecropper=t},t.createCtx=function(){var e=t.id;e&&(t.ctx=wx.createCanvasContext(e))},t.deviceRadio=n/750,t.deviceRadio=t.deviceRadio.toFixed(2)}function k(){var t=this,e=["ready","beforeImageLoad","beforeDraw","imageLoad"];t.on=function(o,i){return e.indexOf(o)>-1&&"function"===typeof i&&("ready"===o?i(t):t["on"+n(o)]=i),t}}function T(){var t=this,e=t.deviceRadio;console.log((0,c.default)(t));var n=t.width,o=t.height,i=t.cut,a=i.x,r=void 0===a?0:a,u=i.y,l=void 0===u?0:u,s=i.width,d=void 0===s?n:s,f=i.height,h=void 0===f?o:f;t.updateCanvas=function(){return t.croperTarget&&t.ctx.drawImage(t.croperTarget,t.imgLeft,t.imgTop,t.scaleWidth,t.scaleHeight),"function"===typeof t.onBeforeDraw&&t.onBeforeDraw(t.ctx,t),t.setBoundStyle(),t.ctx.draw(),t},t.pushOrign=function(e){return t.src=e,"function"===typeof t.onBeforeImageLoad&&t.onBeforeImageLoad(t.ctx,t),uni.getImageInfo({src:e,success:function(n){var o=n.width/n.height;t.croperTarget=n.path||e,o<d/h?(t.rectX=r,t.baseWidth=d,t.baseHeight=d/o,t.rectY=l-Math.abs((h-t.baseHeight)/2)):(t.rectY=l,t.baseWidth=h*o,t.baseHeight=h,t.rectX=r-Math.abs((d-t.baseWidth)/2)),t.imgLeft=t.rectX,t.imgTop=t.rectY,t.scaleWidth=t.baseWidth,t.scaleHeight=t.baseHeight,t.updateCanvas(),"function"===typeof t.onImageLoad&&t.onImageLoad(t.ctx,t)}}),t.update(),t},t.getCropperImage=function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];var a=t.id,c=toString.call(o[0]);switch(c){case"[object Object]":var u=o[0].quality,s=void 0===u?10:u;console.log("quality--"+s),uni.canvasToTempFilePath({canvasId:a,x:r,y:l,width:d,height:h,destWidth:d*s/(10*e),destHeight:h*s/(10*e),success:function(t){"function"===typeof o[o.length-1]&&o[o.length-1](t.tempFilePath)}});break;case"[object Function]":uni.canvasToTempFilePath({canvasId:a,x:r,y:l,fileType:"jpg",width:d,height:h,destWidth:d,destHeight:h,success:function(t){"function"===typeof o[o.length-1]&&o[o.length-1](t.tempFilePath)}});break}return t}}function S(){var t=this;t.src&&(t.__oneTouchStart=function(e){t.touchX0=e.x,t.touchY0=e.y},t.__oneTouchMove=function(e){var n=void 0,o=void 0;if(t.touchended)return t.updateCanvas();n=e.x-t.touchX0,o=e.y-t.touchY0;var i=t.rectX+n,a=t.rectY+o;t.outsideBound(i,a),t.updateCanvas()},t.__twoTouchStart=function(e,n){var o=void 0,i=void 0,a=void 0;t.touchX1=t.rectX+t.scaleWidth/2,t.touchY1=t.rectY+t.scaleHeight/2,o=n.x-e.x,i=n.y-e.y,a=Math.sqrt(o*o+i*i),t.oldDistance=a},t.__twoTouchMove=function(e,n){var o=void 0,i=void 0,a=void 0,c=t.scale,r=t.zoom;o=n.x-e.x,i=n.y-e.y,a=Math.sqrt(o*o+i*i),t.newScale=t.oldScale+.001*r*(a-t.oldDistance),t.newScale<=1&&(t.newScale=1),t.newScale>=c&&(t.newScale=c),t.scaleWidth=t.newScale*t.baseWidth,t.scaleHeight=t.newScale*t.baseHeight;var u=t.touchX1-t.scaleWidth/2,l=t.touchY1-t.scaleHeight/2;t.outsideBound(u,l),t.updateCanvas()},t.__xtouchEnd=function(){t.oldScale=t.newScale,t.rectX=t.imgLeft,t.rectY=t.imgTop})}var C={touchStart:function(t){var e=this,n=x(t.touches,2),i=n[0],a=n[1];console.log((0,c.default)(a)),i.x||(i.x=i.clientX,i.y=i.clientY,a&&(a.x=a.clientX,a.y=a.clientY)),o(e,!0,null,null),e.__oneTouchStart(i),t.touches.length>=2&&e.__twoTouchStart(i,a)},touchMove:function(t){var e=this,n=x(t.touches,2),i=n[0],a=n[1];i.x||(i.x=i.clientX,i.y=i.clientY,a&&(a.x=a.clientX,a.y=a.clientY)),o(e,null,!0),1===t.touches.length&&e.__oneTouchMove(i),t.touches.length>=2&&e.__twoTouchMove(i,a)},touchEnd:function(t){var e=this;o(e,!1,!1,!0),e.__xtouchEnd()}};function L(){var t=this,e=(t.deviceRadio,t.width),n=t.height,o=t.cut,i=o.x,a=void 0===i?0:i,c=o.y,r=void 0===c?0:c,u=o.width,l=void 0===u?e:u,s=o.height,d=void 0===s?n:s;t.outsideBound=function(e,n){t.imgLeft=e>=a?a:t.scaleWidth+e-a<=l?a+l-t.scaleWidth:e,t.imgTop=n>=r?r:t.scaleHeight+n-r<=d?r+d-t.scaleHeight:n},t.setBoundStyle=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=o.color,c=void 0===i?"#04b00f":i,u=o.mask,s=void 0===u?"rgba(0, 0, 0, 0.3)":u,f=o.lineWidth,h=void 0===f?1:f;t.ctx.beginPath(),t.ctx.setFillStyle(s),t.ctx.fillRect(0,0,a,n),t.ctx.fillRect(a,0,l,r),t.ctx.fillRect(a,r+d,l,n-r-d),t.ctx.fillRect(a+l,0,e-a-l,n),t.ctx.fill(),t.ctx.beginPath(),t.ctx.setStrokeStyle(c),t.ctx.setLineWidth(h),t.ctx.moveTo(a-h,r+10-h),t.ctx.lineTo(a-h,r-h),t.ctx.lineTo(a+10-h,r-h),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(c),t.ctx.setLineWidth(h),t.ctx.moveTo(a-h,r+d-10+h),t.ctx.lineTo(a-h,r+d+h),t.ctx.lineTo(a+10-h,r+d+h),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(c),t.ctx.setLineWidth(h),t.ctx.moveTo(a+l-10+h,r-h),t.ctx.lineTo(a+l+h,r-h),t.ctx.lineTo(a+l+h,r+10-h),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(c),t.ctx.setLineWidth(h),t.ctx.moveTo(a+l+h,r+d-10+h),t.ctx.lineTo(a+l+h,r+d+h),t.ctx.lineTo(a+l-10+h,r+d+h),t.ctx.stroke()}}var _="1.1.4",I=function(){function t(e){v(this,t);var n=this,o={};return p(n,y),(0,a.default)(y).forEach(function(t){o[t]=y[t].default}),(0,i.default)(n,o,e),n.prepare(),n.attachPage(),n.createCtx(),n.observer(),n.cutt(),n.methods(),n.init(),n.update(),n}return b(t,[{key:"init",value:function(){var t=this,e=t.src;return t.version=_,"function"===typeof t.onReady&&t.onReady(t.ctx,t),e&&t.pushOrign(e),o(t,!1,!1,!1),t.oldScale=1,t.newScale=1,t}}]),t}();return(0,i.default)(I.prototype,C),I.prototype.prepare=m,I.prototype.observer=k,I.prototype.methods=T,I.prototype.cutt=L,I.prototype.update=S,I})},e3ec:function(t,e,n){"use strict";var o=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("5176"));n("34ef"),n("28a5");o(n("0e8f"));var a=o(n("bd58")),c=uni.getSystemInfoSync(),r=c.windowWidth,u=c.windowHeight-50;console.log(c);var l={data:function(){return{src:"/static/missing-face.png",cropperOpt:{id:"cropper",width:r,height:u,scale:2.5,zoom:8,cut:{x:(r-300)/2,y:(u-300)/2,width:300,height:300}},weCropper:""}},methods:{back:function(){uni.redirectTo({url:"../infoDetail/infoDetail"})},touchStart:function(t){this.weCropper.touchStart(t)},touchMove:function(t){this.weCropper.touchMove(t)},touchEnd:function(t){this.weCropper.touchEnd(t)},convertBase64UrlToBlob:function(t,e){for(var n=atob(t.split(",")[1]),o=[],i=0;i<n.length;i++)o.push(n.charCodeAt(i));return new Blob([new Uint8Array(o)],{type:e},{filename:"1111.jpg"})},blobToDataURL:function(t){var e=new FileReader;e.readAsDataURL(t),e.onload=function(t){var e=t.target.result;console.log(e)}},getCropperImage:function(){var t=this,e=this;uni.showLoading({title:"头像更新中..."});var n=e.apiServer+"/base/uploadheadimg/";this.weCropper.getCropperImage(function(e){if(e){var o=uni.getStorageSync("token");uni.uploadFile({url:n,filePath:e,name:"file",header:{Authorization:o},success:function(e){var n=JSON.parse(e.data);0==n["code"]?wx.navigateTo({url:"./home"}):(uni.hideLoading(),t.$api.msg(n.msg))},ail:function(t){uni.showModal({content:t.errMsg,showCancel:!1}),uni.hideLoading()},complete:function(t){console.log("complate")}})}else console.log("获取图片失败，请稍后重试")})},uploadTap:function(){var t=this;uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){var n=e.tempFilePaths[0];t.weCropper.pushOrign(n)}})}},onLoad:function(t){var e=this.cropperOpt,n=t.src;n&&((0,i.default)(e,{src:n}),this.weCropper=new a.default(e).on("ready",function(t){}).on("beforeImageLoad",function(t){uni.showToast({title:"上传中",icon:"loading",duration:3e3})}).on("imageLoad",function(t){uni.hideToast()}))}};e.default=l},e98e:function(t,e,n){"use strict";n.r(e);var o=n("e3ec"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},fe38:function(t,e,n){"use strict";n.r(e);var o=n("2f43"),i=n("e98e");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("4cc6");var c=n("2877"),r=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,"7e343392",null);e["default"]=r.exports}}]);