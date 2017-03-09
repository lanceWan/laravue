import Login from '../components/auth/Login'
import Home from '../components/Home'
const Bar = { template: '<div>bar</div>' }
const Bar1 = { template: '<div>bar1</div>' }
const routes = [
	{
  	path: '/',
  	component: Home,
  	title: '首页',
  	children: [
      {
          path: '/login', //登录
          meta: { auth: false },
          component: Bar,
          title: '登录',
      },
      {
          path: '/signout', //退出
          component: Bar,
          title: '退出',
      },
      {
          path: '/home', //个人主页
          component: Bar,
          title: '个人主页',
      },
      {
          path: '/', //首页
          meta: { auth: false },
          component: Bar1,
          title: '首页',
      },
      {
          path: '*', //其他页面，强制跳转到登录页面
          redirect: '/login'
      }
  	]
  },
  {
  	path: '/login',
  	component: Login
  },
]

export default routes