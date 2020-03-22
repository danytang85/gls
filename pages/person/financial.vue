<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">财务管理</block>
		</cu-custom>
		
		<view class="padding bg-white">
			<view>
				<text class="text-price  text-black text-bold text-sl " style="">{{money}}</text>
			</view>
			<view>
				<text class=" text-gray ">账户余额(元)</text>
			</view>
		</view>
		<view class="padding flex justify-between ">
			<view class="text-lg">可提现余额(元)</view>
			<view class=" text-price text-bold text-lg ">{{itaccount}}</view>
		</view>
		<view class="padding flex justify-between ">
			<view class="text-lg text-gray">冻结余额(元)(订单完成后解冻)</view>
			<view class=" text-price text-bold text-lg text-gray">{{frozenaccounts}}</view>
		</view>
		<view class="cu-list menu sm-border   bg-white"  @click="navTo('/pages/person/myprofit')" >
			<view class="cu-item arrow" >
				<view class="content" >
					<text class="text-grey">提现余额明细</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" >
				<view class="content">
					<text class="text-grey">账户余额明细</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @click="navTo('/pages/person/bank')" >
				<view class="content">
					<text class="text-grey" >添加银行卡</text>
				</view>
			</view>
		</view>
		
		
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="bg-black submit" @click="navTo('/pages/person/cashout')">提现</view>
		</view>
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		data(){
			return{
				itaccount:0.00,
				frozenaccounts:0.00,
				money:0.00
			}
			
		},
		methods:{
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
		},
		onLoad() {
			let _this=this;
			let opts = {
				url: '/base/getuserinfo/',
				method: 'post'
			};
			let param={};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						this.frozenaccounts=res.data['userinfo'].frozenaccounts;
						this.itaccount=res.data["userinfo"].itaccount;
						this.money=res.data["userinfo"].money;
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
</script>

<style>
</style>
