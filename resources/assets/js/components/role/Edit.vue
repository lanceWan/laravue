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
				<el-button icon="arrow-left" @click="$router.go(-1)">返回</el-button>
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
							  <el-form-item label="角色" prop="slug">
							    <el-input v-model="ruleForm.slug" placeholder="角色"></el-input>
							  </el-form-item>
							  <el-form-item label="描述" prop="description">
							    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="角色描述" v-model="ruleForm.description"></el-input>
							  </el-form-item>
							  <el-form-item label="角色权限" prop="permissionIds">
							    <template v-for="(item,key) in ruleForm.permissions">
                    <el-checkbox class="module item" @change="handleCheckAllChange(item,$event)">模块({{key}})</el-checkbox>
                    <el-checkbox-group class="item" v-model="ruleForm.permissionIds">
                      <el-checkbox v-for="v in item" :key="v.id" :label="v.id">{{v.name}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
							  </el-form-item>
							  <el-form-item>
							    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
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
	import common from '../../mixins/common'
  import edit from '../../mixins/edit'
	import * as _ from 'lodash'
  export default {
  	mixins: [common,edit],
    data() {
      return {
        labelPosition: 'right',
        apiUrl: '/api/admin/role/',
        redirectUrl: {name: 'role.index'},
        ruleForm: {
          id: '',
          name: '',
          slug: '',
          description: '',
          permissionIds: [],
          permissions:[]
        },
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          slug: [
            { required: true, message: '角色不能为空', trigger: 'blur' }
          ],
        },
        apiUrl:'/api/admin/role/'+this.$route.params.id,
        redirectUrl: {name: 'role.index'}
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.edit('/api/admin/role',this.ruleForm);
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCheckAllChange(item,event) {
        var isChecked = event.target.checked;
        var itemkValue = _.map(item,'id');
        if (isChecked) {
          var diff =  _.difference(itemkValue,this.ruleForm.permissionIds);
          this.ruleForm.permissionIds = _.concat(this.ruleForm.permissionIds,diff)
        }else{
          this.ruleForm.permissionIds = _.difference(this.ruleForm.permissionIds,itemkValue);
        }
      }
    },
    created() {
    	this.getEidtData();
    }
  }
</script>
<style>
	.ibox-tools{
		margin-bottom: 20px;
    text-align: center;
	}
  .module{
    background-color: #eee;
    width: 100%;
  }
  .item{
    padding: 5px;
  }
</style>