import * as types from '../types'
import api from '../../utils/http'
import { AES, enc } from 'crypto-js'
const state = {
    // 用户登录状态
    loginStatus: localStorage.getItem('loginStatus') || '',
    // 用户登录信息
    userInfo: localStorage.getItem('userInfo') || '',
    // 用户权限
    userPermissions: localStorage.getItem('userPermissions') || ''
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) {
    var userInfo = AES.encrypt(JSON.stringify(res), types.SECRET_KEY).toString();
    localStorage.setItem('userInfo', userInfo)
    commit(types.SET_USER_INFO, userInfo)
  },

  setLoginStatus({ commit }){
    var loginStatus = AES.encrypt('1', types.SECRET_KEY).toString()
    localStorage.setItem('loginStatus', loginStatus)
    commit(types.SET_LOGIN_STATUS, loginStatus)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userPermissions')
    commit(types.SET_LOGIN_STATUS, '')
    commit(types.SET_USER_INFO, '')
    commit(types.SET_USER_PERMISSIONS, '')
  },

  setUserPermissions({ commit }, res){
    var userPermissions = AES.encrypt(res, types.SECRET_KEY).toString();
    localStorage.setItem('userPermissions', userPermissions)
    commit(types.SET_USER_PERMISSIONS, userPermissions)
  },
}

const getters = {
  loginStatus: state => {
    if (!state.loginStatus) {
      return '0';
    }
    return AES.decrypt(state.loginStatus, types.SECRET_KEY).toString(enc.Utf8);
  },
  userInfo: state => {
    if (!state.userInfo) {
      return '';
    }
    return JSON.parse(AES.decrypt(state.userInfo, types.SECRET_KEY).toString(enc.Utf8));
  },
  userPermissions: state => {
    if (!state.userPermissions) {
      return '';
    }
    return JSON.parse(AES.decrypt(state.userPermissions, types.SECRET_KEY).toString(enc.Utf8));
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