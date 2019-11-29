<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">会员登录</block>
		</cu-custom>
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu"><input type="number" class="username" value="" placeholder="请输入手机号" maxlength="11" @input="mobileInput" /></view>
			<view class="loginInptu" v-if="loginMode == 1"><input type="password" class="password" value="" placeholder="请输入密码" maxlength="16" @input="passwordInpur" /></view>
			<view class="loginInptu loginInptuCode" v-else-if="loginMode == 2">
				<input type="text" class="code" value="" placeholder="请输入验证码" maxlength="4" @input="codeInput" />
				<view class="huoquyanzhengma " @click="getCode">{{ codeBut }}</view>
			</view>
		</view>

		<view class="vcodelogon">
			<view class="loginTopCode" v-if="loginMode == 1" @click="loginCode">验证码登录</view>
			<view class="loginTopCode" v-else-if="loginMode == 2" @click="loginmobile">账号密码登录</view>
		</view>
		<view class="btn-row"><button class="bg-orange" @click="loginUp">登录</button></view>
		<view class="action-row"><navigator class="text-black" url="../person/reg">注册账号</navigator></view>

		<view class="cu-modal bottom-modal show" v-if="bindmobile">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-orange">绑定当前手机号登录</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					<button class="cu-btn bg-orange lg" open-type="getPhoneNumber" @getphonenumber="getPhoneNumberHander">绑定当前手号码登录</button>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 其他登录方式 -->
		<view class="otherLogin">
			
			<button class="cu-btn block margin-tb-sm"  open-type="getUserInfo"  @getuserinfo="weixinlogin">
				<text class="iconfont icon-weixin" style="font-size: 40px; color: #39B54A;"></text>
			</button>
	
		</view>

		<!-- #endif -->
	</view>
</template>

<script>
const duration = 2000;
import md5 from '@/js_sdk/ccdzhang-dokey/md5.js';
import http from '@/components/utils/http.js';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {},
	data() {
		return {
			backpage: '../index/home',
			loginMode: 1,
			usernameType: 'text',
			codeBut: '获取验证码',
			codeClick: true,
			mobile: '',
			password: '',
			code: '',

			SessionKey: '',
			OpenId: '',
			nickName: null,
			avatarUrl: null,
			isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true
			bindmobile: false,
			Code:"",
			userinfo:[],
			vcode:""
		};
	},
	computed: mapState(['uerInfo', 'hasLogin']),
	methods: {
		...mapMutations(['login']),
		showModal() {
			this.bindmobile = true;
		},
		hideModal(e) {
			this.bindmobile = false;
		},
		loginCode() {
			this.loginMode = 2;
		},
		loginmobile() {
			this.loginMode = 1;
		},
		// 手机号输入
		mobileInput(e) {
			this.mobile = e.detail.value;
		},
		// 密码输入
		passwordInpur(e) {
			this.password = e.detail.value;
		},
		// 验证码输入
		codeInput(e) {
			this.code = e.detail.value;
		},
		// 获取验证码
		getCode() {
			var _that = this;

			if (_that.codeClick) {
				if (_that.mobile[0] != 1 || _that.mobile.length != 11) {
					this.$api.msg('请输入正确的手机号');
					return;
				} else {
					_that.codeClick = false;
					// 发送短信
					_that._sendmsm(_that.mobile);
					// 倒计时开始
				}
			}
		},
		// 点击登录
		loginUp() {
			var _that = this;
			if (_that.mobile == '') {
				this.$api.msg('请输入手机号码');
				return;
			} else if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(_that.mobile)) {
				this.$api.msg('手机号码格式不正确');
				return;
			} else if (_that.password == '' && _that.loginMode == 1) {
				this.$api.msg('请输入密码');
				return;
			} else if (_that.code == '' && _that.loginMode == 2) {
				this.$api.msg('请输入验证码');
				return;
			} else {
				const data = {
					loginmode: _that.loginMode,
					mobile: _that.mobile,
					password: md5(md5(_that.password)),
					code: _that.code,
					vcode:_that.vcode,
				};
				this._logonrequest(data);
			}
		},

		_logonrequest(userdata) {
			let opts = {
				url: '/userApi/logon/',
				method: 'post'
			};
			let param = userdata;
			http.httpRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						this.login(res.data['token']);
						uni.navigateTo({
							url: this.backpage
						});
					} else {
						this.$api.msg(res.data.msg);
					}
				},
				error => {
					console.log(error);
				}
			);
		},
		_sendmsm(mobile) {
			var _that = this;

			let opts = {
				url: '/CommonApi/sendmsm/',
				method: 'post'
			};
			let param = { mobile: mobile, sendtype: 'logon' };
			http.httpRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						var daojishi = 60;
						var xianshi = setInterval(function() {
							_that.codeBut = '重新发送' + daojishi;
							daojishi--;
							if (daojishi <= 0) {
								_that.codeBut = '重新发送';
								_that.codeClick = true;
								clearInterval(xianshi);
							}
						}, 1000);
					} else {
						this.$api.msg(res.data.msg);
					}
				},
				error => {
					console.log(error);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				},
				complete => {
					this.loading = false;
				}
			);
		},

		//  wxGetUserInfo() {
		// 	let _this = this;
		// 	uni.getUserInfo({
		// 		provider: 'weixin',
		// 		success: function(infoRes) {
		// 			console.log("infoRes",infoRes);
		// 			let nickName = infoRes.userInfo.nickName; //昵称
		// 			let avatarUrl = infoRes.userInfo.avatarUrl; //头像
		// 			try {
		// 				uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
		// 			} catch (e) {}
		// 		},
		// 		fail(res) {}
		// 	});
		// },
		getPhoneNumberHander: function(e) {
			
			console.log("e",e);
			
			var that = this; // 拒绝授权

			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: '未授权您将无法登陆',
					success: function(res) {}
				});
			} else {
				// 接受授权
				let opts = {
					url: '/CommonApi/getphone/',
					method: 'post'
				};
				let param = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					//openid: this.OpenId,
					session_key: this.SessionKey,
				};
				http.httpRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							//获得手机号码注册
							
							that.weixinreg(res.data['phone']);
							console.log(res.data);
						} else {
							this.$api.msg(res.data.msg);
						}
					},
					error => {
						console.log(error);
					}
				);
				
			}
		},
		weixinreg(mobile){
			var _that = this;
			let opts = {
				url: '/UserApi/wxreg/',
				method: 'post'
			};
			let param = {
				mobile:mobile ,
				wxopenid:this.OpenId,
				nickname: this.userinfo["nickName"],
				province: this.userinfo["province"],
				headimg: this.userinfo["avatarUrl"],
				city: this.userinfo["city"],
				country: this.userinfo["country"],
				gender: this.userinfo["gender"],
				vcode:_that.vcode,
			};
			http.httpRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						//获得手机号码注册
						if(res.data['token']!=""){
							//已经存在用户 ，登录
							_that.login(res.data['token']);
							uni.navigateTo({
								url: _that.backpage
							});
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				},
				error => {
					console.log(error);
				}
			);
			
			
		},
		weixinlogin() {
			let _this = this;
			uni.showLoading({ title: '登录中...' });
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								let code = loginRes.code;
								//this.code=code;
								 console.log(loginRes);
								// 获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										//获取用户信息后向调用信息更新方法
										console.log(infoRes.userInfo);
										let userinfo = infoRes.userInfo;
										_this.userinfo=userinfo;
									}
								});
								//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
								let opts = {
									url: '/CommonApi/getwxopenid/',
									method: 'post'
								};
								let param = { code: code };
								_this.Code=code;
								http.httpRequest(opts, param).then(
									res => {
										//打印请求返回的数据
										if (res.data['code'] == 0) {
											if(res.data['token']!=""){
												//已经存在用户 ，登录
												_this.login(res.data['token']);
												uni.navigateTo({
													url: _this.backpage
												});
											}else{
												let sessionkey = res.data['data'].session_key;
												let openid = res.data['data'].openid;
												uni.setStorage({//将用户信息保存在本地
												    key: 'openid',
												    data: openid
												});
												_this.OpenId=openid;
												_this.SessionKey=sessionkey;
												_this.showModal();
											}
											
											uni.hideLoading();
										} else {
											this.$api.msg(res.data.msg);
										}
									},
									error => {
										console.log(error);
									}
								);
							}
						});
					}
				}
			});
		}
	},

	onLoad(options) {
		if (global.islogon()) {
			uni.redirectTo({
				url: '../person/home'
			});
		}
		if (options.backpage) {
			this.backpage = options.backpage;
		}
	}
};
</script>

