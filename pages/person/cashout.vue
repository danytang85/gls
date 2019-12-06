<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提现到银行卡</block>
		</cu-custom>
		
		
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow">
				<view class="content" @click="navTo('./bank')">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">{{this.bankname}}</text>
					<text class="text-grey">{{this.noname}}</text>
					<text class="text-grey">({{this.bankno}})</text>
				</view>
			</view>
			
		</view>
		
		
		<view>
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub padding-sm margin-xs text-xxl solids-bottom text-center  ">￥</view>
				<view class="flex-treble padding-sm margin-xs  ">
					<input placeholder="提现金额" style="height:30px; font-size:20px"  name="input" v-model="cashout"   ></input>
				</view>
				<view class="flex-treble padding-sm margin-xs ">
					<view class="text-bold text-lg text-orange" @click="cashoutval">全部转出</view>
					<view>提现余额：<text class="text-price">{{itaccount}}</text></view>
				</view>
			</view>
			
		</view>
		<view class="card-menu padding bg-white">
			<view>每周每个银行卡号提现最多三笔，单笔最低提现金额为10元，最高不能超过50000元。</view>
			<view>最周二开始打款（如遇节假日顺延），7个工作日内分批次完成。</view>
			<view>注：每周二发放金额为截止到前一周周五24：00申请的提现金额。</view>
		</view>
		
		
		<view class="btn-row"><button class="bg-orange" @click="submit">提现</button></view>
			
			
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		data(){
			return{
				noname:"",
				bankname:"",
				bankno:"",
				itaccount:0,
				cashout:0,
			}
		},
		methods:{
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			cashoutval(){
				
				this.cashout=this.itaccount;
			},
			
			_getcashout() {
				uni.showLoading({
					title:"加载中.."
				})
				let _this=this;
				let opts = {
					url: '/base/getcashout/',
					method: 'post'
				};
				let param = {};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							uni.hideLoading();
							this.itaccount=res.data['itaccount'];
							this.bankname=res.data['bankinfo'].bankname;
							this.bankno=res.data['bankinfo'].bankno;
							this.noname=res.data['bankinfo'].noname;
						} else {
							
						}
					},
					error => {
						console.log(error);
					}
				);
			},
			
			submit(){
			if(this.cashout<10){
				this.$api.msg("当前提现金额少于10元");
				return;
			}	
			
			if(this.bankno==""){
				this.$api.msg("提现银行账号不能为空");
				return;
			}
				
			uni.showLoading({
				title:"加载中..",
				mask:true,
			})
			let _this=this;
			let opts = {
				url: '/base/submitcash/',
				method: 'post'
			};
			let param = {noname:this.noname,
				bankname:this.bankname,
				bankno:this.bankno,
				cashout:this.cashout
				};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						uni.hideLoading();
						this.itaccount=res.data['itaccount'];
						this.$api.msg("提现成功");
						
					} else {
						uni.hideLoading();
						this.$api.msg(res.data["msg"]);
					}
				},
				error => {
					console.log(error);
				}
			);	
				
				
				
			}
			
		},
		
		onLoad() {
			this._getcashout();
		}
	
	}
</script>

<style>
</style>
