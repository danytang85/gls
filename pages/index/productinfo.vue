<template>
	
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品信息</block>
		</cu-custom>
		
		
		<view class="cu-card article" v-for="(item, index) in nlist" :key="index">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
					<view class="content">
						<image :src="serverapi +item.pic"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content"> {{item.intr}}</view>
							<view>
								<view class="cu-tag bg-white light sm round">{{item.create_time|formatDate}}</view>
								<!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
		
		
		
		<footermenu PageCur="index"></footermenu>
		
	</view>
</template>

<script>
	import {formatDate} from '@/common/date.js'
	import http from '@/components/utils/http.js';
	export default {
		filters: {
		        formatDate(time) {
		            var date = new Date(time);
		            return formatDate(date, 'yyyy-MM-dd hh:mm');
		        }
		    },
		data() {
			return {
				nlist:[],
				serverapi:this.apiServer,

			}
		},
		onLoad() {
			this.getproductinfolist()
		},
		methods: {
			
		getproductinfolist(){
			let	_that=this;
			let opts = {
				url: '/Productapi/getlist/',
				method: 'post'
			};
			let param = { };
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

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
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

