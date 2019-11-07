<template>
	<view>
		<view class="cu-bar tabbar foot bg-white">
			<view class="action" @click="NavChange" data-cur="index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/index' + [PageCur=='index'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='index'?'menu_text_color_on':'menu_text_color_off'">首页</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="team">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/team' + [PageCur == 'team'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='team'?'menu_text_color_on':'menu_text_color_off'">团队</view>
			</view>
			
			<view class="action text-gray" @click="NavChange" data-cur="money">

				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/money' + [PageCur == 'money'?'_cur':''] + '.png'"></image>

				</view>
				<view :class="PageCur=='money'?'menu_text_color_on':'menu_text_color_off'">收益</view>
			</view>
			<view class="action text-gray" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/person' + [PageCur == 'person'?'_cur':''] + '.png'"></image>
				</view>

				<view :class="PageCur=='person'?'menu_text_color_on':'menu_text_color_off'">我的</view>
			</view>
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
