<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">会员中心</block>
		</cu-custom>

		<swiper
			@change="swiperChange"
			previous-margin="50px"
			next-margin="50px"
			class="swiper"
			:indicator-dots="false"
			:autoplay="false"
			:interval="3000"
			:duration="1000"
			:current="bigIdx"
		>
			<template v-for="(vip, i) in vips">
				<swiper-item :key="'vip_' + i">
					<view :class="['swiper-item', bigIdx === i ? 'big' : 'small']" :style="{ background: vip.bg, 'box-shadow': vip.shadow }">
						<text class="iconfont " :class="vip.icon"></text>
						<text class="title">{{ vip.title }}</text>
						<text class="sub_title">{{ vip.subTitle }}</text>
					</view>
				</swiper-item>
			</template>
		</swiper>

		<view class="title_line">
			<text class="title">我要赚成长值</text>
			<text class="more">成长值说明？</text>
		</view>
		<view class="cu-list menu card-menu margin-bottom sm-border">
			<view class="cu-item ">
				<view class="content">
					<text class="iconfont icon-iconcj text-black"></text>
					<text class="text-grey">邀请好友成为初级经销商</text>
				</view>
				<view class="action">
					<view class="action"><button  @click="navTo('../product/upgrade?salegrade=1')" class="cu-btn round bg-black shadow sm">去邀请</button></view>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="iconfont icon-zhongji text-black"></text>
					<text class="text-grey">邀请好友成为中级经销商</text>
				</view>
				<view class="action"><button  @click="navTo('../product/upgrade?salegrade=2')" class="cu-btn round bg-black shadow sm">去邀请</button></view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="iconfont icon-chat-gray text-black"></text>
					<text class="text-grey"  @click="navTo('../ptype/home')" >购物赚成长值</text>
				</view>
				<view class="action">
					<view class="action"><button class="cu-btn round bg-black shadow sm">去邀请</button></view>
				</view>
			</view>
		</view>

		<view class="title_line">
			<text class="title">经销商特权</text>
			<text class="more">查看更多</text>
		</view>
		<view class="welfare">
			<template v-for="(info, i) in welfare">
				<view class="item" :key="'welfare_' + i">
					<view class="border">
						<text class="iconfont  text-orange" :class="info.icon"></text>
						<image class="img" :src="info.icon"></image>
					</view>
					<text class="txt text-grey">{{ info.name }}</text>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			title: 'Hello',
			bigIdx: 2,
			vips: [],
			tasks: [
				{
					icon: '/static/icon_profile.png',
					name: '完善个人信息',
					desc: '完善信息获得7积分奖励'
				},
				{
					icon: '/static/icon_friend.png',
					name: '邀请好友参加',
					desc: '邀请好友获得7积分奖励'
				}
			],
			welfare: [
				{
					icon: 'icon-fenxiang1',
					name: '分享邀请'
				},
				{
					icon: 'icon-zhekou1',
					name: '享受折扣'
				},
				{
					icon: 'icon-cu',
					name: '促销活动'
				},
				{
					icon: 'icon-shi',
					name: '0元试用'
				}
			]
		};
	},
	onLoad() {
		
		let opts = {
			url: '/base/getusertypelist/',
			method: 'post'
		};
		let param = {};
		http.httpTokenRequest(opts, param).then(
			res => {
				if (res.data['code'] == 0) {
					this.bigIdx = res.data['bigIdx']-1;
					this.vips= res.data['vips'];
				}
			},
			error => {
				console.log(error);
			}
		);
		
	},
	methods: {
		swiperChange(e) {
			this.bigIdx = e.detail.current;
		},
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
	}
};
</script>

<style>
page {
	width: 100%;
	height: 100%;
	background-color: white;
}
</style>
<style lang="scss" scoped>
@function realSize($args) {
	@return $args / 1.5;
}

.swiper {
	width: 100%;
	margin-top: 10px;

	.swiper-item {
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		margin-right: 10px;
	}

	.big {
		margin-top: 0;
		.iconfont {
			margin-top: 15px;
			font-size: 45px;
			color: #ffffff;
		}
		.img {
			margin-top: 15px;
			width: 40px;
			height: 40px;
		}

		.title {
			font-size: 25px;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 41px;
		}

		.sub_title {
			font-size: 11px;
			font-weight: 300;
			color: rgba(255, 255, 255, 1);
			line-height: 41px;
		}
	}

	.small {
		margin-top: 14px;
		height: 75%;

		// transition: all 0.3s;
		.iconfont {
			margin-top: 15px;
			font-size: 45px;
			color: #ffffff;
		}

		.title {
			font-size: 15px;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 31px;
		}

		.sub_title {
			font-size: 7px;
			font-weight: 300;
			color: rgba(255, 255, 255, 1);
		}
	}
}

.title_line {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	.title {
		margin-left: 20px;
		font-size: 18px;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 41px;
	}

	.more {
		margin-right: 20px;
		font-size: 10px;
		font-weight: 300;
		color: rgba(153, 153, 153, 1);
		line-height: 41px;
	}
}

.slider {
	white-space: nowrap;
	width: 100%;

	.s_item {
		display: inline-block;
		width: 35%;
		margin-left: 20px;
		margin-bottom: 10px;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			background: white;
			margin-top: 5px;
			box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

			.img {
				width: 103px;
				height: 105px;
			}

			.name {
				margin-top: -10px;
				font-size: 12px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 21px;
			}

			.desc {
				font-size: 10px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 21px;
			}

			.btn {
				width: 80px;
				height: 30px;
				margin-bottom: 10px;
				background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
				box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
				border-radius: 29px;
				font-size: 12px;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 21px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}

.welfare {
	width: 92%;
	display: flex;
	margin: 10px auto;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
	border-radius: 10px;
	margin-bottom: 10px;

	.item {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.border {
			width: 45px;
			height: 45px;
			margin-top: 5px;
			border: 2px solid #fe9301;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			.iconfont {
				font-size: 30px;
				padding: 0 5px;
				width: 100%;
			}
		}

		.txt {
			margin-top: 5px;
			font-size: 10px;
			font-weight: 300;
		}
	}
}
</style>
