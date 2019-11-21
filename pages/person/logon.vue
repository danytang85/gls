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
	
		<!-- 其他登录方式 -->
		<view class="otherLoginTitle">————————其他登录方式————————</view>
		<view class="otherLogin">
			<view class="weiixnLogin" @click="weixinlogin">
				<image src="../../static/weixin.png" mode=""></image>
			</view>
			
		</view>
	</view>
</template>

<script>
const duration = 2000;
import md5 from '@/js_sdk/ccdzhang-dokey/md5.js';
import http from '@/components/utils/http.js';
import service from '../../service.js';
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
			code: ''
		};
	},
	computed: mapState(['uerInfo','hasLogin']),
	methods: {
		...mapMutations(['login']),

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
			} else if (_that.password == '' && _that.loginMode == 1) {
				this.$api.msg('请输入密码');
			} else if (_that.code == '' && _that.loginMode == 2) {
				this.$api.msg('请输入验证码');
			} else {
				const data = {
					loginmode: _that.loginMode,
					mobile: _that.mobile,
					password: md5(md5(_that.password)),
					code: _that.code
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
		weixinlogin(){
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes.authResult);
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'weixin',
			      success: function (infoRes) {
					console.log(infoRes)
			        console.log('用户昵称为：' + infoRes.userInfo.nickName);
			      }
			    });
			  }
			});
		},
		
	},
	
	
	onLoad(options) {
		if (global.islogon()) {
			uni.redirectTo({
				url: '../person/home',
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
	margin: 0 auto;
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
