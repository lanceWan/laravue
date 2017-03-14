import Login from '../components/auth/Login'
import ErrorPermission from '../components/error/Permission'
import Home from '../components/Home'
import Dash from '../components/dash/Index'
import PermissionList from '../components/permission/List'
import PermissionCreate from '../components/permission/Create'
const Bar = { template: '<div>没有找到路由</div>' }
const Bar1 = { template: '<div>控制台</div>' }
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
        name: 'system.index'
      },
      {
        path: 'permission',
        component: PermissionList,
        meta: {
        	title: '权限'
        },
        name: 'permission.index'
      },
      {
        path: 'permission/create',
        component: PermissionCreate,
        meta: {
          title: '创建权限'
        },
        name: 'permission.create'
      },
      {
        path: 'error',
        component: ErrorPermission
      },
      {
        path: '*', 
        component: Bar,
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