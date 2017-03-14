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
  // beforeRouteEnter (to, from, next) {
  //   next((vm) => {
  //     console.log(vm.userPermissions)
  //     if ((vm.userPermissions.length > 0) && vm.loginStatus) {
  //       if (!_.includes(vm.userPermissions,to.name)) {
  //         vm.$router.replace('/admin/error');
  //       }
  //     }else{
  //       vm.$router.push('/admin');
  //     }
  //   })
  // },
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
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.dataList(this.apiUrl, this.pagination);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.dataList(this.apiUrl, this.pagination);
    },
    dataList(url, params){
      this.loading = true;
      api.DataList(url, params).then(response => {
        this.total = response.total;
        this.tableData = response.permissions;
        this.loading = false;
      }).catch(error => {
        this.loading = false;
      });
    },
    handleSortChange(val){
      this.pagination.column = val.prop;
      this.pagination.order = val.order;
      this.dataList(this.apiUrl, this.pagination);
    },
    handleSearch(){
      this.dataList(this.apiUrl, this.pagination);
    },
    hasPermission(permission){
      if (_.includes(this.userPermissions,permission)) {
        return true;
      }
      return false;
    },
  },
  created() {

  }
}