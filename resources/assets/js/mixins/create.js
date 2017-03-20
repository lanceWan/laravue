import api from '../utils/http'
import * as tool from '../utils/tool'
export default {
	data() {
    return {
      loading:false
    }
  },
  methods: {
    store(url, params){
      this.loading = true;
      api.Store(url, params).then(response => {
        tool.notification_success(response.message);
        this.$router.push(this.redirectUrl);
      })
      this.loading = false;
    },
    create(){
      api.Create(this.apiUrl + 'create').then(response => {
        console.log(response.results)
        console.log(this.data2)
        this.data = response.results
      })
    }
  }
}