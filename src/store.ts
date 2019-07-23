import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, data) {
      storage.setToken(data);
      state.token = data;
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
    logOut({ commit}){
      commit('SET_TOKEN', "");
    }
  }
})
