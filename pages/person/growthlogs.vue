<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的成长值</block>
		</cu-custom>

		<view class="padding bg-white solid-bottom" >
			<view class="flex  p-xs margin-bottom-sm mb-sm ">
				<view class="flex-treble bg-white  margin-xs radius">成长值</view>
				<view class="flex-sub bg-white margin-xs radius ">
					<text class="">时间</text>
				</view>
			</view>
		</view>
		
			<view class="padding bg-white solid-bottom" v-for="(item, index) in growth" :key="index">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble bg-white  margin-xs radius">{{ item.growth}}</view>
					<view class="flex-sub bg-white margin-xs radius ">
						<text class="">{{ item.create_time | formatDate}}</text>
					</view>
				</view>
			</view>
			
			
			<uni-load-more :status="loadingType"></uni-load-more>
			
			
		
	</view>
</template>

<script>
	import { formatDate } from '@/common/date.js';
	import http from '@/components/utils/http.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
			components: {
				uniLoadMore	
			},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'MM-dd hh:mm');
			}
		},
		data() {
			return {
				page: 1,
				growth: [],
				loadingType: 'more',
			};
		},
		onLoad() {
			this.getgrowth(this.page,this.gid);
		},
		
		onPullDownRefresh() {
		        this.getgrowth('refresh')
		},
		//加载更多
		onReachBottom(){
			this.page=this.page+1;
			this.getgrowth();
		},
		methods: {
			
			getgrowth(type='add',loading) {
				uni.showLoading({
					title:"数据加载中"
				})
				var _that = this;
				let opts = {
					url: '/base/getgrowth/',
					method: 'post'
				};
				let param = {
					page:_that.page,
				};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						uni.hideLoading();
						if (res.data['code'] == 0) {
							
							let growth = res.data['growthlist'];
							if(type === 'refresh'){
								_that.growth = [];
							}
							_that.growth = _that.growth.concat(growth);
							
							
							//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
							_that.loadingType  = growth.length <20 ? 'nomore' : 'more';
							if(type === 'refresh'){
								if(loading == 1){
									uni.hideLoading()
								}else{
									uni.stopPullDownRefresh();
								}
							}
							
						} else {
							this.$api.msg(res.data.msg);
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

<style></style>
