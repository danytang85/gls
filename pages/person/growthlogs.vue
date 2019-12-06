<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的成长值</block>
		</cu-custom>
		<view class="padding bg-white">
			<view class="  solid-bottom">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble   margin-xs radius">订单</view>
					<view class="flex-sub  margin-xs radius "><text class="">成长值</text></view>
				</view>
			</view>

			<view class="  solid-bottom" v-for="(item, index) in growth" :key="index">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble   margin-xs radius">
						<view>{{ item.create_time }}</view>
						<view>订单号:{{ item.oid }}</view>
					</view>
					<view class="flex-sub  margin-xs radius ">
						<text class="">{{ item.growth }}</text>
					</view>
				</view>
			</view>

			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},

	data() {
		return {
			page: 1,
			growth: [],
			loadingType: 'more'
		};
	},
	onLoad() {
		this.getgrowth(this.page, this.gid);
	},

	onPullDownRefresh() {
		this.getgrowth('refresh');
	},
	//加载更多
	onReachBottom() {
		this.page = this.page + 1;
		this.getgrowth();
	},
	methods: {
		getgrowth(type = 'add', loading) {
			uni.showLoading({
				title: '数据加载中'
			});
			var _that = this;
			let opts = {
				url: '/base/getgrowth/',
				method: 'post'
			};
			let param = {
				page: _that.page
			};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					uni.hideLoading();
					if (res.data['code'] == 0) {
						let growth = res.data['growthlist'];
						if (type === 'refresh') {
							_that.growth = [];
						}
						_that.growth = _that.growth.concat(growth);

						//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
						_that.loadingType = growth.length < 20 ? 'nomore' : 'more';
						if (type === 'refresh') {
							if (loading == 1) {
								uni.hideLoading();
							} else {
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
