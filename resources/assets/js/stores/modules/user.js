import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户权限
    permissions: []
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
        localStorage.removeItem('userPermissions')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },

    setUserPermissions({ commit }, res){
        localStorage.setItem('userPermissions', JSON.stringify(res))
        commit(types.SET_USER_PERMISSIONS, res)
    },
}

const getters = {
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo,
    userPermissions: state => state.permissions,
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    [types.SET_USER_PERMISSIONS](state, res) {
        state.permissions = res
    }
    
}

export default {
    state,
    actions,
    getters,
    mutations
}