
import axios from '../plugins/axios'

export default {
    login(data: object) {
        return axios.post('/user/access/login', data, { loading: true });
    },
    userInfo() {
        return axios.get('/user/access/current');
    },
    loginOut(data: object = {}) {
        return axios.post('/user/access/logout', data, { loading: true });
    }
}