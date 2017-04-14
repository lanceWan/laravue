import * as _ from 'lodash'
import api from '../utils/http'
import * as tool from '../utils/tool'
import { mapGetters, mapActions } from 'vuex'
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
      loading:false,
      showDestroy: false,
      multipleSelection: []
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
      this.dataList();
    },
    // 分页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.dataList();
    },
    // 列表数据
    dataList(){
      if (this.loginStatus == '1' && this.hasPermission(this.$route.name)) {
        this.loading = true;
        api.DataList(this.apiUrl, this.pagination).then(response => {
          this.total = response.total;
          this.tableData = response.results;
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
      this.dataList();
    },
    // 搜索
    handleSearch(){
      this.dataList();
    },
    handleSelectionChange(val){
      if (val.length > 0) {
        this.multipleSelection = _.map(val,'id');
        this.showDestroy = true
      }else{
        this.showDestroy = false
      }
    },
    // 判断访问权限
    hasPermission(permission){
      return _.includes(this.userPermissions,permission) ? true:false;
    },
    // 修改
    handleEdit(routrName, row){
      this.$router.push({name: routrName, params: { id: row.id }});
    },
    // 删除
    handleDestroy(id){
      tool.confirm('确定删除数据？', '警告', 'danger').then(() => {
        api.Destroy(this.apiUrl+'/'+id).then(response => {
          tool.notification_success(response.message);
          this.dataList();
        });
      });
    },
    // 批量删除
    handleMultipleDestroy(){
      tool.confirm('确定删除数据？', '警告', 'danger').then(() => {
        api.Destroy(this.apiUrl+'/'+ _.join(this.multipleSelection,','),{multiple: true}).then(response => {
          tool.notification_success(response.message);
          this.multipleSelection = [];
          this.dataList();
        });
      });
    },
    handleShow(id){
      this.dialogVisible = true;
      api.Show(this.apiUrl+'/'+id).then(response => {
        this.showData = response.results
      }).catch(error => {
        tool.message(error.getMessage)
      })
    }
  }
}