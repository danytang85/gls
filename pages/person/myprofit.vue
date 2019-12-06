<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的收益</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="TabCur == 'sharingamout' ? 'text-orange cur' : ''" @tap="tabSelect" id="sharingamout">差价收益</view>
				<view class="cu-item flex-sub" :class="TabCur == 'edubonus' ? 'text-orange cur' : ''" @tap="tabSelect" id="edubonus">教育利润</view>
				<view class="cu-item flex-sub" :class="TabCur == 'market' ? 'text-orange cur' : ''" @tap="tabSelect" id="market">市场补贴</view>
			</view>
		</scroll-view>

		<block v-if="TabCur == 'sharingamout'">
			<view class="padding bg-white solid-bottom" v-for="(item, index) in profit" :key="index">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble bg-white  margin-xs radius">
					<view>{{ item.create_time  }}</view>
					<view>{{item.oid}}</view>
					</view>
					<view class="flex-sub bg-white margin-xs radius ">
						<text class="text-price">{{ item.sharingamout }}</text>
					</view>
				</view>
			</view>
		</block>

		<block v-if="TabCur == 'edubonus'">
			<view class="padding bg-white solid-bottom" v-for="(item, index) in profit" :key="index">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble bg-white  margin-xs radius">
						<view>{{ item.create_time }}</view>
						<view>{{item.oid}}</view>
					</view>
					<view class="flex-sub bg-white margin-xs radius ">
						<text class="text-price">{{ item.edubonus }}</text>
					</view>
				</view>
			</view>
		</block>
		
		<block v-if="TabCur == 'market'">
			<view class="padding bg-white solid-bottom" v-for="(item, index) in profit" :key="index">
				<view class="flex  p-xs margin-bottom-sm mb-sm ">
					<view class="flex-treble bg-white  margin-xs radius">
						<view>{{ item.create_time}}</view>
						<view>{{item.oid}}</view>
					</view>
					<view class="flex-sub bg-white margin-xs radius ">
						<text class="text-price">{{ item.market }}</text>
					</view>
				</view>
			</view>
		</block>
		<uni-load-more :status="loadingType"></uni-load-more>
		
		
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
			TabCur: "sharingamout",
			page: 1,
			profit: [],
			loadingType: 'more', //加载更多状态
		};
	},
	onLoad() {
		this.getprofit();
		
	},
	onPullDownRefresh() {
	        this.getprofit('refresh')
	},
	//加载更多
	onReachBottom(){
		this.page=this.page+1;
		this.getprofit();
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.id;
			this.page=1;
			this.getprofit("refresh");
			
		},

		getprofit(type='add',loading) {
			uni.showLoading({
				title:"数据加载中"
			})
			//没有更多直接返回
			if(type === 'add'){
				if(this.loadingType === 'nomore'){
					return;
				}
				this.loadingType = 'loading';
			}else{
				this.loadingType = 'more'
			}
			
			var _that = this;
			let opts = {
				url: '/orderapi/getorderprofitsharing/',
				method: 'post'
			};
			let param = {
				page: this.page,
				profittype:this.TabCur
			};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					uni.hideLoading();
					
					if (res.data['code'] == 0) {
						let profitlist = res.data['profitlist'];
						if(type === 'refresh'){
							this.profit = [];
						}
						this.profit = this.profit.concat(profitlist);
						
						
						//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
						this.loadingType  = profitlist.length <20 ? 'nomore' : 'more';
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
