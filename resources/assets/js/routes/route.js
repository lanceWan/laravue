import Login from '../components/auth/Login'
import Home from '../components/Home'
import Dash from '../components/dash/Index'
import PermissionList from '../components/permission/List'
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
          component: Bar1,
          meta: {
          	title: '控制台'
          },
      },
      {
          path: 'permission',
          component: PermissionList,
          meta: {
          	title: '权限'
          },
      },
      {
          path: 'home', //个人主页
          component: Bar1,
          meta: {
          	title: '个人主页'
          },
      },
      {
        path: '*', //个人主页
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