(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/logon"],{"119c":function(e,o,t){"use strict";t.r(o);var n=t("3b51"),i=t("8188");for(var a in i)"default"!==a&&function(e){t.d(o,e,function(){return i[e]})}(a);t("2f1f");var s=t("2877"),c=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);o["default"]=c.exports},"2f1f":function(e,o,t){"use strict";var n=t("f0a3"),i=t.n(n);i.a},"3b51":function(e,o,t){"use strict";var n=function(){var e=this,o=e.$createElement;e._self._c},i=[];t.d(o,"a",function(){return n}),t.d(o,"b",function(){return i})},4515:function(e,o,t){"use strict";(function(e){t("8ad5"),t("921b");n(t("66fd"));var o=n(t("119c"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])},8188:function(e,o,t){"use strict";t.r(o);var n=t("9e09"),i=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(o,e,function(){return n[e]})}(a);o["default"]=i.a},"9e09":function(e,o,t){"use strict";(function(e,n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i=c(t("90bc")),a=c(t("0e8f")),s=t("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function r(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(o){l(e,o,t[o])})}return e}function l(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}var u={components:{},data:function(){return{backpage:"../index/home",loginMode:1,usernameType:"text",codeBut:"获取验证码",codeClick:!0,mobile:"",password:"",code:"",SessionKey:"",OpenId:"",nickName:null,avatarUrl:null,bindmobile:!1,Code:"",userinfo:[],vcode:""}},computed:(0,s.mapState)(["uerInfo","hasLogin"]),methods:r({},(0,s.mapMutations)(["login"]),{showModal:function(){this.bindmobile=!0},hideModal:function(e){this.bindmobile=!1},loginCode:function(){this.loginMode=2},loginmobile:function(){this.loginMode=1},mobileInput:function(e){this.mobile=e.detail.value},passwordInpur:function(e){this.password=e.detail.value},codeInput:function(e){this.code=e.detail.value},getCode:function(){var e=this;if(e.codeClick){if(1!=e.mobile[0]||11!=e.mobile.length)return void this.$api.msg("请输入正确的手机号");e.codeClick=!1,e._sendmsm(e.mobile)}},loginUp:function(){var e=this;if(""!=e.mobile)if(/(^1[3|4|5|7|8][0-9]{9}$)/.test(e.mobile))if(""!=e.password||1!=e.loginMode)if(""!=e.code||2!=e.loginMode){var o={loginmode:e.loginMode,mobile:e.mobile,password:(0,i.default)((0,i.default)(e.password)),code:e.code,vcode:e.vcode};this._logonrequest(o)}else this.$api.msg("请输入验证码");else this.$api.msg("请输入密码");else this.$api.msg("手机号码格式不正确");else this.$api.msg("请输入手机号码")},_logonrequest:function(o){var t=this,n={url:"/userApi/logon/",method:"post"},i=o;a.default.httpRequest(n,i).then(function(o){0==o.data["code"]?(t.login(o.data["token"]),e.navigateTo({url:t.backpage})):t.$api.msg(o.data.msg)},function(e){console.log(e)})},_sendmsm:function(o){var t=this,n=this,i={url:"/CommonApi/sendmsm/",method:"post"},s={mobile:o,sendtype:"logon"};a.default.httpRequest(i,s).then(function(e){if(0==e.data["code"])var o=60,i=setInterval(function(){n.codeBut="重新发送"+o,o--,o<=0&&(n.codeBut="重新发送",n.codeClick=!0,clearInterval(i))},1e3);else t.$api.msg(e.data.msg)},function(o){console.log(o),e.showModal({content:err.errMsg,showCancel:!1})},function(e){t.loading=!1})},getPhoneNumberHander:function(e){var o=this;console.log("e",e);var t=this;if("getPhoneNumber:fail user deny"==e.detail.errMsg)wx.showModal({title:"提示",showCancel:!1,content:"未授权您将无法登陆",success:function(e){}});else{var n={url:"/CommonApi/getphone/",method:"post"},i={encryptedData:e.detail.encryptedData,iv:e.detail.iv,session_key:this.SessionKey};a.default.httpRequest(n,i).then(function(e){0==e.data["code"]?(t.weixinreg(e.data["phone"]),console.log(e.data)):o.$api.msg(e.data.msg)},function(e){console.log(e)})}},weixinreg:function(o){var t=this,n=this,i={url:"/UserApi/wxreg/",method:"post"},s={mobile:o,wxopenid:this.OpenId,nickname:this.userinfo["nickName"],province:this.userinfo["province"],city:this.userinfo["city"],country:this.userinfo["country"],gender:this.userinfo["gender"],vcode:n.vcode};a.default.httpRequest(i,s).then(function(o){0==o.data["code"]?""!=o.data["token"]&&(n.login(o.data["token"]),e.navigateTo({url:n.backpage})):t.$api.msg(o.data.msg)},function(e){console.log(e)})},weixinlogin:function(){var o=this;e.showLoading({title:"登录中..."}),e.getProvider({service:"oauth",success:function(t){~t.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(t){var n=this,i=t.code;console.log(t),e.getUserInfo({provider:"weixin",success:function(e){console.log(e.userInfo);var t=e.userInfo;o.userinfo=t}});var s={url:"/CommonApi/getwxopenid/",method:"post"},c={code:i};o.Code=i,a.default.httpRequest(s,c).then(function(t){if(0==t.data["code"]){if(""!=t.data["token"])o.login(t.data["token"]),e.navigateTo({url:o.backpage});else{var i=t.data["data"].session_key,a=t.data["data"].openid;o.OpenId=a,o.SessionKey=i,o.showModal()}e.hideLoading()}else n.$api.msg(t.data.msg)},function(e){console.log(e)})}})}})}}),onLoad:function(o){n.islogon()&&e.redirectTo({url:"../person/home"}),o.backpage&&(this.backpage=o.backpage);try{var t=e.getStorageSync("vcode");t&&(this.vcode=t)}catch(i){}}};o.default=u}).call(this,t("543d")["default"],t("c8ba"))},f0a3:function(e,o,t){}},[["4515","common/runtime","common/vendor"]]]);