<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
			}
		},
		onLoad(){
			if (global.islogon() == false) {
				uni.redirectTo({
					url: '../person/logon'
				});
			}else{
				uni.redirectTo({
					url: '../index/home'
				});
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