<style>
.loginBox {
	width: 100%;
	margin: 30upx auto;
	padding: 0 30upx;
}

.code {
	background: url(../../static/code.png) no-repeat;
	background-position: 10upx;
	padding-left: 65upx;
	width: 100%;
	background-size: 58upx;
}

.huoquyanzhengma {
	color: #f37b1d;
	line-height: 85upx;
	width: 250upx;
	padding: 0 20upx;
	text-align: center;
	border-radius: 10upx;
}

.vcodelogon {
	text-align: right;
	padding: 0 30upx;
}

.username {
	background: url(../../static/shouji.png) no-repeat;
	background-position: 10upx;
	padding-left: 85upx;
}

.password {
	background: url(../../static/mima.png) no-repeat;
	background-position: 5upx;
	padding-left: 85upx;
}

.loginInptu {
	height: 80upx;
	margin: 0 auto;
	background: #fff;
	margin-top: 20upx;
	line-height: 80upx;
	border-radius: 10upx;
}

.loginInptuCode {
	display: flex;
}

.loginInptu > input {
	height: 100%;
	font-size: 30upx;
}

.logoImgBox {
	width: 200upx;
	height: 200upx;
	margin: 0 auto;
	margin-bottom: 50upx;
}

.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 20upx;
}

.action-row navigator {
	padding: 0 20upx;
}

.otherLogin {
	
	width: 500upx;
	height: 95upx;
	margin: 10px auto;
	display: flex;
	justify-content: space-between;
}

.otherLogin > view {
	width: 95upx;
	height: 95upx;
	background: #fff;
	border-radius: 95upx;
}

.otherLoginTitle {
	width: 100%;
	text-align: center;
	color: #555555;
	font-size: 28upx;
	line-height: 80upx;
}
</style>
