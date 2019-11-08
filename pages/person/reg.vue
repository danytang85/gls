<template>
	<view class="content">
		
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">会员注册</block>
		</cu-custom>

	    
		
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu">
				<input type="number" class="username" value="" placeholder="请输入手机号" maxlength="11" @input="mobileInput"/>
			</view>
			<view class="loginInptu">
				<input type="password" class="password" value="" placeholder="请输入密码" maxlength="16" @input="passwordInpur"/>
			</view>
			<view class="loginInptu">
				<input type="password" class="password" value="" placeholder="重复输入密码" maxlength="16" @input="repasswordInpur"/>
			</view>
			<view class="loginInptu loginInptuCode">
				<input type="text" class="code" value="" placeholder="请输入验证码" maxlength="4" @input="codeInput"/>
				<view class="huoquyanzhengma " @click="getCode">{{codeBut}}</view>
			</view>
			
		</view>
		
	    <view class="btn-row">
			
	        <button  class="bg-orange" @click="regUp" >注册</button>
	    </view>
	    <view class="action-row">
	        <navigator class="text-black" url="../person/logon">登录</navigator>
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
				repassword:"",
				code:"",
				
				
	        }
	    },
	    computed: mapState(['forcedLogin']),
	    methods: {
	        ...mapMutations(['login']),
	       
	       // 手机号输入 
	       mobileInput(e){
	       	this.mobile = e.detail.value
	       },
	       // 密码输入
	       passwordInpur(e){
	       	this.password = e.detail.value
	       },
		   // 重复密码输入
		   repasswordInpur(e){
		   	this.repassword = e.detail.value
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
		   regUp(){
		   	var _that = this
		   	if(_that.mobile == ""){
		   		uni.showToast({
		   			title: '请输入手机号码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else if(_that.password == ""){
		   		uni.showToast({
		   			title: '请输入密码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else if(_that.repassword != _that.password){
		   		uni.showToast({
		   			title: '两次密码输入不一致',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else if(_that.code == ""){
		   		uni.showToast({
		   			title: '请输入验证码',
		   			icon: 'none',
		   			duration:1000
		   		});
		   	}else{
				const data = {
					
				     mobile: _that.mobile,
				     password: _that.password,
					 repassword: _that.repassword,
					 code:_that.code,
				 };
				this._regrequest(data);
		   	}
		   },
		   
	       
			
			_regrequest(userdata) {
				uni.request({
					url: 'http://www.gls.com/api/reg',
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
					url: "http://www.gls.com/api/sendmsm_reg",
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
		padding-left: 75upx;
	}
	
	.password {
		background: url(../../static/mima.png)no-repeat;
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
