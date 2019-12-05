<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人资料</block>
		</cu-custom>
		
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">邮件</view>
				<input id="email" :value="userinfo.email"  placeholder="请输入您的邮箱地址" @blur="editinfo" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">呢称</view>
				<input id="nickname" :value="userinfo.nickname"  placeholder=""   @blur="editinfo"  name="input"></input>
			</view>
		</form>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			userinfo:[]
			}
		},
	methods: {
		editinfo(e){
			let value=e.target.value;
			let filed=e.target.id;
			let opts = {
				url: '/base/updateuserinfo/',
				method: 'post'
			};
			let param = {filed:filed,value:value};
			http.httpTokenRequest(opts, param).then(
				res => {
					if (res.data['code'] == 0) {
						
					}else{
						this.$api.msg(res.data['msg'])
					}
				},
				error => {
					console.log(error);
				}
			);
		},
		getuserinfo(){
			let opts = {
				url: '/base/getuserinfo/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
				res => {
					if (res.data['code'] == 0) {
						this.userinfo = res.data['userinfo'];
					}
				},
				error => {
					console.log(error);
				}
			);
			
		}
	},
	onLoad() {
		this.getuserinfo();
	}
}
</script>

<style>
</style>
