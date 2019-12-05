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
			let vcode=options.vcode;
			let backurl=decodeURIComponent(options.backurl);
			if(vcode!="undefined"){
				uni.setStorage({//将用户信息保存在本地
				    key: 'vcode',
				    data: vcode
				});
			}
			if (global.islogon()) {
				if(backurl!="undefined"){
					uni.redirectTo({
						url: backurl,
					});
				}else{
					uni.redirectTo({
						url: "../index/home",
					});
				}
			}else{
				uni.redirectTo({
					url: '../person/reg?backurl='+encodeURIComponent(backurl),
				});
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
