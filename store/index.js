import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        uerInfo: {},
        hasLogin: false,
		token:""
    },
    mutations: {
        login(state, provider) {//改变登录状态
			state.hasLogin = true,
            state.uerInfo= provider,
			state.token=provider["token"],
			uni.setStorage({//将用户信息保存在本地
			    key: 'uerInfo',
			    data: provider,
			})
            uni.setStorage({//将用户信息保存在本地
                key: 'token',
                data: provider["token"]
            })
        },
        logout(state) {//退出登录
            state.hasLogin = false,
			state.token="",
            state.uerInfo = {}
            uni.removeStorage({
                key: 'uerInfo'
            }),
			uni.removeStorage({
			    key: 'token'
			})
			
        }
    }
})

export default store
