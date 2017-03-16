import api from '../utils/http'
import * as tool from '../utils/tool'
export default {
	data() {
    return {
      loading:false
    }
  },
  methods: {
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