import Vue from 'vue'
import App from './App'

import store from './store'
import Json from './Json' //测试用数据


const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
Vue.prototype.$api = {msg, json, prePage};


// import market from './pages/market/home.vue'
// Vue.component('market',market)

// import jojo from './pages/jojo/home.vue'
// Vue.component('jojo',jojo)

// import person from './pages/person/home.vue'
// Vue.component('person',person)

 import footermenu from './pages/common/footermenu.vue'
 Vue.component('footermenu',footermenu)
 

import cuCustom from './components/colorui/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store


const app = new Vue({
	 store,
    ...App
})
app.$mount()
