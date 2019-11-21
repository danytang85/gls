import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		token:""
    },
    mutations: {
        login(state, provider) {//改变登录状态
			state.token=provider,
			
            uni.setStorage({//将用户信息保存在本地
                key: 'token',
                data: provider
            })
        },
        logout(state) {//退出登录
			state.token="",
          
			uni.removeStorage({
			    key: 'token'
			})
			
        }
    }
})

export default store
