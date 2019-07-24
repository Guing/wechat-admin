import Vue, { PluginObject } from 'vue';
import axios from 'axios';
import config from '../config/'
import store from '../store'
import { Message } from 'element-ui'


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const axiosConfig = {
  baseURL: config.baseURL,
  timeout: 20 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(axiosConfig);

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    const token = store.state.token;
    token && (cfg.headers.Authorization = token)
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    const code = res.data.code;

    if (code === 0) {
      return res.data;
    } else if (Object.prototype.toString.call(res.data) === '[object Blob]') {
      return res.data;
    } else if (code === 50012 || code === 10031) {
      store.dispatch('logOut');
      return Promise.reject(res)
    } else {
      Message({
        type: 'error',
        message: res.data.msg
      });
      return Promise.reject(res)
    }
  },
  (err) => {
    // Do something with response error
    Message({
      type: 'error',
      message: '网络错误'
    });
    return Promise.reject(err);
  },
);

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default _axios;
