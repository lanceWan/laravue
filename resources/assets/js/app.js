import Vue from 'vue'

import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import routes from './routes/route'
import store from './stores/store'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes
})

const app = new Vue({
	store,
	router,
    render: h => h(App)
}).$mount('#app');