<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的团队</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="gid == '1' ? 'text-orange cur' : ''" @tap="tabSelect" id="1">注册会员</view>
				<view class="cu-item flex-sub" :class="gid == '2' ? 'text-orange cur' : ''" @tap="tabSelect" id="2">初级经销商</view>
				<view class="cu-item flex-sub" :class="gid == '3' ? 'text-orange cur' : ''" @tap="tabSelect" id="3">中级经销商</view>
				<view class="cu-item flex-sub" :class="gid == '4' ? 'text-orange cur' : ''" @tap="tabSelect" id="4">高级经销商</view>
			</view>
		</scroll-view>
		
		<block >
			<view class="padding bg-white solid-bottom " v-for="(item, index) in team" :key="index">
				<view class="flex  justify-between">
					<view class="">{{ item.nickname}}</view>
					<view class="">
						<text class="">{{ item.addtime }}</text>
					</view>
				</view>
			</view>
		</block>
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
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		data() {
			return {
				gid: 1,
				page: 1,
				team: [],
				loadingType: 'more', //加载更多状态
			};
		},
		onLoad() {
			this.getteam();
		},
		
		onPullDownRefresh() {
		        this.getteam('refresh')
		},
		//加载更多
		onReachBottom(){
			this.page=this.page+1;
			this.getteam();
		},
	
		methods: {
			tabSelect(e) {
				this.gid = e.currentTarget.id;
				this.page=1;
				this.getteam('refresh');
			},
	
			getteam(type='add',loading) {
				uni.showLoading({
					title:"数据加载中"
				})
				var _that = this;
				let opts = {
					url: '/base/getteam/',
					method: 'post'
				};
				let param = {
					gid: _that.gid,
					page:_that.page,
				};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						uni.hideLoading();
						if (res.data['code'] == 0) {
							
							
							let teamlist = res.data['userlist'];
							if(type === 'refresh'){
								this.team = [];
							}
							_that.team = this.team.concat(teamlist);
							
							
							//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
							this.loadingType  =teamlist.length <20 ? 'nomore' : 'more';
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
