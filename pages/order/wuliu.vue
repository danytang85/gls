<template>
	<view >

		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">物流查看</block>
		</cu-custom>
		
		<view class="address-section ">
			
				<view class="cen padding">
					<view class="top">
						<text  class="name">{{ orderinfo.rename }}</text>
						<text  class="mobile">{{ orderinfo.remobile }}</text>
					</view>
					<text  class="address">{{ orderinfo.readdress }} {{ orderinfo.rearea }}</text>
					<view>物流单号{{ orderinfo.logistics }} </view>
				</view>
				
		</view>
		
		
		<ali :state="alidata.state" :datas="alidata.context" ></ali>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
import ali from '@/components/WuLiu-step.vue';
export default {
	components: {
		ali
	},
	data() {
		return {
			orderinfo:[],
			alidata:{},
           
		};
	},
	onLoad(options) {
		if(options.oid==undefined){
			this.$api.msg("数据传输错误");
			//uni.navigateBack();
		}
		this.init(options.oid);
	},
	methods: {
		init(oid) {
			
			let opts = {
				url: '/orderapi/getwuliu/',
				method: 'post'
			};
			let param = {oid:oid};
			http.httpTokenRequest(opts, param).then(
				res => {
					if (res.data['code'] == 0) {
					this.alidata=res.data["data"];	
					this.orderinfo=res.data["oinfo"];
					}else{
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

<style>
page {
	background: $page-color-base;
	padding-bottom: 100upx;
}
.address-section {
	padding: 30upx 0;
	background: #fff;
	position: relative;
	
}

.icon-shouhuodizhi {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90upx;
		color: #888;
		font-size: 44upx;
	}
	.cen {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.name {
		font-size: 34upx;
		margin-right: 24upx;
	}

	.address {
		margin-top: 16upx;
		margin-right: 20upx;
		color: $font-color-light;
	}

	.icon-you {
		font-size: 32upx;
		color: $font-color-light;
		margin-right: 30upx;
	}

	.a-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		height: 5upx;
	}

</style>
