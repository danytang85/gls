<template>
	<view class="content">
		<loading 
			ref="loading"
			:custom="false"
			:shadeClick="true"
			:type="1"
			@callback="callback()">
		</loading>
	</view>
</template>

<script>
	import loading from '../../components/xuan-loading/xuan-loading.vue'
	export default {
		components:{
			loading
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
			close:function(){
				this.$refs.loading.close();
			},
			open:function(){
				this.$refs.loading.open();
			},
			callback(){
				console.log("关闭后回掉");
			}
		}
	}
</script>

<style>
	.test{
		animation: 1s aaa infinite;
	}
	@keyframes aaa{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	.content{

	}
</style>
