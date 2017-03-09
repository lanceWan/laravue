<template>
  <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="email">
      <el-input type="text" v-model="form.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="submitForm('form')" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
	import * as _ from '../../utils/tool'
	import api from '../../utils/http'
	import { mapActions } from 'vuex'
	import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        loading: false,
        form: {
          email: '709344897@qq.com',
          password: '123123'
        },
        rules: {
          email: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    beforeRouteEnter (to, from, next) {
    	next((vm) => {
        if(vm.loginStatus) {
          vm.$router.push('/')
        }
      })
	  },
	  computed: {
			...mapGetters([
	      'loginStatus'
			])
		},
    methods: {
    	...mapActions([
      'setUserInfo' 
    	]),
   		submitForm(formName) {
   			var _form = this.form;
      	this.loading = true;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
		          api.Login(_form).then(response => {
		          	this.setUserInfo(response);
		          	this.$router.replace('/')
		          });
	          	this.loading = false;
	          }
	        });
      	},
    }
  }
</script>

<style lang="scss">
	html,body{
		width: 100%;
		background-color: #16a085;
	}
	.login-container {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin-bottom: 20px;
		background-color: #F9FAFC;
		margin: 180px auto;
		border: 2px solid #20A0FF;
		width: 350px;
		padding: 35px;
		.title {
		  margin: 0px auto 40px auto;
		  text-align: center;
		  color: #505458;
		}
		.remember {
		  margin: 0px 0px 35px 0px;
		}
	}
</style>