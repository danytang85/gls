// const baseUrl = 'http://api.gls.com';
const baseUrl = 'https://api.liangjikang.com'; 
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {} : {},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	let token = uni.getStorageSync("token");
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			'Authorization': token,
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
			'Authorization': token,
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].data["code"] == 99) {
					uni.showToast({
						title: "验证已经过期，请重新登录",
						icon: 'none'
					});
					uni.removeStorage({
						key: 'token'
					})
					uni.redirectTo({
						url: '/pages/person/logon'
					});
					return;
				}
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};


const httpTokenUpload = (opts, filePath, formData) => {
	let token = uni.getStorageSync("token");
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		filePath: filePath,
		name: 'file',
		formData: formData,
		method: opts.method,
		header: opts.method == 'get' ? {
			'Authorization': token,
		} : {
			'Authorization': token,
			"Content-Type": "application/json; charset=UTF-8",
			
		},
	}
	let promise = new Promise(function(resolve, reject) {
		console.log(httpDefaultOpts);
		uni.uploadFile(httpDefaultOpts).then(
			(res) => {
				if (res[1].data["code"] == 99) {
					uni.showToast({
						title: "验证已经过期，请重新登录",
						icon: 'none'
					});
					uni.removeStorage({
						key: 'token'
					})
					uni.redirectTo({
						url: '/pages/person/logon'
					});
					return;
				}
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

import {
	mapMutations
} from 'vuex';
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	httpTokenUpload,
	methods: {
		...mapMutations(['logout']),
	}
}
