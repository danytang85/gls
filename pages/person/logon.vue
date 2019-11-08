<template>
	<view class="content">
		
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">会员登录</block>
		</cu-custom>
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu">
				<input type="text" v-if="loginMode == 1" class="username" value="" placeholder="请输入手机号" maxlength="11" @input="mobileInput"/>
				<input type="number" v-else-if="loginMode == 2" class="username" value="" placeholder="请输入手机号" maxlength="11" @input="mobileInput"/>
			</view>
			<view class="loginInptu" v-if="loginMode == 1">
				<input type="password" class="password" value="" placeholder="请输入密码" maxlength="16" @input="passwordInpur"/>
			</view>
			<view class="loginInptu loginInptuCode" v-else-if="loginMode == 2">
				<input type="text" class="code" value="" placeholder="请输入验证码" maxlength="4" @input="codeInput"/>
				<view class="huoquyanzhengma " @click="getCode">{{codeBut}}</view>
			</view>
			
		</view>
		
		<view class="vcodelogon">
				<view class="loginTopCode" v-if="loginMode == 1" @click="loginCode">验证码登录</view>
				<view class="loginTopCode" v-else-if="loginMode == 2" @click="loginmobile">账号密码登录</view>
		</view>
	    <view class="btn-row">
			
	        <button  class="bg-orange" @click="loginUp" >登录</button>
	    </view>
	    <view class="action-row">
	        <navigator class="text-black" url="../person/reg">注册账号</navigator>
	      
	    </view>
	   
		
	
	</view>
</template>

<script>
	const duration = 2000
	import service from '../../service.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
	    components: {
	       
	    },
	    data() {
	        return {
				loginMode: 1,
				usernameType:"text",
				codeBut:"获取验证码",
				codeClick:true,
				mobile:"",
				password:"",
				code:"",
				
				
	        }
	    },
	    computed: mapState(['forcedLogin']),
	    methods: {
	        ...mapMutations(['login']),
	       
	       loginCode() {
	       	this.loginMode = 2
	       	this.usernameType = "number"
	       },
	       loginmobile() {
	       	this.loginMode = 1
	       	this.usernameType = "text"
	       },
	       // 手机号输入
	       mobileInput(e){
	       	this.mobile = e.detail.value
	       },
	       // 密码输入
	       passwordInpur(e){
	       	this.password = e.detail.value
	       },
	       // 验证码输入
	       codeInput(e){
	       	this.code = e.detail.value
	       },
		   // 获取验证码
		   getCode(){
		   	var _that = this
		   
		   	if(_that.codeClick){
		   		if(_that.mobile[0] != 1 || _that.mobile.length != 11){
		   			uni.showToast({
		   				title: '请输入正确的手机号',
		   				icon: 'none',
		   				duration: 800
		   			});
		   		}else{
		   			_that.codeClick = false
		   			// 发送短信
		   			_that._sendmsm(_that.mobile);
		   			// 倒计时开始
		   			
		   		}
		   	}
		   },
		   // 点击登录
		   loginUp(){
		   	var _that = this
		   	if(_that.mobile == ""){
		   		uni.showToast({
		   			title: '请输入手机号码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else if(_that.password == "" && _that.loginMode == 1){
		   		uni.showToast({
		   			title: '请输入密码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else if(_that.code == "" && _that.loginMode == 2){
		   		uni.showToast({
		   			title: '请输入验证码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else{
				const data = {
					 loginmode:_that.loginMode,
				     mobile: _that.mobile,
				     password: _that.password,
					 code:_that.code,
				 };
				this._logonrequest(data);
		   	}
		   },
		   
	       
			
			_logonrequest(userdata) {
				uni.request({
					url: 'http://www.gls.com/api/logon',
					dataType: 'json',
					data: userdata,
					method:"POST",
					success: (res) => {
						
						if(res.data["code"]==0){
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								mask: true,
								duration: duration
							});
							this.userinfo=res.data["userinfo"];
							this.login(this.userinfo)
							uni.navigateTo({
							    url: '../index/home'
							})
							
						}else{
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								mask: true,
								duration: duration
							});

						}	
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
			},
			_sendmsm(mobile) {
				var _that = this
				uni.request({
					url: "http://www.gls.com/api/sendmsm/",
					dataType: 'json',
					data: {mobile:mobile},
					method:"POST",
					
					success: (res) => {
						if(res.data["code"]==0){
							var daojishi = 60
							var xianshi = setInterval(function(){
								_that.codeBut = "重新发送"+daojishi;
								daojishi--
								if(daojishi<=0){
									_that.codeBut = "重新发送"
									_that.codeClick = true
									clearInterval(xianshi);
								}
							},1000)
						}else{
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								mask: true,
								duration: 1000
							});
			
						}	
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
			},
	       
	    },
	    onReady() {
	        
	    }
	}
</script>

<style>
	
	.loginBox {
		width: 100%;
		margin: 30upx auto;
		padding:0 30upx ;
	}
	
	.code {
		background: url(../../static/code.png)no-repeat;
		background-position: 10upx;
		padding-left: 65upx;
		width: 100%;
		background-size: 58upx;
	}
	
	.huoquyanzhengma {
		
		color: #f37b1d;
		line-height: 85upx;
		width: 250upx;
		padding:0 20upx;
		text-align: center;
		border-radius: 10upx;
	}
	
	.vcodelogon{
		text-align: right;
		padding:0 30upx
		
	}
	
	.username {
		background: url(../../static/shouji.png)no-repeat;
		background-position: 10upx;
		padding-left: 85upx;
	}
	
	.password {
		background: url(../../static/mima.png)no-repeat;
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
	
	.loginInptu>input {
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
		margin-top:20upx;
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
	
	.otherLogin>view {
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
