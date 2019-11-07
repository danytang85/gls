<template>
	
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		
	<footermenu PageCur="team"></footermenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			title:"团队"
			
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
