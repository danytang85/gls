import Vue from 'vue'
import App from './App'

import store from './store'
import Json from './Json' //测试用数据



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

//封装全局登录检查函数:backpage为登录后返回的页面；backtype为打开页面的类型[1 : redirectTo 2 : switchTab]
//3种页面跳转方式：NavigationTo(直接打开新页面),RedirectTo(覆盖原页面后打开新页面),SwitchTo(切换顶部导航的方式来切换页面)
Vue.prototype.checkLogin = function(backpage) {
	try{
		var uerInfo = uni.getStorageSync('uerInfo'); //本地持久化存储
	}catch(e){
		//TODO handle the exception
	}
	if (uerInfo == '' || userInfo==null || userInfo=="undefined") {
		uni.redirectTo({
			url: '../person/logon?backpage=' + backpage
		});
		return false;
	}
	return uerInfo; //已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]，以供后续使用用户信息
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
Vue.prototype.apiServer = 'http://www.gls.com';
Vue.prototype.$api = {
	msg,
	json,
	prePage
};

const app = new Vue({
	store,
	...App
})
app.$mount()
