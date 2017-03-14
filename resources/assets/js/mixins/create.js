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
      if (!_.includes(vm.userPermissions,to.name)) {
        vm.$router.replace('/admin/error');
      }
    })
  },
  computed: {
    ...mapGetters([
      'userPermissions'
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
      .catch(error => {
        tool.notification_error(response.message);
      })
      this.loading = false;
    }
  }
}