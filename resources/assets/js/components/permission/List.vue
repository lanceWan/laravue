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
				<el-button type="info" icon="plus" v-if="hasPermission('permission.create')" @click="$router.push('/admin/permission/create')">创建权限</el-button>
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
						      width="120">
						      <template scope="scope">
					        	<el-button v-if="hasPermission('permission.edit')" type="success" size="small" icon="edit" @click="handleEdit('permission.edit',scope.row)"></el-button>
					        	<el-button v-if="hasPermission('permission.destroy')" type="danger" size="small" icon="delete" @click="handleDestroy(scope.row.id)"></el-button>
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
	</div>
</template>
<script>
	import list from '../../mixins/list'
	export default{
		mixins: [list],
		data() {
      return {
      	apiUrl: '/api/admin/permission',
      	redirectUrl: {name: 'permission.index'},
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
			    min-height: 42px;
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
	}
</style>