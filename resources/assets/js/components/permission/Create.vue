<template>
	<div class="grid-content bg-purple-light">
		<el-row class="header">
			<el-col :span="8" class="breadcrumb-container">
				<h3 class="title">{{$route.meta.title}}</h3>
				<el-breadcrumb separator="/" class="breadcrumb-inner">
					<el-breadcrumb-item :to="{path:item.path}" v-for="item in $route.matched" :key="item.path">
						{{ item.meta.title }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-col :span="16" class="title-action">
				<el-button icon="arrow-left" @click="$router.go('-1')">返回</el-button>
			</el-col>
		</el-row>
		<el-col :span="24" class="content-wrapper">
			<div class="ibox">
			  <div class="ibox-title">
			    <h5>{{$route.meta.title}}</h5>
			  </div>
			  <div class="ibox-content">
			  	<el-row type="flex" justify="center">
			  		<el-col class="ibox-tools" :span="6">
			  			<el-radio-group v-model="labelPosition" size="small" class="labelPosition">
							  <el-radio-button label="left">左对齐</el-radio-button>
							  <el-radio-button label="right">右对齐</el-radio-button>
							  <el-radio-button label="top">顶部对齐</el-radio-button>
							</el-radio-group>
			  		</el-col>
			  	</el-row>
			  	<el-row type="flex" justify="center">
			  		<el-col :span="20">
					  	<el-form :model="ruleForm" :label-position="labelPosition" label-width="13%" :rules="rules" ref="ruleForm" class="demo-ruleForm">
							  <el-form-item label="名称" prop="name">
							    <el-input v-model="ruleForm.name" placeholder="名称"></el-input>
							  </el-form-item>
							  <el-form-item label="权限" prop="slug">
							    <el-input v-model="ruleForm.slug" placeholder="权限"></el-input>
							  </el-form-item>
							  <el-form-item label="描述" prop="description">
							    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="权限描述" v-model="ruleForm.description"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">立即创建</el-button>
							    <el-button @click="resetForm('ruleForm')">重置</el-button>
							  </el-form-item>
							</el-form>
			  		</el-col>
			  	</el-row>
			  </div>
			</div>
		</el-col>
	</div>
</template>
<script>
	import create from '../../mixins/create'
	import common from '../../mixins/common'
  export default {
  	mixins: [create,common],
    data() {
      return {
        ruleForm: {
          name: '',
          slug: '',
          description: '',
        },
        labelPosition: 'right',
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          slug: [
            { required: true, message: '权限不能为空', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
      	var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.create('/api/admin/permission',_this.ruleForm);
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
	.ibox-tools{
		margin-bottom: 20px;
    text-align: center;
	}
</style>