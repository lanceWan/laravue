<template>
	<div class="ibox">
	  <div class="ibox-title">
	    <h5>权限列表</h5>
	  </div>
	  <div class="ibox-content">
	  	<el-row>
			  <el-col :span="24">
			  	<el-table
				    :data="tableData"
				    border
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
				      width="100">
				      <template scope="scope">
				        <el-button type="text" size="small">查看</el-button>
				        <el-button type="text" size="small">编辑</el-button>
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
</template>
<script>
	import api from '../../utils/http'
	import * as _ from '../../utils/tool'
	export default{
		data() {
      return {
      	tableData: [],
	      pagination:{
	      	currentPage: 1,
	        pageSize: 10,
	        column: 'id',
	        order: 'asc'
	      },
        total: 0,
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.permissionList(this.pagination);
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        api.PermissionList()
        this.permissionList(this.pagination);
      },
      permissionList(params){
      	api.PermissionList(params).then(response => {
	    		this.total = response.total;
	    		this.tableData = response.permissions;
	    	});
      }
    },
    created() {
    	this.permissionList(this.pagination);
    }
	}
</script>
<style lang="scss">
	.ibox{
		clear: both;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
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
	    padding: 15px 15px 7px;
	    min-height: 48px;
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
      .el-pagination{
	    	text-align: right;
		    margin-top: 20px;
      }
    }
	}
</style>