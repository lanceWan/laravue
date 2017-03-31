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
				<el-button type="info" icon="plus" v-if="hasPermission('role.create')" @click="$router.push('/admin/role/create')">创建角色</el-button>
			</el-col>
		</el-row>
		<el-col :span="24" class="content-wrapper">
			<div class="ibox">
			  <div class="ibox-title">
			    <h5>权限列表</h5>
			  </div>
			  <div class="ibox-content">
			  	<el-row class="header-tool" :gutter="10">
			  		<el-col :span="4">
			  			<el-input v-model="pagination.search" placeholder="请输入内容"></el-input>
			  		</el-col>
			  		<el-col :span="8">
			  			<el-button type="info" icon="search" @click="handleSearch">搜索</el-button>
			  			<el-button v-if="showDestroy" type="danger" icon="delete" @click="handleMultipleDestroy">删除</el-button>
			  		</el-col>
			  	</el-row>
			  	<el-row>
					  <el-col :span="24">
					  	<el-table
						    :data="tableData"
						    border
						    v-loading="loading"
		    				element-loading-text="拼命加载中..."
						    @sort-change="handleSortChange"
						    @selection-change="handleSelectionChange"
						    style="width: 100%">
						    <el-table-column
						      type="selection"
						      width="55">
						    </el-table-column>
						    <el-table-column
						    	sortable
						      prop="id"
						      label="ID"
						      width="80">
						    </el-table-column>
						    <el-table-column
						      prop="name"
						      label="权限名称">
						    </el-table-column>
						    <el-table-column
						      prop="slug"
						      label="权限">
						    </el-table-column>
						    <el-table-column
						      prop="description"
						      label="描述">
						    </el-table-column>
						    <el-table-column
						      prop="created_at"
						      label="创建时间">
						    </el-table-column>
						    <el-table-column
						      prop="updated_at"
						      label="修改时间">
						    </el-table-column>
						    <el-table-column
						      fixed="right"
						      label="操作"
						      width="150">
						      <template scope="scope">
					        	<el-button type="info" size="mini" icon="search" @click="handleShow(scope.row.id)"></el-button>
					        	<el-button v-if="hasPermission('role.edit')" type="success" size="mini" icon="edit" @click="handleEdit('role.edit',scope.row)"></el-button>
					        	<el-button v-if="hasPermission('role.destroy')" type="danger" size="mini" icon="delete" @click="handleDestroy(scope.row.id)"></el-button>
						      </template>
						    </el-table-column>
						  </el-table>
					  </el-col>
					</el-row>
					<el-row type="flex" justify="end">
					  <el-col :span="12">
						  <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="pagination.currentPage"
					      :page-sizes="[10,20,50,100]"
					      :page-size="pagination.pageSize"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="total">
					    </el-pagination>
					  </el-col>
					</el-row>
			  </div>
			</div>
		</el-col>
		<el-dialog title="查看角色" v-model="dialogVisible">
		  <el-row type="flex" justify="center">
	  		<el-col :span="20">
			  	<el-form label-width="13%">
					  <el-form-item label="名称">
					    <el-input v-model="showData.name" placeholder="名称" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="角色">
					    <el-input v-model="showData.slug" placeholder="角色" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="描述">
					    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled="true" placeholder="角色描述" v-model="showData.description"></el-input>
					  </el-form-item>
					  <el-form-item label="角色权限">
					    <template v-for="(item,key) in showData.permissions">
					    	<el-tag type="primary" class="tags-module">模块: {{key}}</el-tag>
					    	<el-tag type="success" class="tags" v-for="v in item" :key="v.id">{{v.name}}</el-tag>
              </template>
					  </el-form-item>
					</el-form>
	  		</el-col>
	  	</el-row>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import list from '../../mixins/list'
	export default{
		mixins: [list],
		data() {
      return {
      	apiUrl: '/api/admin/role',
      	redirectUrl: {name: 'role.index'},
      	dialogVisible: false,
      	showData: {}
      }
    },
    created() {
    	this.dataList();
    }
	}
</script>
<style lang="scss">
	.content-container {
		background: #f3f3f4;
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 230px;
		overflow-y: scroll;
		.header{
			background:#fff;
	    border-bottom: 1px solid #e7eaec;
		}
		.breadcrumb-container {
			padding:0 10px 20px 30px;
			.title {
		    margin-top: 20px;
				margin-bottom: 10px
			}
		}
		.title-action{
			text-align: right;
	    padding: 33px 30px 20px 20px;
		}
		.content-wrapper {
			padding: 20px 10px 40px;
			box-sizing: border-box;
			.ibox{
				clear: both;
		    margin-bottom: 25px;
		    margin-top: 0;
		    padding: 0 20px;
		    .ibox-title{
		    	-moz-border-bottom-colors: none;
			    -moz-border-left-colors: none;
			    -moz-border-right-colors: none;
			    -moz-border-top-colors: none;
			    background-color: #ffffff;
			    border-color: #e7eaec;
			    border-image: none;
			    border-style: solid solid none;
			    border-width: 2px 0 0;
			    color: inherit;
			    margin-bottom: 0;
			    padding: 15px 15px 8px;
			    min-height: 24px;
			    h5{
		  	    display: inline-block;
				    font-size: 14px;
				    margin: 0 0 7px;
				    padding: 0;
				    text-overflow: ellipsis;
				    float: left;
			    }
		    }
		    .ibox-content{
		    	background-color: #ffffff;
			    color: inherit;
			    padding: 15px 20px 20px 20px;
			    border-color: #e7eaec;
			    border-image: none;
			    border-style: solid solid none;
			    border-width: 1px 0;
		      clear: both;
		      .header-tool{
		      	margin-bottom:20px;
		      }
		      .el-pagination{
			    	text-align: right;
				    margin-top: 20px;
		      }
		    }
			}
		}
		.tags-module{
			display:block;
		}
		.tags{
			margin-right:5px;
		}
	}
</style>