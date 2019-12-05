<template>
		<view class="cu-bar tabbar foot bg-white">
			<view class="action" @click="NavChange" data-cur="index">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-index footicon"  :class="PageCur=='index'?'menu_text_color_on':'menu_text_color_off'"></text>
				</view>
				<view class="footfontsize" :class="PageCur=='index'?'menu_text_color_on':'menu_text_color_off'">首页</view>
			</view>
			<view class="action text-gray" @click="navTo('/pages/product/list?fid=1&sid=3&tid=4')" data-cur="ptype">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-leimupinleifenleileibie footicon"  :class="PageCur=='ptype'?'menu_text_color_on':'menu_text_color_off'"></text>
				</view>
				<view class="footfontsize" :class="PageCur=='ptype'?'menu_text_color_on':'menu_text_color_off'">产品</view>
			</view>
			
			<view class="action text-gray" @click="NavChange" data-cur="cart">

				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-chat-gray footicon"  :class="PageCur=='cart'?'menu_text_color_on':'menu_text_color_off'"></text>
					
				</view>
				<view class="footfontsize" :class="PageCur=='cart'?'menu_text_color_on':'menu_text_color_off'">购物车</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<text class="iconfont icon-wode footicon"  :class="PageCur=='person'?'menu_text_color_on':'menu_text_color_off'"></text>
				</view>

				<view class="footfontsize" :class="PageCur=='person'?'menu_text_color_on':'menu_text_color_off'">我的</view>
			</view>
		</view>
</template>
<script>
	export default {
		data() {
			return {
				title: '唐评科技'
			}
		},
		props:['PageCur'],
		
		onLoad() {

		},
		methods: {
			NavChange: function(e) {
				uni.navigateTo({
					url: '/pages/'+e.currentTarget.dataset.cur+'/home'
				});
				
			},
			
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>
<style>
	.menu_text_color_on{color:#fb7e06}
	.menu_text_color_off{color:#a4a4a4}
	.cuIcon-cu-image{padding-bottom: 5px;}
	.footicon{font-size:20px;}
	.footfontsize{font-size:14px}
</style>
