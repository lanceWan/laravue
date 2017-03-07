
require('./bootstrap');

import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import routes from './routes/route'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.component('example', require('./components/Example.vue'));


const router = new VueRouter({
	base: '/',
  	routes
})

const app = new Vue({
	router,
    render: h => h(App)
}).$mount('#app');