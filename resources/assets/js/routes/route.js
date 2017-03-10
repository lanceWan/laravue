import Login from '../components/auth/Login'
import Home from '../components/Home'
import Dash from '../components/dash/Index'
const Bar = { template: '<div>bar</div>' }
const Bar1 = { template: '<div>bar1</div>' }
const routes = [
	{
  	path: '/',
  	redirect: '/admin'
  },
	{
  	path: '/admin',
  	component: Home,
  	meta: {
  		title: '首页'
  	},
  	children: [
  		{
          path: '/',
          component: Dash,
          meta: {
          	title: '控制台'
          },
      },
      {
          path: '/signout', //退出
          component: Bar,
          meta: {
          	title: '退出'
          },
      },
      {
          path: '/home', //个人主页
          component: Bar1,
          meta: {
          	title: '个人主页'
          },
      }
  	]
  },
  {
  	path: '/login',
  	component: Login
  },
]

export default routes