<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-orange" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">{{ title }}</block>
		</cu-custom>
		
		<view class="scrollcontent">
			<scroll-view scroll-y class="left-aside">
				<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{ active: item.id === currentId }" @click="tabtap(item)">{{ item.name }}</view>
			</scroll-view>
			<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-' + item.id">
					<text class="s-item">{{ item.name }}</text>
					<view class="t-list">
						<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
							<image  :src="server+titem.picture"></image>
							<text>{{ titem.name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<footermenu PageCur="ptype"></footermenu>
	</view>
</template>

<script>
import http from '@/components/utils/http.js';
export default {
	data() {
		return {
			server:this.apiServer,
			title: '产品分类',
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: []
		};
	},
	onLoad() {
		
		if (global.islogon() == false) {
			uni.navigateTo({
				url: '../person/logon'
			});
		}
		this.loadData();
	},
	methods: {
		loadData() {
			
			let opts = {
				url: '/productApi/cateList/',
				method: 'post'
			};
			let param = {};
			http.httpTokenRequest(opts, param).then(
				res => {
					// console.log(res.data);
					//打印请求返回的数据
					if (res.data['code'] == 0) {
						console.log('list', res.data['cateList']);
						this._getdata(res.data['cateList']);
					} else {
						uni.showToast({ title: res.data['msg'], icon: 'none' });
					}
				},
				error => {
					console.log(error);
				}
			);
		},
		async _getdata(cateList) {
			let list = cateList;

			list.forEach(item => {
				if (!item.pid) {
					this.flist.push(item); //pid为父级id, 没有pid或者pid=0是一级分类
				} else if (!item.picture) {
					this.slist.push(item); //没有图的是2级分类
				} else {
					this.tlist.push(item); //3级分类
				}
			});
			console.log('list', this.flist);
		},
		//一级分类点击
		tabtap(item) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}

			this.currentId = item.id;
			let index = this.slist.findIndex(sitem => sitem.pid === item.id);
			this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动

		asideScroll(e) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].pid;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{
						size: true
					},
					data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}
				).exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid) {
			uni.navigateTo({
				url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
			});
		}
	}
};




</script>

<style lang="scss">

.scrollcontent {
	display: flex;
	
}
.left-aside {
	flex-shrink: 0;
	width: 200upx;
	height: 100%;
	background-color: #fff;
}
.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: $font-color-base;
	position: relative;
	&.active {
		color: $base-color;
		background: #f8f8f8;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20upx;
}
.s-item {
	display: flex;
	align-items: center;
	height: 70upx;
	padding-top: 8upx;
	font-size: 28upx;
	color: $font-color-dark;
}
.t-list {
	display: flex;
	flex-wrap: wrap;
	width: 50%;
	background: #fff;
	padding-top: 12upx;
	text-align: center;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}
.t-item {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	font-size: 26upx;
	color: #666;
	padding: 20upx;
	image {
		margin: 0 auto;
		width: 200upx;
		height: 200upx;
	}
}
</style>
