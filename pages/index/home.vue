<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="screen-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in carouselList" :key="index">
					<image :src="serverapi+item.images" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.src" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="navTo('../notice/notice')" >
				<text class="iconfont icon-cuxiaohuodong indexicon basecolor"></text>
				<text>促销活动</text>
			</view>
			<view class="cate-item" @click="navTo('../index/membercenter')">
				<text class="iconfont icon-huiyuanzhongxin2 indexicon unbasecolor"></text>

				<text>会员中心</text>
			</view>
			<view class="cate-item" @click="navTo('../index/productinfo')">
				<text class="iconfont icon-chanpinzixun indexicon basecolor"></text>

				<text>产品资讯</text>
			</view>
		</view>
		<!-- 	
    	<view class="ad-1">
    		<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
    	</view>
    	
    	 -->

		<view class="f-header m-t">
			<text class="iconfont icon-iconcj indexicon unbasecolor"></text>

			<view class="tit-box">
				<text class="tit"  @click="navTo('../product/upgrade?salegrade=1')">初级经销商直升产品</text>
				<!-- <text class="tit2">Hot</text> -->
			</view>
			<text class="iconfont icon-arrow-copy" @click="navTo('../product/upgrade?salegrade=1')"></text>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="serverapi + item.images" mode="aspectFill"></image></view>
				<text class="title clamp">{{ item.title }}</text>
				<text class="price">￥{{ item.price }}</text>
			</view>
		</view>

		<view class="f-header m-t">
			<text class="iconfont icon-zhongji indexicon basecolor"></text>

			<view class="tit-box">
				<text class="tit"  @click="navTo('../product/upgrade?salegrade=2')">中级经销商直升产品</text>
				<!-- <text class="tit2">Hot</text> -->
			</view>
			<text class="iconfont icon-arrow-copy"  @click="navTo('../product/upgrade?salegrade=2')"></text>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList2" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper"><image :src="serverapi + item.images" mode="aspectFill"></image></view>
				<text class="title clamp">{{ item.title }}</text>
				<text class="price">￥{{ item.price }}</text>
			</view>
		</view>

		<footermenu PageCur="index"></footermenu>
	</view>
</template>
<script>
import http from '@/components/utils/http.js';
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			serverapi: this.apiServer,
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			goodsList: [],
			goodsList2: []
			
		};
	},

	onLoad() {
		this.loadData();
	},

	methods: {
		
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
		/**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
		async loadData() {
			
			this.getbanner();
			this.getproductlist();
		},
		
		
		getproductlist(){
		let opts = {
			url: '/productApi/getgradeproduct/',
			method: 'post'
		};
		
		let param = { };
		http.httpTokenRequest(opts, param).then(
			res => {
				//打印请求返回的数据
				if (res.data['code'] == 0) {
					let goodsList1 = res.data['goodsList1'];
					let goodsList2 = res.data['goodsList2'];
					this.goodsList = goodsList1 || [];
					this.goodsList2 = goodsList2 || [];
				} else {
					uni.showToast({ title: res.data.msg, icon: 'none' });
				}
			},
			error => {
				console.log(error);
			}
		);	
		},
		
		getbanner(){
		let	_that=this;
		let opts = {
			url: '/base/getbannerlist/',
			method: 'post'
		};
		
		let param = { };
		http.httpTokenRequest(opts, param).then(
			res => {
				//打印请求返回的数据
				if (res.data['code'] == 0) {
					let carouselList = res.data['bannerlist'];
					_that.titleNViewBackground = carouselList[0].background;
					_that.swiperLength = carouselList.length;
					_that.carouselList = carouselList;
			
				} else {
					uni.showToast({ title: res.data.msg, icon: 'none' });
				}
			},
			error => {
				console.log(error);
			}
		);	
		},

		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		//详情页
		navToDetailPage(item) {
			//测试数据没有写id，用title代替
			let id = item.psid;
			uni.navigateTo({
				url: `/pages/product/product?psid=${id}`
			});
		}
	}
};
</script>

<style lang="scss">
/* #ifdef MP */

page {
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}
	.carousel-section {
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel {
			.carousel-item {
				padding: 0;
			}
		}
		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}
}
/* #endif */
.indexicon {
	font-size: 40px;
}
page {
	background: #f5f5f5;
}
.m-t {
	margin-top: 16upx;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;

	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 0px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 400upx;
		transition: 0.4s;
	}
}
.carousel {
	width: 100%;
	height: 350upx;

	.carousel-item {
		width: 100%;
		height: 100%;
		padding: 0 28upx;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
}

/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 60upx 22upx;
	background: #fff;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		opacity: 0.7;
		box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}

.f-header {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 6upx 30upx 8upx;
	background: #fff;
	image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		margin-right: 20upx;
	}
	.tit-box {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}
	.tit2 {
		font-size: $font-sm;
		color: $font-color-light;
	}
	.icon-you {
		font-size: $font-lg + 2upx;
		color: $font-color-light;
	}
}

/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.guess-item {
		display: flex;
		flex-direction: column;
		width: 98%;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
}
</style>
