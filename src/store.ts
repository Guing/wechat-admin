import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage'
import router from './router'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    SET_TOKEN(state, data) {
      storage.setToken(data);
      state.token = data;
    },
    SET_USERINFO(state,data){
      state.userInfo = data;
    }
  },
  actions: {
    isLogin({ commit, state }) {
      if (state.token) {
        return true;
      } else {
        const token = storage.getToken();
        if (token) {
          commit('SET_TOKEN', token);
          return true;
        } else {
          return false;
        }
      }
    },
     async getUserInfo({commit}){
        let {data}  = await api.user.userInfo()
        commit('SET_USERINFO',data);
    },
    logOut({ commit}){
      commit('SET_TOKEN', "");
      router.push('/login');
    },
    logOutWechat(){
      router.push('/login');
    }
  }
})
