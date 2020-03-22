<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{info.title}}</block>
		</cu-custom>
		
		<view>
			<image class="headimg" :src="serverapi+info.pic"></image>
		</view>
		<view class="padding">
			<view class="text-xl text-bold">{{info.title}}</view>
			<view class="text-sm"> <text class="text-gray">{{info.create_time}}</text></view>
		
			
		</view>
		<view class="padding">
			<rich-text :nodes="info.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		
		data() {
			return {
				info:[],
				serverapi:this.apiServer,
			}
		},
		
		onLoad(options) {
			this.getnoticdisp(options.id)
		},
		methods: {
			
		getnoticdisp(id){
			let	_that=this;
			let opts = {
				url: '/Noticeapi/getnoticdisp/',
				method: 'post'
			};
			let param = {id:id};
			http.httpTokenRequest(opts, param).then(
				res => {
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						_that.info=res.data['info'];
					} else {
						uni.showToast({ title: res.data.msg, icon: 'none' });
					}
				},
				error => {
					console.log(error);
				}
			);	
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.headimg{
		height:150px;
	}
</style>
