import Vue from 'vue'
import App from './App'

import store from './store'
import Json from './Json' //测试用数据
import http from '@/components/utils/http.js';
	
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false




import footermenu from './pages/common/footermenu.vue'
Vue.component('footermenu', footermenu)


import cuCustom from './components/colorui/cu-custom.vue'
Vue.component('cu-custom', cuCustom)


Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.prototype.apiServer = 'http://api.liangjikang.com';
Vue.prototype.$api = {
	msg,
	json,
	prePage
};

// #ifdef H5  
import wechat from './common/wechat'  
if(wechat.isWechat()){  
    Vue.prototype.$wechat =wechat;  
}  
// #endif

const app = new Vue({
	store,
	...App
})
app.$mount()
