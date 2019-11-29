<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		
		<view class="carousel">
			
			<swiper class="screen-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in thumblist" :key="index">
					<image :src="server+item.img_thumb" mode="aspectFill" ></image>
				</swiper-item>
			</swiper>
			
		</view>
		
		<view class="introduce-section">
			<text class="title">{{pinfo.title}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{pinfo.price}}</text>
				<text class="m-price">¥{{pinfo.cprice}}</text>
				<text class="coupon-tip" v-if="pinfo.upgrade!=1">{{pinfo.discount}}折</text> 
				<!-- #ifdef H5 -->
				<view @click="share" class="share-right text-orange cuIcon-share "></view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button class="cu-btn share-right"  style="background-color: inherit;" @click="getinvitation">
					<text class="iconfont icon-weixin" style="font-size: 20px; color: #39B54A;"></text>
				</button>
				<!-- #endif -->
				
				
			</view>
			<view class="bot-row">
				<text>销量: {{pinfo.salenum}}</text>
				<text>库存: {{pinfo.stock}}</text>
				<text>浏览量: {{pinfo.innum}}</text>
			</view>
		</view>
		
		
		<view class="c-list">
			
		</view>
		
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view>
		
		<view   class="cu-bar foot  bg-white tabbar border shop ">
			
			<button @click="toFavorite"  class="action text-black " v-if="favorite===false" >
				<view class="cuIcon-favor" >
				</view> 收藏
			</button>
			<button  @click="toFavorite" class="action text-orange" v-if="favorite===true" >
				<view class="cuIcon-favor ">
				</view> 收藏
			</button>
			<view  @click="toChart"  class="action text-black"  >
				<view class="cuIcon-cart">
					<view class="cu-tag badge">{{cartcount}}</view>
				</view>
				购物车
			</view>
			<view class="bg-orange submit" v-if="isnotupgrade" @click="addcart">加入购物车</view>
			<view class="bg-red submit" @click="buy">立即订购</view>
			
		</view>
		
		
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
								<button class="cu-btn block bg-white margin-tb-sm"  style="background-color: inherit;"  open-type="share">
									<text class="iconfont icon-weixin" style="font-size: 40px; color: #39B54A;"></text>
									 
								</button>
								</view>
								<view class="share-item mpshare-item" @tap="createCanvasImageEvn">
									<text class="iconfont icon-haibao" style="font-size: 40px;color: #fb7e06;"></text>
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
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	import share from '@/components/share';
	export default{
		components: {
			share
		},
		data() {
			return {
				cartcount:0,
				server:this.apiServer,
				specClass: 'none',
				specSelected:[],
				favorite: false,
				shareList: [],
				pinfo:[],
				thumblist:[],
				desc: "",
				sharedata:[],
				isnotupgrade:false,
				
				shareInvitation:false,
				invitation:"",
				sharetitle:"良吉康-最火的社交新零售商城！",
				shareimg:'/img/banner2.jpg',
				
			};
		},
		async onLoad(options){
			
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let psid = options.psid;
			
			
			let opts = {
				url: '/productApi/getproductinfo/',
				method: 'post'
			};
			
			let param = {psid:psid};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						this.isnotupgrade=res.data["pinfo"].upgrade==1?false:true
						this.pinfo = res.data["pinfo"];
						this.thumblist = res.data["thumblist"];
						this.desc=this.pinfo["content"];
						this.favorite=res.data["isfav"];
						this.cartcount=res.data["cartcount"];
						this.sharedata={title:res.data["pinfo"].title,img:res.data["pinfo"].images}
					} else {
						uni.showToast({title: res.data.msg,icon: 'none'});
					}
				},
				error => {
					console.log(error);
				}
			);
			
			this.shareList = await this.$api.json('shareList');
		},
		
		
		
		
		
		onShareAppMessage: function( options ){
		　　var that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
			　　　　title: that.pinfo.title,        // 默认是小程序的名称(可以写slogan等)
			　　　　path: '/pages/person/share?v='+that.invitation+'&backurl=/pages/product/product?psid='+that.pinfo.psid,        // 默认是当前页面，必须是以‘/’开头的完整路径
			　　　　imageUrl: that.apiServer+that.pinfo.images,     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			　　　　success: function(res){
			　　　　　　// 转发成功之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
						console.log("分享成功");
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
		
		methods:{
			hideModal(e) {
				this.shareInvitation = false;
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
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			//收藏
			toFavorite(){
				let opts = {
					url: '/productApi/toFavorite/',
					method: 'post'
				};
				let param = {psid:this.pinfo["psid"]};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							
							this.favorite=res.data["isfav"];
						} else {
							uni.showToast({title: res.data.msg,icon: 'none'});
						}
					},
					error => {
						console.log(error);
					}
				);
				
				
				
				
			},
			buy(){
				let opts = {
					url: '/productapi/issaleproduct/',
					method: 'post'
				};
				let param = {psid:this.pinfo["psid"]};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							uni.navigateTo({
								url: `/pages/order/createOrder?psid=${this.pinfo.psid}`
							})
						} else {
							uni.showToast({title: res.data.msg,icon: 'none'});
						}
					},
					error => {
						console.log(error);
					}
				);
				
			},
			
			toChart(){
				uni.navigateTo({
					url: `/pages/cart/home`
				})
			},
			
			addcart(){
				let opts = {
					url: '/productApi/addcart/',
					method: 'post'
				};
				let param = {psid:this.pinfo["psid"]};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							this.cartcount=res.data["cartcount"];
							uni.showToast({title: "成功加入购物车",icon: 'none'});
						} else {
							uni.showToast({title: res.data.msg,icon: 'none'});
						}
					},
					error => {
						console.log(error);
					}
				);
			
			},
			stopPrevent(){}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
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
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			position: relative;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.share-right{
			position: absolute;
			right:0px;
			top:5px;
			font-size:16px;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	.share-icon{
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	
</style>
