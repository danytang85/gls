<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>

		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu"><input type="password" class="password" value="" placeholder="请输入密码" maxlength="16" @input="passwordInpur" /></view>
			<view class="loginInptu"><input type="password" class="password" value="" placeholder="重复输入密码" maxlength="16" @input="repasswordInpur" /></view>
			<view class="loginInptu loginInptuCode">
				<input type="text" class="code" value="" placeholder="请输入验证码" maxlength="4" @input="codeInput" />
				<view class="huoquyanzhengma " @click="getCode">{{ codeBut }}</view>
			</view>
		</view>

		<view class="btn-row"><button class="bg-orange" @click="repass">修改</button></view>
	
	</view>
</template>

<script>
const duration = 2000;
import http from '@/components/utils/http.js';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {},
	data() {
		return {
			codeBut: '获取验证码',
			codeClick: true,
			mobile: '',
			password: '',
			repassword: '',
			code: '',
			backpage: '../index/home',
			Code:'',
			
		};
	},
	computed: mapState(['forcedLogin']),
	methods: {
		...mapMutations(['logout']),
		
		// 密码输入
		passwordInpur(e) {
			this.password = e.detail.value;
		},
		// 重复密码输入
		repasswordInpur(e) {
			this.repassword = e.detail.value;
		},
		// 验证码输入
		codeInput(e) {
			this.code = e.detail.value;
		},
		// 获取验证码
		getCode() {
			var _that = this;

			if (_that.codeClick) {
					_that.codeClick = false;
					// 发送短信
					_that._sendmsm();
					// 倒计时开始
			}
		},
		// 点击修改
		repass() {
			var _that = this;
			if (_that.password == '') {
				this.$api.msg('请输入密码');
				return;
			} else if (_that.repassword != _that.password) {
				this.$api.msg('两次密码输入不一致');
				return;
			} else if (_that.code == '') {
				this.$api.msg('请输入验证码');
				return;
			} else {
				const data = {
					password: _that.password,
					repassword: _that.repassword,
					code: _that.code,
				};
				this._regrequest(data);
			}
		},

		_regrequest(userdata) {
			let _this=this;
			let opts = {
				url: '/base/repass/',
				method: 'post'
			};
			let param = userdata;
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						_this.logout();
						uni.navigateTo({
							url: "./logon"
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
		_sendmsm() {
			var _that = this;
			let opts = {
				url: '/base/sendmsm/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
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
		
		
		
	},
	onReady() {},
	onLoad(options) {
		
		
		
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
	padding: 10px 30upx;
}

.username {
	background: url(../../static/shouji.png) no-repeat;
	background-position: 10upx;
	padding-left: 75upx;
}

.password {
	background: url(../../static/mima.png) no-repeat;
	background-position: 5upx;
	padding-left: 70upx;
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
