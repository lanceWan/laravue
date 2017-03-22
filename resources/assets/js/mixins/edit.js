import api from '../utils/http'
import * as tool from '../utils/tool'
export default {
	data() {
    return {
      loading:false
    }
  },
  methods: {
    edit(){
      this.loading = true;
      api.Update(this.apiUrl, this.ruleForm).then(response => {
        tool.notification_success(response.message);
        this.$router.push(this.redirectUrl);
      })
      this.loading = false;
    },
    getEidtData(){
      api.Edit('/api'+this.$route.path).then(response => {
        this.ruleForm = response.results
      }).catch(error => {
        _.notification_error(error.response.data.message)
        this.$router.go(-1)
      })
    }
  }
}