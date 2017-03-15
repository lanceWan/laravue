import * as _ from 'lodash'
import api from '../utils/http'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
	data() {
    return {
      tableData: [],
      pagination:{
        currentPage: 1,
        pageSize: 10,
        column: 'id',
        order: 'ascending',
        search: ''
      },
      total: 0,
      loading:false
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if(vm.loginStatus == '0') {
        vm.$router.replace('/login')
      }
      // 判断权限
      if (!vm.hasPermission(vm.$route.name)) {
        vm.$router.replace('/admin/error')
      }
    })
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userPermissions'
    ])
  },
  methods: {
    ...mapActions([
      'setUserPermissions',
    ]),
    // 每页数量变化
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.dataList(this.apiUrl, this.pagination);
    },
    // 分页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.dataList(this.apiUrl, this.pagination);
    },
    // 列表数据
    dataList(url, params){
      if (this.loginStatus == '1' && this.hasPermission(this.$route.name)) {
        this.loading = true;
        api.DataList(url, params).then(response => {
          this.total = response.total;
          this.tableData = response.permissions;
          this.loading = false;
        }).catch(error => {
          this.loading = false;
        });
      }
    },
    // 排序
    handleSortChange(val){
      this.pagination.column = val.prop;
      this.pagination.order = val.order;
      this.dataList(this.apiUrl, this.pagination);
    },
    // 搜索
    handleSearch(){
      this.dataList(this.apiUrl, this.pagination);
    },
    // 判断访问权限
    hasPermission(permission){
      if (_.includes(this.userPermissions,permission)) {
        return true;
      }
      return false;
    },
    // 修改
    handleEdit(routrName, row){
      this.$router.push({name: routrName, params: { id: row.id }});
    }
  }
}