<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提交银行卡</block>
		</cu-custom>
		
		
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">户名</view>
				<input placeholder="" name="noname" :value="noname"  @input="nonameInpur"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">银行</view>
				<input placeholder="" name="input" :value="bankname"  @input="banknameInpur" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">卡号</view>
				<input placeholder="" name="input" :value="bankno" @input="banknoInpur" ></input>
			</view>
		</form>
		
		<view class="btn-row"><button class="bg-orange" @click="savebank">绑定</button></view>
			
		
		
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		data(){
			return{
				noname:"",
				bankname:"",
				bankno:"",
				
			}
		},
		methods:{
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			
			nonameInpur(e) {
				this.noname = e.detail.value
			},
			banknameInpur(e) {
				this.bankname = e.detail.value
			},
			banknoInpur(e) {
				this.bankno = e.detail.value
			},
			
			savebank(){
				var _that = this;
				if (_that.noname == '') {
					this.$api.msg('银行账户名不能为空');
					return;
				} else if (_that.bankname =='') {
					this.$api.msg('银行名不能为空');
					return;
				} else if (_that.bankno == '') {
					this.$api.msg('卡号不能为空');
					return;
				} else {
					const data = {
						noname: _that.noname,
						bankname: _that.bankname,
						bankno: _that.bankno,
					};
					this._submitrequest(data);
				}
				
				
			},
			
			_submitrequest(data) {
				let _this=this;
				let opts = {
					url: '/base/savebank/',
					method: 'post'
				};
				let param = data;
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							this.$api.msg("修改成功");
						} else {
							this.$api.msg(res.data.msg);
						}
					},
					error => {
						console.log(error);
					}
				);
			},
			
			_loadbank() {
				uni.showLoading({
					title:"加载中.."
				})
				let _this=this;
				let opts = {
					url: '/base/loadbank/',
					method: 'post'
				};
				let param = {};
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							uni.hideLoading();
							
							this.bankname=res.data['bankinfo'].bankname;
							this.bankno=res.data['bankinfo'].bankno;
							this.noname=res.data['bankinfo'].noname;
						} else {
							
						}
					},
					error => {
						console.log(error);
					}
				);
			},
			
		},
		onLoad() {
			this._loadbank();
		}
	
	}
</script>

<style>
</style>
