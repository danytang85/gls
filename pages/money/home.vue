<template>
	
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		
	<footermenu PageCur="money"></footermenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			title:"收益"	
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
