import * as _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
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
  }
}