import Vue, { PluginObject } from 'vue';
import axios from 'axios';
import config from '../config/'
import store from '../store'
import { Message, Loading } from 'element-ui'
import { ElLoadingComponent } from 'element-ui/types/loading';


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';




let loading: ElLoadingComponent;
let needLoadingRequestCount: number = 0;
let startLoading = () => {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      lock: true,
      background: 'rgba(0,0,0,0.1)',
      text: '加载中...'
    });
  }
  needLoadingRequestCount++
}
let endLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    loading.close()
  }

}

const _axios = axios.create({
  baseURL: config.baseURL,
  timeout: 6 * 1000, // Timeout
  retry: 4,
  enableRetry: false,
  loading: false,
  retryDelay: 1000,
  withCredentials: true, // Check cross-site Access-Control
});

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    const token = store.state.token;
    token && (cfg.headers.Authorization = token)
    cfg.loading && startLoading();
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
    res.config.loading && endLoading();
    const code = res.data.code;
    if (code === 0) {
      return res.data;
    } else if (Object.prototype.toString.call(res.data) === '[object Blob]') {
      return res.data;
    } else if (code === 50012 ) {
      store.dispatch('logOut');
      return Promise.reject(res)
    } else if (code === 10051 ) {
      store.dispatch('logOutWechat');
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
    //网络请求失败重新尝试
    let config = err.config;
    config.__retryCount = config.__retryCount || 0;
    if (!config.enableRetry || !config || !config.retry || config.__retryCount >= config.retry) {
      config.loading && endLoading();
      Message({
        type: 'error',
        message: '网络错误'
      });
      return Promise.reject(err);
    }
    config.__retryCount += 1;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    }).then(() => {
      return _axios(config);
    });


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
