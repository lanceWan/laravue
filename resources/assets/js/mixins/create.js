import * as _ from 'lodash'
import api from '../utils/http'
import * as tool from '../utils/tool'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
	data() {
    return {
      loading:false
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if(vm.loginStatus == '0') {
        vm.$router.replace('/login')
      }
      // 判断权限
      if (!_.includes(vm.userPermissions,vm.$route.name)) {
        vm.$router.replace('/admin/error')
      }
    })
  },
  computed: {
    ...mapGetters([
      'userPermissions',
      'loginStatus'
    ])
  },
  methods: {
    ...mapActions([
      'setUserPermissions'
    ]),
    create(url, params){
      this.loading = true;
      api.Create(url, params).then(response => {
        tool.notification_success(response.message);
        this.$router.push('/admin/permission');
      })
      this.loading = false;
    }
  }
}