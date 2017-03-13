<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="20" class="logo">
				<span>Lara<i class="txt">Vue</i></span>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link userinfo-inner">{{userInfo.name}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<el-menu default-active="/admin" class="el-menu-vertical-demo" theme="dark" router>
		      <el-menu-item index="/admin">控制台</el-menu-item>
		      <el-submenu index="1">
		        <template slot="title">系统管理</template>
	          <el-menu-item index="/admin/permission">权限管理</el-menu-item>
	          <el-menu-item index="/admin/role">角色管理</el-menu-item>
	          <el-menu-item index="/admin/user">用户管理</el-menu-item>
	          <el-menu-item index="/admin/menu">菜单管理</el-menu-item>
		      </el-submenu>
		    </el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<h3 class="title">{{$route.meta.title}}</h3>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item :to="{path:item.path}" v-for="item in $route.matched" :key="item.path">
								{{ item.meta.title }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import * as _ from '../utils/tool'
	import api from '../utils/http'
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				title:'hello'
			}
		},
		beforeRouteEnter (to, from, next) {
    	next((vm) => {
        if(!vm.loginStatus) {
          vm.$router.replace('/login')
        }
     	})
		},
		computed: {
			...mapGetters([
    		'loginStatus',
    		'userInfo'
			])
		},
		methods: {
			...mapActions([
      	'setSignOut' 
    	]),
			//退出登录
			logout: function () {
				_.confirm('确认退出吗？', '提示','warning').then(() => {
					api.Logout();
					this.setSignOut();
					this.$router.go('/login');
				}).catch(() => {
					_.message('退出失败','error');
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	html,body{
		width: 100%;
		background-color: #fff;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		padding:0;
		.header {
			height: 60px;
			line-height: 60px;
			background: #1F2D3D;
			color: #c0ccda;
			border-bottom: 3px solid #1AA094;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				.userinfo-inner {
					color: #c0ccda;
					cursor: pointer;
					padding:0 20px;
				}
			}
			.logo {
				font-size: 22px;
				padding-left:20px;
				.txt {
					color: #20a0ff
				}
			}
		}
		.main {
			background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				width: 230px;
			}
			.content-container {
				background: #f3f3f4;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow-y: scroll;
				.breadcrumb-container {
					padding:0 10px 20px 20px;
					background:#fff;
					border-bottom:1px solid #e7eaec;
					.title {
						font-size:24px;
				    margin-top: 20px;
    				margin-bottom: 10px
					}
				}
				.content-wrapper {
					padding: 20px 10px 40px;
					box-sizing: border-box;
				}
			}
		}
	}
</style>