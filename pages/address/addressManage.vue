<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressname}}
			</text>
			<text class="iconfont icon-location"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default==1?true:false" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		data() {
			return {
				title:"",
				manageType:"add",
				addressData: {
					name: '',
					mobile: '',
					addressname: '在地图选择',
					address: '',
					dname: '',
					area: '',
					default: 0
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			this.title=title;
			// uni.setNavigationBarTitle({
			// 	title
			// })
		},
		methods: {
			switchChange(e){
				if(e.detail.value){
					this.addressData.default=1;
				}else{
					this.addressData.default=0;
				}
			},
			
			//地图选择地址
			chooseLocation(){
				
				// uni.getLocation({
				//     type: 'wgs84',
				//     success: function (res) {
				//        this.addressData.addressname = data.name;
				//        this.addressData.address = data.address; 
				//     }
				// });
				// uni.getSetting({  
				//                     success(res) {  
				//                         if (!res.authSetting['scope.userLocation']) {  
				//                             uni.authorize({  
				//                                 scope: 'scope.userLocation',  
				//                                 success() {  
				//                                     uni.chooseLocation({  
				//                                         success: function(res) {   
				//                                            this.addressData.addressname = data.name;
				//                                            this.addressData.address = data.address; 
				//                                         }  
				//                                     });  
				//                                 }  
				//                             })  
				//                         }else{  
				//                             uni.chooseLocation({  
				//                                 success: function(res) {   
				//                                    this.addressData.addressname = data.name;
				//                                    this.addressData.address = data.address;
				//                                 }  
				//                             });  
				//                         }  
				//                     }  
				//                 })
								
				uni.chooseLocation({
					success: (data)=> {
						console.log(data);
						this.addressData.addressname = data.name;
						this.addressData.address = data.address; 
					}
				})
			},
			
			submitdata(data){
				
				let opts = {
					url: '/addressApi/save/',
					method: 'post'
				};
				let param =data;
				http.httpTokenRequest(opts, param).then(
					res => {
						//打印请求返回的数据
						if (res.data['code'] == 0) {
							this.$api.prePage().refreshList(data, this.manageType);
							this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
							uni.hideLoading();
							setTimeout(()=>{
								uni.navigateBack()
							}, 800)
							
						} else {
							setTimeout(function () {
							    uni.hideLoading();
							}, 2000);
							uni.showToast({ title: res.data.msg, icon: 'none' });
						}
					},
					error => {
						console.log(error);
					}
				);
			},
			
			//提交
			confirm(){
				uni.showLoading({
				    title: '正在提交'
				});
				let data = this.addressData;
				console.log(data);
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.area){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				
				this.submitdata(data);
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
