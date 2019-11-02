import Vue from 'vue'
import App from './App'

import store from './store'

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
