<template>
	
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">促销活动</block>
		</cu-custom>
		<view class="notice-item" v-for="(item, index) in nlist" :key="index">
			<text class="time">{{item.create_time}}</text>
			<view class="content" @click="navTo(item.id)" >
				<text class="title">{{item.title}}</text>
				<view class="img-wrapper">
					<image class="pic" :src="serverapi +item.pic"></image>
					<view class="cover" v-if="item.isopen==0">
						活动结束
					</view>
				</view>
				<text class="introduce">
					{{item.intr}}
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon iconfont icon-arrow-copy"></text>
				</view>
			</view>
		</view>
		
		
		<footermenu PageCur="index"></footermenu>
		
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		
		data() {
			return {
				nlist:[],
				serverapi:this.apiServer,

			}
		},
		
		onLoad() {
			this.getnoticelist()
		},
		methods: {
			navTo(id) {
				uni.navigateTo({
					url:"./noticeshow?id="+id
				});
			},
		getnoticelist(){
			let	_that=this;
			let opts = {
				url: '/Noticeapi/getlist/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						_that.nlist=res.data['list'];
					} else {
						uni.showToast({ title: res.data.msg, icon: 'none' });
					}
				},
				error => {
					console.log(error);
				}
			);	
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		.content{
			width: 710upx;
			padding: 0 24upx;
			background-color: #fff;
			border-radius: 4upx;
		}
	}
	
	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
