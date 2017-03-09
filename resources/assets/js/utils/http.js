import axios from 'axios'
import * as _ from './tool'
axios.defaults.timeout = 5000;
axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
    console.log('response:',response);
	if (response.status === 400 || response.status === 401) {
		window.location = '/login';
	}
	return response;
}, function (error) {
	return Promise.reject(error);
});

export function postFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                var message = error.message;
                if (error.response.status == 422) {
                    for(var i in error.response.data){
                        message = error.response.data[i];
                    }
                }
                _.message(message,'error');
                reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return postFetch('/login', params)
    }
    
}