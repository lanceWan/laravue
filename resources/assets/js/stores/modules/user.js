import * as types from '../types'
import api from '../../utils/http'
import { AES, enc } from 'crypto-js'
const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户权限
    userPermissions: localStorage.getItem('userPermissions') || ''
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

  setUserPermissions({ commit }, res){
    // console.log(AES.encrypt(JSON.stringify(res), types.SECRET_KEY).toString())
    var userPermissions = AES.encrypt(JSON.stringify(res), types.SECRET_KEY).toString();
    localStorage.setItem('userPermissions', userPermissions)
    commit(types.SET_USER_PERMISSIONS, userPermissions)
  },
}

const getters = {
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  userPermissions: state => {
    // console.log(JSON.parse(AES.decrypt(state.userPermissions, types.SECRET_KEY).toString(enc.Utf8)))
    return JSON.parse(AES.decrypt(state.userPermissions, types.SECRET_KEY).toString(enc.Utf8));
    // return JSON.parse(AES.decrypt(state.userPermissions, types.SECRET_KEY))
  }
}

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },

  [types.SET_USER_PERMISSIONS](state, res) {
    state.userPermissions = res
  },
    
}

export default {
  state,
  actions,
  getters,
  mutations
}