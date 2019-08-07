
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
    startAi() {
        return axios.get('/wechat/message/ai',{ loading: true });
    },
    checkLogin() {
        return axios.get('/wechat/checkLogin');
    },
    getFriends(params: object) {
        return axios.get('/wechat/friends', { params,loading: true });
    },
    getRooms(params: object) {
        return axios.get('/wechat/rooms', { params,loading: true });
    },
    exportFriends(params: object) {
        return axios.get('/wechat/export', { params, responseType: 'blob' });
    }
}