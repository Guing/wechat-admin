
import axios from '../plugins/axios'

export default {
    getCode() {
        return axios.get('/wechat/login');
    },
    isLogin() {
        return axios.get('/wechat/isLogin');
    },
    getFriends() {
        return axios.get('/wechat/friends');
    }
}