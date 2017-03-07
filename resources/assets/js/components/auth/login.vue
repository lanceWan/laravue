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
      <el-button type="primary" style="width:100%;" @click="submitForm('form')" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        form: {
          email: 'admin',
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
    methods: {
   		submitForm(formName) {
   			var _axios = axios;
   			var _form = this.form;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	// this.logining = true;
	            // 登录
	            _axios.post('/login',_form)
		        .then(response => {
		          console.log(response.status);
		          
		        }).catch(error => {
		        	var message = '';
		        	if (error.response.status == 422) {
		        		var dataError = error.response.data;
		        		for(var x in dataError){
		        			message += dataError[x];
		        		}
		        	}else{
			        	message = error.message;
		        		
		        	}
		            this.$message({
			        	showClose: true,
			        	message: message,
			        	type: 'error'
			        });
		        });
	          } else {
	            console.log('error submit!!');
	            return false;
		        this.$router.push({ path: '/table' });
	          }
	        });
      	},
    }
  }
</script>

<style lang="scss" scoped>
	.login-container {
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin-bottom: 20px;
	background-color: #F9FAFC;
	margin: 180px auto;
	border: 2px solid #8492A6;
	width: 350px;
	padding: 35px 35px 15px 35px;
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