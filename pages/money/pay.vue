<template>
	<view class="app">
		
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">支付中心</block>
		</cu-custom>
		
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{payamount}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType('wx')">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked="payType =='wx'"  />
					</radio>
				</label>
			</view>
			<!-- <view class="type-item b-b" @click="changePayType('ali')">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked="payType =='ali'" />
					</radio>
				</label>
			</view> -->
			<!-- <view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import wxpay from '@/common/pPay.js';
	import http from '@/components/utils/http.js';
	export default {
		data() {
			return {
				payType: "wx",
				payamount:0.00,
				orderInfo: {},
				oid:"",
			};
		},
		computed: {
		
		},
		onLoad(options) {
		
			let oid=options.oid;
			if(oid=="undefined"){
				uni.showToast({ title: "订单数据错误", icon: 'none' });
				return
			}
			this.oid=oid;
			this.getorderinfo(oid);
			
		},

		methods: {
			getorderinfo(oid){
				let _that=this;
				let opts = {
					url: '/orderApi/payorder/',
					method: 'post'
				};
				
				let param = {oid:oid};
				_that.$http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							_that.payamount=res.data['total'];
						} else {
							uni.showToast({ title: res.data.msg, icon: 'none' });
						}
					},
					error => {
						console.log(error);
					}
				);
				
				
			},
			payorder(){
				let _that=this;
				uni.showLoading({
					 title: '支付中...'
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						
						let code = loginRes.code;
						let data={oid:_that.oid,paytype:_that.payType,code:code};
						let opts = {
							url: '/orderApi/payordercreate/',
							method: 'post'
						};
						
						let param = data;
						_that.$http.httpTokenRequest(opts, param).then(
							res => {
								//打印请求返回的数据
								
								console.log(res.data['prepay_order']);
								if(res.data['code']==0){
									setTimeout(function () {
									    uni.hideLoading();
									}, 1000);
									uni.requestPayment({
									   provider: "wxpay",
									   orderInfo:_that.oid,
									   timeStamp:res.data["prepay_order"].timeStamp,
									   nonceStr:res.data["prepay_order"].nonceStr,
									   package: res.data["prepay_order"].package,
									   signType:res.data["prepay_order"].signType,
									   paySign:res.data["prepay_order"].paySign,
									   success(res) {
											uni.redirectTo({
												url:"./paySuccess?oid/"+_that.oid,
											})	
									    },
									    fail(err) {
									       console.log(err)
									    }
									});
								}else{
									setTimeout(function () {
									    uni.hideLoading();
									}, 1000);
									uni.showToast({ title:res.data['msg'] , icon: 'none' });
									
								}
								
							},
							error => {
								console.log(error);
							}
						);
						
					}
				});
			
			},
			
			
			h5weixinpayorder(){
				let _that=this;
				uni.showLoading({
					 title: '支付中...'
				})
				
						let data={oid:_that.oid};
						let opts = {
							url: '/orderApi/h5weixinpayorder/',
							method: 'post'
						};
						
						let param = data;
						_that.$http.httpTokenRequest(opts, param).then(
							re => {
								//打印请求返回的数据
								console.log(re.data['prepay_order']);
								if(res.data['code']==0){
									wPay(re.data['prepay_order'],res=>{
									    console.log('调用成功!');
									},fail=>{
									    console.log('调用失败!');
									});
									
								}else{
									uni.showToast({ title:res.data['msg'] , icon: 'none' });
									
								}
								
								
								setTimeout(function () {
								    uni.hideLoading();
								}, 1000);
								
							},
							error => {
								console.log(error);
							}
						);
				
				
				
				
				
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				if(this.payType=="wx")
				{
					// #ifdef H5
					// this.h5weixinpayorder();
					// #endif	
					
					// #ifdef MP-WEIXIN
					this.payorder();
					// #endif
					
					
					
				}
				
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
