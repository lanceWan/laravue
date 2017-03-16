import api from '../utils/http'
import * as tool from '../utils/tool'
export default {
	data() {
    return {
      loading:false
    }
  },
  methods: {
    edit(redirectUrl){
      this.loading = true;
      api.Update(this.apiUrl, this.ruleForm).then(response => {
        tool.notification_success(response.message);
        this.$router.push(redirectUrl);
      })
      this.loading = false;
    },
    getEidtData(){
      api.Edit('/api'+this.$route.path).then(response => {
        this.ruleForm = response.permission
      }).catch(error => {
        _.notification_error(error.response.data.message)
        this.$router.go(-1)
      })
    }
  }
}