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
	return response;
}, function (error) {
    if (error.response.status == 401) {
        window.location = '/login';
    }
	return Promise.reject(error);
});

export function postFetch(url, params, method) {
    return new Promise((resolve, reject) => {
        axios({
          method: method,
          url: url,
          data: params
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            var message = error.message;
            if (error.response.status == 422) {
                for(var i in error.response.data){
                    message = error.response.data[i][0];
                }
            }
            _.message(message,'error');
            reject(message)
        });
    })
}

export function getFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: url,
          params: params
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            var message = error.message;
            if (error.response.status == 422) {
                for(var i in error.response.data){
                    message = error.response.data[i][0];
                }
            }
            _.message(message,'error');
            reject(message)
        });
    })
}

export default {
    // 用户登录
    Login(params) {
        return postFetch('/login', params, 'POST');
    },
    // 退出登录
    Logout(){
        return postFetch('/logout', {}, 'POST');
    },
    // 数据列表
    DataList(url, params){
        return getFetch(url, params);
    },
    // 添加页面
    Create(url, params){
        return getFetch(url, params);
    },
    // 添加数据
    Store(url, params){
        return postFetch(url, params, 'POST');
    },
    // 修改页面获取数据
    Edit(url, params){
        return getFetch(url, params);
    },
    // 修改数据
    Update(url, params){
        return postFetch(url, params, 'PUT');
    },
    Destroy(url,params){
        return postFetch(url, params, 'DELETE');
    }
    
}