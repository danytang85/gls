<template>
	<view class="content">
		<view class="cropper-wrapper" style="height:617px">
			<canvas
				class="cropper"
				disable-scroll="true"
				@touchstart="touchStart"
				@touchmove="touchMove"
				@touchend="touchEnd"
				:style="{ width: cropperOpt.width, height: cropperOpt.height }"
				canvas-id="cropper"
			></canvas>
			
			
		</view>
		
		
		
		
		<view class="cu-bar btn-group foot">
			<button class="cu-btn bg-green shadow-blur " @tap="uploadTap">重新选择</button>
			<button class="cu-btn bg-orange shadow "  @tap="getCropperImage">确定</button>
		</view>
		
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
import weCropper from '../../static/weCropper';
const device = uni.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
console.log(device);
export default {
	data() {
		return {
			src:"/static/missing-face.png",
			cropperOpt: {
				id: 'cropper',
				width: width,
				height: height,
				scale: 2.5,
				zoom: 8,
				cut: {
					x: (width - 300) / 2,
					y: (height - 300) / 2,
					width: 300,
					height: 300
				}
			},
			weCropper: ''
		};
	},
	methods: {
		back() {
			uni.redirectTo({
				url: '../infoDetail/infoDetail'
			});
		},
		touchStart(e) {
			this.weCropper.touchStart(e);
		},
		touchMove(e) {
			this.weCropper.touchMove(e);
		},
		touchEnd(e) {
			this.weCropper.touchEnd(e);
		},
		convertBase64UrlToBlob(dataURI, type) {
			var binary = atob(dataURI.split(',')[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new Blob([new Uint8Array(array)], { type: type }, { filename: '1111.jpg' });
		},
		blobToDataURL(blob) {
			var a = new FileReader();
			a.readAsDataURL(blob); //读取文件保存在result中
			a.onload = function(e) {
				var getRes = e.target.result; //读取的结果在result中
				console.log(getRes);
			};
		},
		getCropperImage() {
			let _this = this;
			uni.showLoading({
				title:"头像更新中..."
			})
			let pathurl = _this.apiServer + '/base/uploadheadimg/';//上传服务器地址
			this.weCropper.getCropperImage(avatar => {
				if (avatar) {
					let token = uni.getStorageSync("token");
					 let uploadTask=uni.uploadFile({
						url: pathurl,
						filePath: avatar,
						name: 'file',
						header:{
							'Authorization': token,
						},
						success: res => {
							let data=JSON.parse(res.data);
							if (data['code'] == 0) {
								wx.navigateTo({
								  url: './home'
								})
							} else {
								 uni.hideLoading();
								 this.$api.msg(data.msg);
							}
						},
						ail: err => {
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
							uni.hideLoading();
						},
						
						complete: (e) => {
							// uni.showModal({
							// 	content: "complate",
							// 	showCancel: false
							// });
							console.log('complate');
						}
					});
					// uploadTask.onProgressUpdate((res) => {
					//             console.log('上传进度' + res.progress);
					//             console.log('已经上传的数据长度' + res.totalBytesSent);
					//             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					
					//             // 测试条件，取消上传任务。
					//             // if (res.progress > 50) {
					//             //     uploadTask.abort();
					//             // }
					//         });
					
					
					//  获取到裁剪后的图片
					// let opts = {
					// 	url: '/base/uploadheadimg/',
					// 	method: 'post'
					// };
					// let param = {
					// };
					// http.httpTokenUpload(opts,avatar,param).then(
					// 	res => {
					// 		//打印请求返回的数据
					// 		let data=JSON.parse(res.data);
					// 		console.log(data);
					// 		if (data['code'] == 0) {
					// 			wx.navigateTo({
					// 			  url: './home'
					// 			})
								
					// 		} else {
					// 			 uni.hideLoading();
					// 			 this.$api.msg(data.msg);
								
					// 		}
					// 	},
					// 	error => {
					// 		console.log('uploadImage fail', err);
					// 		uni.showModal({
					// 			content: err.errMsg,
					// 			showCancel: false
					// 		});
					// 		uni.hideLoading();
					// 	}
					// );
				} else {
					console.log('获取图片失败，请稍后重试');
				}
			});
		},
		uploadTap() {
			const self = this;

			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success(res) {
					let src = res.tempFilePaths[0];
					//  获取裁剪图片资源后，给data添加src属性及其值
					self.weCropper.pushOrign(src);
				}
			});
		}
	},
	onLoad(options) {
		// do something
		const cropperOpt = this.cropperOpt;
		
		const src = options.src;
		
		//console.log("src",options.src);
		if (src) {
			Object.assign(cropperOpt, {
				src
			});
			

			this.weCropper = new weCropper(cropperOpt)
				.on('ready', function(ctx) {})
				.on('beforeImageLoad', ctx => {
					uni.showToast({
						title: '上传中',
						icon: 'loading',
						duration: 3000
					});
				})
				.on('imageLoad', ctx => {
					uni.hideToast();
				});
		}
	}
};
</script>

<style>
.content {
	background: rgba(255, 255, 255, 1);
}

.head-list {
	height: 43px;
	width: 100%;
	background: #ffffff;
	justify-content: center;
	align-items: center;
	display: flex;
	border-bottom: 1px solid rgba(244, 244, 244, 1);
}

.head-info {
	text-align: center;
	font-size: 18px;
	color: #000000;
	font-weight: bold;
}

.save-box {
	position: absolute;
	right: 0px;
	width: 50px;
	height: 43px;
	line-height: 43px;
}

.save {
	color: rgba(98, 111, 252, 1);
	font-size: 16px;
	font-weight: 400;
}

.icon-back {
	margin-top: 11px;
	width: 10px;
	height: 18px;
	color: #000000;
	margin-left: 6px;
}

.icon-back-box {
	display: block;
	position: absolute;
	left: 6px;
	height: 43px;
	width: 30px;
	align-items: center;
}
.cropper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.cropper-buttons {
	background-color: rgba(0, 0, 0, 0.95);
	color: #04b00f;
}
.cropper-wrapper {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #F0F0F0;
}

.cropper-buttons {
	width: 100vw;
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	line-height: 50px;
}

.cropper-buttons .upload,
.cropper-buttons .getCropperImage {
	width: 50%;
	text-align: center;
}
</style>
