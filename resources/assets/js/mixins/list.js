import api from '../utils/http'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'userPermissions'
    ])
  },
  methods: {
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
    hasCreatePermission(permission){
      console.log(this.userPermissions)
    }
  },
}