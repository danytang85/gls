<template>
		<view class="cu-bar tabbar foot bg-white">
			<view class="action" @click="NavChange" data-cur="index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/index' + [PageCur=='index'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='index'?'menu_text_color_on':'menu_text_color_off'">首页</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="ptype">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/ptype' + [PageCur == 'ptype'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='ptype'?'menu_text_color_on':'menu_text_color_off'">分类</view>
			</view>
			
			<view class="action text-gray" @click="NavChange" data-cur="cart">

				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/cart' + [PageCur == 'cart'?'_cur':''] + '.png'"></image>

				</view>
				<view :class="PageCur=='cart'?'menu_text_color_on':'menu_text_color_off'">购物车</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/person' + [PageCur == 'person'?'_cur':''] + '.png'"></image>
				</view>

				<view :class="PageCur=='person'?'menu_text_color_on':'menu_text_color_off'">我的</view>
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
				
			}
		}
	}
</script>
<style>
	.menu_text_color_on{color:#fb7e06}
	.menu_text_color_off{color:#a4a4a4}
</style>
