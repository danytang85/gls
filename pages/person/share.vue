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
		onLoad(options){
			let vcode=options.v;
			let backurl=options.backurl;
			if(vcode!="undefined"){
				uni.setStorage({//将用户信息保存在本地
				    key: 'vcode',
				    data: vcode
				});
			};
			if (global.islogon()) {
				uni.redirectTo({
					url: '../index/home'
				});
			}else{
				uni.redirectTo({
					url: '../person/reg?backpage='+backurl,
				});
			}
			
			
			
			
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
