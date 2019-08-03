
import axios from '../plugins/axios'

export default {
    start() {
        return axios.get('/wechat/start');
    },
    getCode() {
        return axios.get('/wechat/getCode', { enableRetry: true });
    },
    chart() {
        return axios.get('/wechat/chart',{ loading: true });
    },
    checkLogin() {
        return axios.get('/wechat/checkLogin');
    },
    getFriends(params: object) {
        return axios.get('/wechat/friends', { params });
    },
    getRooms(params: object) {
        return axios.get('/wechat/rooms', { params });
    },
    exportFriends(params: object) {
        return axios.get('/wechat/export', { params, responseType: 'blob' });
    }
}