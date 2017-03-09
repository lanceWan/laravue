import * as types from '../types'

const state = {
    // 用户登录状态
    loading: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户数据信息
    user: []
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },

    /**
     * 请求用户信息
     */
    getUser({ commit }, id) {
        // commit(types.COM_LOADING_STATUS, true)
        // api.UserInfo(id)
        //     .then(res => {
        //         commit(types.COM_LOADING_STATUS, false)
        //         commit(types.GET_USER_DATA, res.data)
        //     })
    }
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    [types.GET_USER_DATA](state, res) {
        state.user = res
    }
    
}

export default {
    state,
    actions,
    mutations
}