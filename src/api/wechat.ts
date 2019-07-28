
import axios from '../plugins/axios'

export default {
    getCode() {
        return axios.get('/wechat/login');
    },
    isLogin() {
        return axios.get('/wechat/isLogin');
    },
    getFriends(params:object) {
        return axios.get('/wechat/friends',{ params });
    },
    exportFriends(params:object) {
        return axios.get('/wechat/export',{ params,responseType:'blob' });
    }
}