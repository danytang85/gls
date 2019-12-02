<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="src"  @tap="upload"></image></view>
				<view class="info-box">
					<text class="username">{{ userinfo.gradetype}} 您好！</text>
				</view>
			</view>

		</view>

		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item">
					<text class="num text-price">{{userinfo.itaccount}}</text>
					
					<text>活期</text>
				</view>
				<view class="tj-item">
					<text class="num text-price">{{userinfo.frozenaccounts}}</text>
					<text>冻结</text>
				</view>
				<view class="tj-item">
					<text class="num">{{userinfo.growth}}</text>
					<text>成长值</text>
				</view>
			</view>
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont icon-quanbujiabandan menuicon basecolor" ></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont icon-fukuan menuicon basecolor" ></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont icon-fahuo menuicon basecolor" ></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover" :hover-stay-time="50">
					<text class="iconfont icon-shouhou menuicon basecolor" ></text>
					<text>退款/售后</text>
				</view>
			</view>

			<view class="history-section icon">
				<list-cell icon="icon-yaoqing" iconColor="#fb7e06" @eventClick="getinvitation()" title="邀请好友" tips="邀请好友快速升级"></list-cell>
				<list-cell icon="icon-shezhi" iconColor="#5fcda2" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				<list-cell icon="icon-dizhiguanli" iconColor="#fb7e06" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<!-- <list-cell icon="icon-tousujianyi-copy" iconColor="#fb7e06" title="投诉建议" tips=""></list-cell>
				<list-cell icon="icon-btn-shiyongzhongxin" iconColor="#5fcda2" title="试用中心" tips=""></list-cell>
				<list-cell icon="icon-bangzhu" iconColor="#fb7e06" title="帮助与客服"></list-cell> -->
				<list-cell icon="icon-shouyi" iconColor="#5fcda2" title="我的收益" border=""  @eventClick="navTo('/pages/person/myprofit')"></list-cell>
				<list-cell icon="icon-tuandui" iconColor="#fb7e06" title="我的团队" border="" @eventClick="navTo('/pages/person/myteam')" ></list-cell>
				<list-cell icon="icon-tuichu2" iconColor="#5fcda2" title="退出登录" border="" @eventClick="toLogout()"></list-cell>
			</view>
		</view>

		<footermenu PageCur="person"></footermenu>
		
		<view class="cu-modal bottom-modal" :class="shareInvitation?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-black">分享邀请更多好友</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					
					<scroll-view class="view-content" scroll-y>
						<view class="share-list">
							<!-- #ifdef MP-WEIXIN -->
								<view class="share-item mpshare-item" >
								<button class="cu-btn block bg-white margin-tb-sm"  open-type="share">
									<text class="iconfont icon-weixin" style="font-size: 30px; color: #39B54A;"></text>
									 
								</button>
								</view>
								<view class="share-item mpshare-item" @tap="createCanvasImageEvn">
									<text class="iconfont icon-haibao" style="font-size: 30px;color: #fb7e06;"></text>
								</view>
							<!-- #endif -->
							
								  
							<!--#ifdef H5-->
							<view v-for="(item, index) in shareList" :key="index" class="share-item" @click="shareToFriend(item.type)">
								<image :src="item.icon" mode=""></image>
								<text>{{ item.text }}</text>
							</view>
							 <!-- #endif -->
						</view>
					</scroll-view>
					
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
import listCell from '@/components/mix-list-cell';
import { mapMutations } from 'vuex';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell
	},
	data() {
		return {
			src: '/static/missing-face.png',
			title: '个人中心',
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userinfo: '',
			shareInvitation:false,
			invitation:"",
			sharetitle:"良吉康-最火的社交新零售商城！",
			shareimg:'/img/banner2.jpg',
			shareList :[{
							type: 1,
							icon: '/static/temp/share_wechat.png',
							text: '微信好友'
						},
						{
							type: 2,
							icon: '/static/temp/share_moment.png',
							text: '朋友圈'
						},
						{
							type: 3,
							icon: '/static/temp/share_qq.png',
							text: 'QQ好友'
						}]
		};
	},

	methods: {
		...mapMutations(['logout']),
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			uni.navigateTo({
				url
			});
		},

		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}

			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		},
		
		getinvitation(){
			let opts = {
				url: '/base/getinvitation/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
				res => {
					if (res.data['code'] == 0) {
						this.shareInvitation=true;
						this.invitation=res.data['invitation'];
						this.shareimg=res.data['shareimg'];
						this.sharetitle=res.data['sharetitle'];
						
					}else{
						this.$api.msg(res.data.msg);
					}
				},
				error => {
					console.log(error);
				}
			);
			
			
		},
		hideModal(e) {
			this.shareInvitation = false;
		},
		
		shareToFriend(type){
			
			
			
			
		},
		toLogout() {
			uni.showModal({
				content: '确定要退出登录么',
				success: e => {
					if (e.confirm) {
						this.logout();
						setTimeout(() => {
							uni.redirectTo({
								url:"./logon"
							})
						}, 200);
					}
				}
			});
		},
		
		upload() {
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success(res) {
					const src = res.tempFilePaths[0];
		
					uni.redirectTo({
						url: './upload?src=' + src
					});
				}
			});
		},
	},
	
	onShareAppMessage: function( options ){
	　　var that = this;
	　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		//console.log('/pages/person/share?vcode='+that.invitation);
	　　var shareObj = {
	　　　　title: that.sharetitle,        // 默认是小程序的名称(可以写slogan等)
	　　　　path: '/pages/person/share?vcode='+that.invitation,        // 默认是当前页面，必须是以‘/’开头的完整路径
	　　　　imageUrl: that.apiServer+that.shareimg,     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
	　　　　success: function(res){
	　　　　　　// 转发成功之后的回调
	　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
				that.shareInvitation=false;
	　　　　　　}
	　　　　},
	　　　　fail: function(){
	　　　　　　// 转发失败之后的回调
	　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
	　　　　　　　　// 用户取消转发
	　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
	　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
	　　　　　　}
	　　　　},
	　　　　complete: function(){
	　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
	　　　　}
	　　};
	　　// 来自页面内的按钮的转发
	　　
	　　return shareObj;
	},
	
	onLoad(options) {
		// if(options.headimg!=undefined){
		// 	this.src=decodeURIComponent(options.headimg);
		// }
		
		if (global.islogon() == false) {
			uni.redirectTo({
				url:"./logon"
			})
		} else {
			let opts = {
				url: '/base/getuserinfo/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
				res => {
					if (res.data['code'] == 0) {
						this.userinfo = res.data['userinfo'];
						this.src=this.apiServer+res.data["userinfo"].headimg;
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}
};
</script>

<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
.shareicon{font-size:40px;}

.container {
	width: 100%;
}
.cu-dialog{
	background-color: #ffffff;
}
.menuicon{font-size:25px}
.user-section {
	width: 100%;
	height: 380upx;
	padding: 100upx 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
		opacity: 0.7;
	}
}
.user-info-box {
	height: 180upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		margin-left: 20upx;
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;
	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}
	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;
		.iconfont {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}

.order-section {
	@extend %section;
	padding: 28upx 0;
	margin-top: 20upx;
	.order-item {
		@extend %flex-center;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
	}
	.order-img {
		width: 48upx;
		height: 48upx;
		margin-bottom: 9upx;
	}
	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}
.cover-container {
	background: $page-color-base;
	margin-top: -0upx;
	padding: 0 30upx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 140upx;
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}

.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140upx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8upx;
	}
}

.share-header {
	height: 110upx;
	font-size: $font-base + 2upx;
	color: font-color-dark;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 10upx;
	&:before,
	&:after {
		content: '';
		width: 240upx;
		heighg: 0;
		border-top: 1px solid $border-color-base;
		transform: scaleY(0.5);
		margin-right: 30upx;
	}
	&:after {
		margin-left: 30upx;
		margin-right: 0;
	}
}
.share-list {
	display: flex;
	flex-wrap: wrap;
}
.share-item {
	min-width: 33.33%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 180upx;
	image {
		width: 80upx;
		height: 80upx;
		margin-bottom: 16upx;
	}
	text {
		font-size: $font-base;
		color: $font-color-base;
	}
}
.mpshare-item {
	min-width: 50%;
	}

.history-section {
	padding: 30upx 0 0;
	margin-top: 20upx;
	background: #fff;
	border-radius: 10upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
</style>
