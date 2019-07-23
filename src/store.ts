import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN(state, data) {
      localStorage.setItem('token', data);
      state.token = data;
    }
  },
  actions: {
    isLogin({ commit, state }) {
      if (state.token) {
        return true;
      } else {
        const token = localStorage.getItem('token');
        if (token) {
          commit('SET_TOKEN', token);
          return true;
        } else {
          return false;
        }
      }
    }
  }
})
