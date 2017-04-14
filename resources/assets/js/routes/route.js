import Login from '../components/auth/Login'
import ErrorPermission from '../components/error/Permission'
import Home from '../components/Home'
import Dash from '../components/dash/Index'
// 权限
import PermissionList from '../components/permission/List'
import PermissionCreate from '../components/permission/Create'
import PermissionEdit from '../components/permission/Edit'
// 角色
import RoleList from '../components/role/List'
import RoleCreate from '../components/role/Create'
import RoleEdit from '../components/role/Edit'
// 用户
import UserList from '../components/user/List'
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
        path: 'permission/:id/edit',
        component: PermissionEdit,
        meta: {
          title: '修改权限'
        },
        name: 'permission.edit'
      },
      {
        path: 'role',
        component: RoleList,
        meta: {
          title: '角色'
        },
        name: 'role.index'
      },
      {
        path: 'role/create',
        component: RoleCreate,
        meta: {
          title: '创建角色'
        },
        name: 'role.create'
      },
      {
        path: 'role/:id/edit',
        component: RoleEdit,
        meta: {
          title: '修改角色'
        },
        name: 'role.edit'
      },
      {
        path: 'user',
        component: UserList,
        meta: {
          title: '用户'
        },
        name: 'user.index'
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